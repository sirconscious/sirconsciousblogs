
You are testing a web application for an online retailer. The application handles user registration, product search, shopping cart, payment processing, and order tracking. Where do you even begin? Do you test the login form first? The search bar? The payment API? With dozens of potential attack surfaces in a single web application, it is easy to either test the same things twice or miss entire vulnerability classes altogether.

The **Open Web Application Security Project (OWASP)** addresses this problem with the **Web Security Testing Guide (WSTG)** (opens in new tab). While OWASP is most widely known for the [Top Ten](https://owasp.org/Top10/) list of critical web vulnerabilities, the WSTG goes far deeper: it is a comprehensive, community-driven framework that organizes web application testing into over 90 discrete test cases grouped across twelve categories.

Those twelve categories cover the full attack surface of a modern web application. They include information gathering, configuration and deployment management, identity management, authentication, authorization, session management, input validation, error handling, cryptography, business logic, client-side testing, and API testing. Each category contains numbered test cases (e.g., `WSTG-INPV-01` for reflected cross-site scripting) with step-by-step guidance on what to test and how to test it.

The WSTG adopts a **risk-based approach**: vulnerabilities are prioritized based on their exploitability and impact, not simply cataloged. This approach helps testers focus their efforts where they matter most.

## Phases: Security Across the SDLC

What sets the WSTG apart from many penetration testing frameworks is that it does not treat security as a single event. Instead, it aligns testing across **five phases of the Software Development Life Cycle (SDLC)** , embedding security from initial planning through post-launch maintenance.

Let's see how this works for our online retailer, **ShopSecure Inc.** , which is building a new customer portal.

### Phase 1: Before development begins
Security requirements and regulatory obligations are established upfront. For ShopSecure, this means defining that the portal must comply with PCI DSS (since it processes payments) and establishing measurable criteria, such as the maximum acceptable time for patching vulnerabilities.

### Phase 2: During definition and design
The application architecture is reviewed for security flaws before any code is written. ShopSecure's team creates threat models for the payment flow, identifying that the checkout API will be a high-value target and designing rate-limiting and input validation controls from the start.

### Phase 3: During development
Code is vetted through walkthroughs and reviews. ShopSecure's developers review the authentication module against WSTG test cases for credential handling (`WSTG-ATHN`), identifying a flaw in which password reset tokens do not expire.

### Phase 4: During deployment
Security controls are verified in the production environment. ShopSecure's team runs a penetration test against the staged application, verifying that default credentials have been changed, that TLS is properly configured, and that no debug endpoints are exposed.

### Phase 5: During maintenance and operations
Security is maintained post-launch through periodic health checks, especially after updates. When ShopSecure pushes a new product recommendation feature three months later, the relevant WSTG test cases are re-executed to ensure the update has not introduced new vulnerabilities.

## Closing Notes

The WSTG's greatest strength is its exhaustive, practical coverage. With over 90 test cases, each containing specific procedures and expected results, it gives testers a concrete roadmap rather than abstract principles. It also benefits from continuous updates from a global community of security professionals, keeping it current with emerging vulnerability classes and modern architectures such as SPAs and microservices.

On the downside, a full implementation of every test case can be impractical for resource-constrained teams. Some tests require specialized expertise in areas like cryptographic analysis or business logic testing. There is also a risk of falling into a **checklist mentality**, where testers mechanically execute test cases without stepping back to assess the application's overall risk posture. The best practitioners use the WSTG as a foundation while applying critical thinking beyond the checklist.