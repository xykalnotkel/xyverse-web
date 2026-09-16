---
title: "A Software Licence Management Panel"
desc: "A licence issuing and validation system with anti-sharing protection for an independent software seller."
date: 2026-06-30
klien: "An indie software developer"
layanan: "Custom Software"
stack: ["Next.js", "Prisma", "Redis", "Cloudflare"]
status: "Ongoing"
lang: "en"
---

## The challenge

The client sells desktop software, but licence keys were circulating freely on forums. Leakage was estimated at 30% of total sales.

## The solution

A licence issuing panel that binds each key to a device fingerprint. Every licence has an activation limit, and periodic validation runs through a lightweight endpoint on the edge network so it adds no latency.

Admins can revoke, extend, or transfer a licence through a simple interface.

## The result

- Illegal activations dropped sharply within the first two months
- Licence issuing went from manual to fully automatic
- Licence-related support requests fell by around 60%
