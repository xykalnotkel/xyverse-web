---
title: "Security Policy"
desc: "Xyverse's infrastructure security practices and guidance on reporting vulnerabilities responsibly."
diperbarui: "16 September 2026"
ringkas: "We encrypt everything, isolate every Instance, and log every admin access. If you find a security hole, tell us — researchers who report in good faith will not be pursued, and we show our appreciation."
lang: "en"
---
## 1. Our security practices

### 1.1 Encryption

| Layer | Protection |
|---|---|
| Transport | TLS 1.3, HSTS enabled, certificates renewed automatically |
| Storage | Disk-level encryption on every volume |
| Backups | Encrypted with separate keys |
| Remote sessions | End-to-end encrypted channel in XyDesk |

### 1.2 Isolation

Every Instance runs on virtualisation with full isolation. There is no shared memory or process namespace between customers. Each customer's network is logically separated.

### 1.3 Access control

- Two-step authentication is mandatory for all administrative access
- Least-privilege access for all personnel
- Every administrative access is logged and reviewed regularly
- Credentials are rotated on a schedule

### 1.4 Monitoring

Monitoring runs around the clock for traffic anomalies, runs of failed sign-in attempts, unusual resource spikes, and system file integrity.

### 1.5 Vulnerability management

Critical security patches are applied within **72 hours** of becoming available. Infrastructure vulnerability scanning is carried out regularly.

## 2. Shared responsibility

| Our responsibility | Your responsibility |
|---|---|
| Physical data centre security | Operating system security inside the Instance |
| The hypervisor and base network | Your passwords and access keys |
| Isolation between customers | Firewall configuration inside the Instance |
| Infrastructure availability | Updating the software you install |
| Storage encryption | Backing up your important data |

A Cloud PC behaves like a personal computer: what is inside it is entirely under your control, security included.

## 3. Reporting a vulnerability

We welcome reports from security researchers.

**Send to:** [keamanan@xyverse.my.id](mailto:keamanan@xyverse.my.id)
**Standard file:** [/.well-known/security.txt](/.well-known/security.txt)

### What to include

1. A description of the vulnerability and its potential impact
2. Clear, followable reproduction steps
3. A proof of concept, if you have one
4. The affected version or component
5. Your name for the acknowledgements page, if you would like it listed

### Our response times

| Stage | Target |
|---|---|
| Acknowledgement of receipt | 24 hours |
| Initial assessment | 5 working days |
| Fix for a critical hole | 7 days |
| Fix for a medium hole | 30 days |
| Publication of acknowledgement | Once the fix is deployed |

## 4. Responsible disclosure

### The ground rules

**Allowed:** testing on your own account, reporting findings privately first, and giving us reasonable time to fix them.

**Not allowed:** accessing other customers' data, running denial of service attacks, social engineering our staff, damaging or deleting data, and disclosing findings publicly before a fix is available.

### Safe harbour

Researchers who follow the rules above **will not face legal action from us** and will not have their account terminated. We treat good-faith reporting as a contribution, not a threat.

### Recognition

We do not yet run a formal cash bounty programme. For valid findings we offer a listing on the security acknowledgements page, Cloud PC service credit, and a letter of recommendation where useful.

## 5. Incident handling

Where a security incident affects Customer data:

1. We contain and isolate the impact as fast as we can.
2. Affected customers are notified within **3 × 24 hours at most**, as the Personal Data Protection Law requires.
3. The notice sets out what happened, what data was affected, and the steps you should take.
4. A post-mortem is published once the investigation is complete.

## 6. Security advice for you

- Enable two-step authentication on your Xyverse account
- Use long, unique passwords kept in a password manager
- Restrict RDP or SSH access to IP addresses you trust
- Keep the operating system inside your Instance updated
- Take regular backups and keep a copy outside the Instance
- Never share credentials over an unencrypted channel

## 7. Contact

- Security vulnerabilities: [keamanan@xyverse.my.id](mailto:keamanan@xyverse.my.id)
- Service abuse: [abuse@xyverse.my.id](mailto:abuse@xyverse.my.id)
- General questions: [halo@xyverse.my.id](mailto:halo@xyverse.my.id)
