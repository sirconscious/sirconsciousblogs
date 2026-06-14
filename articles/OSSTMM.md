
Developed by the **Institute for Security and Open Methodologies (ISECOM)**, the [OSSTMM](https://www.isecom.org/OSSTMM.3.pdf) (opens in new tab) (currently at **version 3**) applies the scientific method to security testing. Its defining characteristic is **metrics over opinions**: rather than delivering subjective risk judgments, OSSTMM produces quantifiable, verifiable, and repeatable results.

OSSTMM organizes testing around five **security channels**, reflecting its philosophy that security is not just a network problem:

- **Human Security (HUMSEC)**: human-factor vulnerabilities.
- **Physical Security (PHYSSEC)**: physical access controls, from badge readers to tailgating.
- **Wireless Communications (SPECSEC)**: Wi-Fi, Bluetooth, RFID, and other electromagnetic signals.
- **Telecommunications (COMSEC)**: phone systems, VoIP, fax, and modem infrastructure.
- **Data Networks (DATASEC)**: network services, firewalls, and application-layer protocols.

An organization might have flawless rules, but if an attacker can tailgate into the server room (PHYSSEC) or social-engineer a credential reset (HUMSEC), those network controls become irrelevant. The five channels ensure nothing is overlooked.

At the heart of OSSTMM's quantitative approach are **Risk Assessment Values (RAVs)**. A RAV measures the balance between the total attack surface (exposure) and the controls protecting it. A positive RAV indicates residual risk; a RAV near zero suggests controls are well-matched to exposure. This numeric output means that two testers assessing the same target should arrive at comparable results, much as two engineers measuring the same beam should calculate similar stress tolerances.

## Phases: A Walkthrough

The OSSTMM testing cycle has four phases. Let's walk through them using a scenario: your team is assessing the external network of **FinVault Corp**, a financial services company, scoped to `10.0.113.0/24` and their customer portal at `portal.finvault-corp.thm`.

**Phase 1: Induction** covers enumeration and verification. You map what exists and confirm it is real. At FinVault, you query DNS, review certificate transparency logs, and discover subdomains like `vpn.finvault-corp.thm` and `mail.finvault-corp.thm`. You then verify each asset is live and responsive. The output is a confirmed inventory of the target environment.

**Phase 2: Interaction** covers qualification and quantification. You actively probe the verified assets and assess their relevance. At FinVault, you connect to each service, fingerprint its technology, and quantify the exposure: 12 externally reachable services across 8 hosts, 4 of which accept unauthenticated connections. These findings feed directly into the attack surface calculation.

**Phase 3: Inquiry** covers privilege escalation and verification escalation. You test whether the measured exposure can be converted into unauthorized access. At FinVault, you discover a vulnerability in the customer portal that allows one authenticated user to read another customer's account statements. Verification escalation confirms the scope: read access to 12,000 accounts, no write access.

**Phase 4: Intervention** covers quarantine, audit, and enticement. You address findings and examine the broader control environment. At FinVault, the vulnerable endpoint is restricted. At the same time, a patch is developed (quarantine), the wider access control model is examined for similar flaws (audit), and a canary token is deployed to test internal detection capabilities (enticement).

## Closing Notes

OSSTMM prescribes the **Security Test Audit Report (STAR)** format for deliverables, enforcing consistency and enabling cross-team comparability.

Its scientific rigor is both its greatest strength and its primary barrier. The OSSTMM framework makes results auditable and comparable, which is rare in penetration testing. However, the learning curve is steep, full implementations can be time-consuming, and experienced OSSTMM practitioners are harder to find than those trained in other methodologies. OSSTMM is best suited for organizations that need repeatable, auditable security measurements and are willing to invest in mastering the methodology.