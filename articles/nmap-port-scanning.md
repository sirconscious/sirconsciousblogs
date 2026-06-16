
## Port States

| State | Meaning | Description |
|---|---|---|
| **Open** | Service Running | A service is actively listening on the port |
| **Closed** | No Service | The port is reachable but no service is listening |
| **Filtered** | Firewall Blocking | A firewall/filter is blocking the probe, so the state can't be determined |
| **Blocked** | Inaccessible | The port cannot be reached at all |

---

## Port Scan Types

| Port Scan Type | Example Command |
|---|---|
| TCP Connect Scan | `nmap -sT MACHINE_IP` |
| TCP SYN Scan | `sudo nmap -sS MACHINE_IP` |
| UDP Scan | `sudo nmap -sU MACHINE_IP` |

> These scan types should get you started discovering running TCP and UDP services on a target host.

- **TCP Connect Scan (`-sT`)**: Completes the full TCP 3-way handshake. This is the only option available to **unprivileged users** (non-root/non-sudoers) for discovering open TCP ports.
- **TCP SYN Scan (`-sS`)**: Requires privileged access. Sends a SYN packet without completing the handshake ("half-open" scan) — faster and stealthier.
- **UDP Scan (`-sU`)**: Requires privileged access. Used to discover open UDP services.

---

## Useful Scan Options

| Option | Purpose |
|---|---|
| `-p-` | Scan all ports |
| `-p1-1023` | Scan ports 1 to 1023 |
| `-F` | Scan the 100 most common ports |
| `-r` | Scan ports in consecutive order (don't randomize) |
| `-T<0-5>` | Timing template: `-T0` is slowest, `-T5` is fastest |
| `--max-rate 50` | Limit scan rate to ≤ 50 packets/sec |
| `--min-rate 15` | Ensure scan rate ≥ 15 packets/sec |
| `--min-parallelism 100` | Run at least 100 probes in parallel |

---

## TCP Flags

| Flag | Meaning |
|---|---|
| **URG** | Urgent — the urgent pointer field is significant. Data marked urgent is processed immediately, without waiting for previously sent segments to be handled. |
| **ACK** | Acknowledgement — the acknowledgement number is significant; used to confirm receipt of a segment. |
| **PSH** | Push — requests that data be passed to the application promptly. |
| **RST** | Reset — used to tear down a connection. May be sent by a device to abort a connection, or by a host with no service listening on the targeted port. |
| **SYN** | Synchronize — used to initiate a 3-way handshake and synchronize sequence numbers between hosts. The initial sequence number should be set randomly. |
| **FIN** | Finish — indicates the sender has no more data to send. |

> **Note:** If you are an unprivileged user (not root or sudoer), a **TCP Connect Scan** (`-sT`) is the only option available for discovering open TCP ports.