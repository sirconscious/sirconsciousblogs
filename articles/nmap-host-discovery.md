

## Default Behavior

By default, Nmap performs a **ping scan** to find live hosts, then scans only the live hosts for open ports.

- To discover online hosts **without** port-scanning: `nmap -sn TARGETS`
- Omitting `-sn` lets Nmap default to scanning live hosts for ports.

### Privilege-Based Behavior

| Scenario | Method Used |
|---|---|
| Privileged user (root/sudoers), local network (Ethernet/Wi-Fi) | ARP requests |
| Privileged user, target outside local network | ICMP echo request, TCP ACK to port 80, TCP SYN to port 443, ICMP timestamp request |
| Unprivileged user, target outside local network | TCP 3-way handshake (SYN to ports 80 and 443) |

> A **privileged user** is `root` or a user belonging to `sudoers` who can run `sudo`.

---

## Host Discovery Scan Types

| Scan Type | Example Command |
|---|---|
| ARP Scan | `sudo nmap -PR -sn 10.200.6.0/24` |
| ICMP Echo Scan | `sudo nmap -PE -sn 10.200.6.0/24` |
| ICMP Timestamp Scan | `sudo nmap -PP -sn 10.200.6.0/24` |
| ICMP Address Mask Scan | `sudo nmap -PM -sn 10.200.6.0/24` |
| TCP SYN Ping Scan | `sudo nmap -PS22,80,443 -sn 10.200.6.0/30` |
| TCP ACK Ping Scan | `sudo nmap -PA22,80,443 -sn 10.200.6.0/30` |
| UDP Ping Scan | `sudo nmap -PU53,161,162 -sn 10.200.6.0/30` |

> Remember to add `-sn` if you're only interested in host discovery without port-scanning. Omitting `-sn` will let Nmap default to scanning live hosts for ports.

---

## Scan Type Details

### ARP Scan (`-PR`)

- Only possible if you're on the **same subnet** as the target(s).
- On Ethernet (802.3) and Wi-Fi (802.11), you need the target's MAC address before communicating with it (used in the link-layer header for source/destination addressing).
- The OS sends an **ARP query** to obtain the MAC address — a host that replies is considered "up".
- Only works for targets on the same local network.
- Expect to see many ARP queries during a local network scan.

### ICMP Echo Scan (`-PE`)

- Sends ICMP echo requests to check if hosts are alive.
- Add `-sn` if you don't want a follow-up port scan.

### ICMP Timestamp Scan (`-PP`)

- ICMP echo requests are often blocked by firewalls, so this is an alternative.
- Sends an ICMP **Timestamp Request** (Type 13) and checks for an ICMP **Timestamp Reply** (Type 14).
- Live hosts are expected to respond.

### ICMP Address Mask Scan (`-PM`)

- Another alternative when ICMP echo is blocked.
- Sends an ICMP Address Mask Request and checks for a reply to determine if the host is online.

### TCP SYN Ping Scan (`-PS`)

- Privileged users can send TCP SYN packets without completing the full 3-way handshake, even if the port is open.
- Unprivileged users must complete the 3-way handshake if the port is open.
- By default, port 80 is used if no port is specified.
- Syntax accepts a single port, a range, a list, or a combination: `-PS21`, `-PS21-25`, `-PS80,443,8080`.

### TCP ACK Ping Scan (`-PA`)

- Similar syntax to TCP SYN ping.
- By default, port 80 is used if no port is specified.
- Syntax: `-PA21`, `-PA21-25`, `-PA80,443,8080`.

### UDP Ping Scan (`-PU`)

- Sends a UDP packet to check if a host is online.
- Unlike TCP SYN, a UDP packet to an **open** port typically gets **no reply**.
- A UDP packet to a **closed** port should trigger an **ICMP port-unreachable** response — this confirms the host is up.

---

## Useful Options

| Option | Purpose |
|---|---|
| `-n` | No DNS lookup |
| `-R` | Reverse-DNS lookup for all hosts |
| `-sn` | Host discovery only (no port scan) |