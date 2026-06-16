## Overview

Nikto is an open-source web server scanner that performs vulnerability scanning against web servers. It checks for dangerous files and programs, misconfigurations, outdated software, and more.

---

## Primary Uses

- **Vulnerability Scanning** — Scans web servers for vulnerabilities, misconfigurations, and outdated software. Also identifies default files and potential security risks.
- **Custom Scanning** — Allows customization of target URLs, ports, and other scan parameters.
- **Output Options** — Supports multiple output formats (plain text, XML, HTML, CSV) for easy post-scan analysis.
- **Extensibility** — Can be extended with custom plugins and scripts to meet specific user needs.

---

## Key Features

- Web server scanning and vulnerability detection
- Identification of misconfigurations
- Support for multiple web server types
- Detection of common vulnerabilities
- Comprehensive plugin system
- Configurable scan options
- SSL/TLS support
- Output in various formats

## Data Sources Used

- Vulnerability databases
- Web server fingerprints
- Configuration files
- Security plugins
- Public exploits and threat reports

---

## Common Commands

### 1. Start a Basic Scan
Initiates a basic scan against a specified target URL.
```bash
nikto -h <target_url>
```

### 2. Specify Port
Targets services running on non-default ports.
```bash
nikto -h <target_url> -p <port>
```

### 3. Use SSL
Enables SSL scanning for HTTPS services.
```bash
nikto -h <target_url> -ssl
```

### 4. Save Output
Saves scan results to a file for post-scan report analysis.
```bash
nikto -h <target_url> -o <output_file>
```

### 5. Use Plugins
Runs a specific plugin during the scan to enhance functionality.
```bash
nikto -h <target_url> -Plugins <plugin_name>
```

### 6. Disable 404 Checks
Suppresses 404 "not found" outputs so you can focus on meaningful findings.
```bash
nikto -h <target_url> -no404
```

### 7. Update Nikto Database
Updates Nikto's vulnerability database to ensure you're using the latest signatures.
```bash
nikto -update
```

### 8. Help and Usage Information
Displays all available options and commands.
```bash
nikto -H
# or
nikto --help
```

---

## Full Command Reference

| Command | Example | Function |
|---|---|---|
| Basic scan | `nikto -h http://example.com` | Initiates a basic scan against the target URL |
| Specify port | `nikto -h http://example.com -p 8080` | Defines a custom port to scan |
| Use SSL | `nikto -h https://example.com -ssl` | Enables SSL/HTTPS scanning |
| Disable 404 checks | `nikto -h http://example.com -no404` | Suppresses irrelevant 404 check results |
| Use plugins | `nikto -h http://example.com -Plugins all` | Runs all available plugins during scan |
| Specify host header | `nikto -h http://example.com -host www.test.com` | Sets a custom Host header for requests |
| Save output (text) | `nikto -h http://example.com -o scan_results.txt` | Logs scan results to a text file |
| Save output (HTML) | `nikto -h http://example.com -o scan.html -Format html` | Saves scan results in HTML format |
| Update database | `nikto -update` | Updates the vulnerability database |
| Display version | `nikto -Version` | Shows the current Nikto version |
| List plugins | `nikto -list-plugins` | Lists all available plugins |
| Tuning options | `nikto -Tuning 1` | Limits scan to specific test types (e.g., file uploads) |
| Set timeout | `nikto -timeout 10` | Sets a 10-second timeout per network request |
| Throttle requests | `nikto -h http://example.com -delay 2` | Adds a 2-second delay between requests to avoid detection |
| Ignore SSL cert | `nikto -h https://example.com -ssl -noverify` | Skips SSL certificate verification |
| Custom User-Agent | `nikto -h http://example.com -useragent "MyAgent"` | Uses a custom User-Agent string |
| Display help | `nikto -H` | Shows the help menu |
| Use config file | `nikto -config /path/to/nikto.conf` | Loads a custom configuration file |

---

## Output Formats

| Flag | Format |
|---|---|
| `-o file.txt` | Plain text |
| `-o file.xml -Format xml` | XML |
| `-o file.html -Format html` | HTML |
| `-o file.csv -Format csv` | CSV |