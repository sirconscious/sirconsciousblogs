# Nmap Service Detection, OS Detection & Scripting Notes

## Service & Version Detection

Once Nmap discovers open ports, you can probe each port to identify the running service. Investigating open ports further is essential — a pentester can use this information to check whether the service has known vulnerabilities (see TryHackMe's [Vulnerabilities 101](https://tryhackme.com/room/vulnerabilities101)).

- `-sV` collects and determines service/version info on open ports.
- Control intensity with `--version-intensity LEVEL` (0 = lightest, 9 = most complete).
  - `-sV --version-light` → intensity 2
  - `-sV --version-all` → intensity 9
- **Important:** `-sV` forces Nmap to complete the full TCP 3-way handshake and establish a connection, since version info can only be determined by communicating with the listening service. This means a stealth SYN scan (`-sS`) cannot be combined with `-sV`.

---

## OS Detection

Nmap can detect a target's Operating System (OS) based on its behavior and telltale signs in its network responses.

- Enable with `-O` (uppercase O, as in "OS").
- Example: `nmap -sS -O MACHINE_IP`

### Traceroute

- Add `--traceroute` to discover the routers between you and the target.
- Nmap's traceroute works differently from standard `traceroute`/`tracert`:
  - Standard `traceroute` starts with a **low** TTL (Time to Live) and increases it until reaching the target.
  - Nmap's traceroute starts with a **high** TTL and decrements it.

---

## Nmap Scripting Engine (NSE)

A script is code that doesn't need to be compiled — it stays in human-readable form. Scripts add extra functionality beyond built-in commands.

- Nmap's Scripting Engine (NSE) is a **Lua interpreter** that runs scripts written in Lua.
- You don't need to know Lua to use NSE scripts.
- A default installation can include close to **600 scripts**.
- Scripts live in `/usr/share/nmap/scripts` and are conveniently named starting with the protocol they target (e.g., over 130 scripts start with `http`).

### Script Categories

| Category | Description |
|---|---|
| `auth` | Runs authentication-related scripts |
| `broadcast` | Discovers hosts by sending broadcast messages |
| `brute` | Performs brute-force password auditing against logins |
| `default` | Runs default scripts (same as `-sC`) |
| `discovery` | Retrieves accessible information, such as database tables and DNS names |
| `dos` | Detects servers vulnerable to Denial of Service (DoS) |
| `exploit` | Attempts to exploit various vulnerable services |
| `external` | Checks using a third-party service, such as Geoplugin and Virustotal |
| `fuzzer` | Launches fuzzing attacks |
| `intrusive` | Runs intrusive scripts such as brute-force attacks and exploitation |
| `malware` | Scans for backdoors |
| `safe` | Runs safe scripts that won't crash the target |
| `version` | Retrieves service versions |
| `vuln` | Checks for vulnerabilities or exploits in a vulnerable service |

---

## Useful Options Summary

| Option | Meaning |
|---|---|
| `-sV` | Determine service/version info on open ports |
| `-sV --version-light` | Try the most likely probes (intensity 2) |
| `-sV --version-all` | Try all available probes (intensity 9) |
| `-O` | Detect OS |
| `--traceroute` | Run traceroute to the target |
| `--script=SCRIPTS` | Run specified Nmap scripts |
| `-sC` or `--script=default` | Run default scripts |
| `-A` | Equivalent to `-sV -O -sC --traceroute` |
| `-oN` | Save output in normal format |
| `-oG` | Save output in grepable format |
| `-oX` | Save output in XML format |
| `-oA` | Save output in normal, grepable, and XML formats (combines `-oN`, `-oG`, `-oX`) |

---

## Output Formats

- **Normal (`-oN`)**: Human-readable scan output.
- **Grepable (`-oG`)**: Easy to parse with tools like `grep`.
- **XML (`-oX`)**: Most convenient for processing output in other programs.
- **Combined (`-oA FILENAME`)**: Saves all three formats above at once.
- **Script Kiddie (`-oS`)**: A novelty format using leetspeak-style text — not useful for searching or record-keeping, but fun to show off.
  - Example: `nmap -sS 127.0.0.1 -oS FILENAME`