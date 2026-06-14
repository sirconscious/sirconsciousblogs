---
title: "Understanding ARP Spoofing"
date: "2026-06-14"
description: "A quick look at how ARP spoofing works, why it's effective on local networks, and basic ways to detect and prevent it."
tags: ["networking", "mitm", "fundamentals"]
---

## What is ARP?

The Address Resolution Protocol (ARP) maps IP addresses to MAC addresses on a local network. When a device wants to talk to another device, it broadcasts an ARP request asking "who has this IP?" and the owner replies with its MAC address.

## The Problem

ARP has no authentication. Any device on the network can reply to an ARP request — or send unsolicited replies — and other devices will trust it.

## How ARP Spoofing Works

1. Attacker sends forged ARP replies to the victim, claiming to be the gateway
2. Attacker sends forged ARP replies to the gateway, claiming to be the victim
3. Traffic between the victim and gateway now flows through the attacker

```bash
# Example using arpspoof (for lab/testing environments only)
arpspoof -i eth0 -t 192.168.1.10 192.168.1.1
```

> Only run tools like this on networks and devices you own or have explicit permission to test.

## Detection & Prevention

| Method | Description |
|---|---|
| Static ARP entries | Manually map critical IP/MAC pairs |
| ARP monitoring | Tools like `arpwatch` alert on table changes |
| Port security | Switches that bind a MAC to a specific port |
| Encryption | TLS/VPN limits what an attacker can read even if MITM succeeds |

## Takeaway

ARP spoofing is a classic example of trusting a protocol with no built-in authentication. It's a good first lab exercise for understanding MITM attacks before moving to more complex techniques like DNS spoofing or SSL stripping.