

Have you ever studied a vintage textbook and found that, despite its age, the core logic still holds up? In cyber security, tools and exploits have a short shelf life, but well-designed methodologies can outlast the technologies they were built to test. The **Information Systems Security Assessment Framework (ISSAF)** is a case in point.

Developed by the **Open Information Systems Security Group (OISSG)** , ISSAF is an open-source penetration testing framework designed to evaluate network, system, and application security. The latest version, **ISSAF v0.2.1**, was published around 2006, and the framework is no longer actively maintained. There is no longer an official URL to download it; however, the draft can still be found through archived sources online. This is important context: ISSAF's methodology and phase structure remain instructive, but its tool-specific guidance is outdated and should not be relied upon for current engagements.

So why study a framework that is no longer maintained? Because ISSAF's **nine-step assessment model** is one of the clearest representations of how an attacker progresses through a target environment. It mirrors the logic of an advanced persistent threat, moving systematically from initial reconnaissance to persistent access and the removal of evidence. If that progression sounds familiar, it should; it is the kill-chain thinking you have encountered in detail in the Cyber Kill Chain room.

ISSAF covers a broad range of security domains, including network infrastructure, host systems, web applications, databases, and wireless. Its risk-based approach prioritizes high-impact, exploitable vulnerabilities over low-severity findings.

## Phases: A Walkthrough

ISSAF divides an assessment into three phases. Let's walk through them with a scenario: your team is assessing the security of **TechBridge Solutions**, a software development company with 200 employees, an internal server, and a client-facing project management portal.

### Phase 1: Planning and Preparation

This phase sets the engagement boundaries. You meet with TechBridge's leadership to define the scope (corporate network, server, and the project management portal), establish escalation protocols and emergency contacts, identify constraints (the production server must not be disrupted during business hours), and agree on the toolset appropriate for the assessment.

### Phase 2: Assessment

This is the core of ISSAF and where its nine-step model lives. Each step builds on the previous one, simulating how a real adversary would progress through the environment.

1. **Information gathering**: Collect publicly available data about TechBridge. DNS records, WHOIS data, employee profiles on LinkedIn, and technology references in job postings ("experience with Jenkins and GitLab required") all feed your understanding of the target.
2. **Network mapping**: Map the live network topology. You discover TechBridge's external IP range hosts the project portal, a VPN gateway, and a mail server. Internal scanning (once in scope) reveals the database server, a build server, and several developer workstations.
3. **Vulnerability identification**: Scan the mapped assets for weaknesses. The project portal runs an outdated CMS with a known authentication bypass. The build server has its administrative console exposed without authentication.
4. **Penetration**: Attempt initial exploitation. You exploit the unauthenticated Jenkins console to execute system commands on the build server.
5. **Gaining access and privilege escalation**: Escalate from initial access to higher privileges. From the build server, you recover stored credentials for the service account that deploys code to production, which has administrative rights on the database server.
6. **Enumerating further**: With elevated access, enumerate what is now reachable. From the build server, you discover Git repositories containing API keys, database connection strings, and client project source code.
7. **Compromise remote users/sites (lateral movement)**: Move laterally to other systems. Using the harvested credentials, you access several developer workstations and the internal mail server.
8. **Maintaining access**: Establish persistent access to demonstrate that a real attacker could retain their foothold. You document (without actually deploying) how a backdoor could be planted in the CI/CD pipeline, persisting across system reboots and deployments.
9. **Covering tracks**: Demonstrate how an attacker would erase evidence. You document which logs captured your activity and identify gaps in TechBridge's logging that would allow a real adversary to operate undetected.

Notice the progression: each step deepens the attacker's position in the environment. Steps 1 through 3 are reconnaissance and analysis, steps 4 through 7 are active compromise, and steps 8 through 9 address persistence and stealth.

### Phase 3: Reporting and Cleanup

You compile findings into a structured report, prioritized by business impact. The unauthenticated Jenkins console is flagged as critical because it provided the initial foothold that led to source code access. Cleanup involves removing any test artifacts, revoking any temporary accounts created during testing, and confirming with TechBridge's team that no testing residue remains in their environment.

## Closing Notes

ISSAF's nine-step model is its lasting contribution. The progression from information gathering through lateral movement to covering tracks provides a clear mental model for how real-world attacks unfold, making it an excellent educational tool even though the framework itself is no longer maintained.

However, that unmaintained status is a real limitation. The tool-specific guidance references software versions that are over a decade out of date, and there is no community updating the documentation. ISSAF should be studied for its methodology and adversarial logic, not for its technical procedures. For current tool guidance, supplement with resources such as PTES, OWASP WSTG, or the relevant tool documentation.