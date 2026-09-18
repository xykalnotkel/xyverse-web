---
title: "Service Level Agreement (SLA)"
desc: "Xyverse's 99.9% monthly uptime commitment, how downtime is defined, and the compensation credit scheme."
diperbarui: "16 September 2026"
ringkas: "We guarantee 99.9% uptime per month for Cloud PC. If we miss it you receive service credit — from 10% up to 100% of that month's invoice, depending on how severe the disruption was."
lang: "en"
---
## 1. Scope

This SLA applies to **paid Cloud PC services** on an active plan. It does not apply to free trials, beta environments, or project development work.

## 2. Availability commitment

| Plan | Monthly uptime commitment | Maximum downtime |
|---|---|---|
| Starter | 99.5% | ± 3 hours 39 minutes |
| Pro | 99.9% | ± 43 minutes |
| Enterprise | 99.95% | ± 21 minutes |

Calculations use the current calendar month.

## 3. Definitions

**Uptime** is the percentage of time an Instance is reachable from the public network within one calendar month.

Formula: `Uptime = ((Total minutes − Downtime minutes) ÷ Total minutes) × 100`

**Downtime minutes** are the span from the point an Instance is shown to be unreachable until access is restored, measured from our monitoring systems or from verified support tickets.

## 4. What does not count as downtime

1. Scheduled maintenance announced at least 48 hours ahead, capped at 4 hours per month.
2. Emergency maintenance to patch a critical security hole.
3. Disruption caused by the Customer, such as firewall misconfiguration, a full disk, or an operating system crash.
4. Problems on the Customer's own internet connection or with their provider.
5. Suspension for policy breach or unpaid invoices.
6. Force majeure: natural disaster, war, civil unrest, or government order.
7. DDoS attacks aimed at the Customer's Instance and outside our reasonable control.

## 5. Service credits

| Uptime achieved | Credit |
|---|---|
| 99.0% – below the commitment | 10% of the current month's invoice |
| 95.0% – 98.99% | 25% |
| 90.0% – 94.99% | 50% |
| 80.0% – 89.99% | 75% |
| Below 80.0% | 100% |

Credit is issued as a discount on the following period's invoice, not as cash. Total credit in one month never exceeds 100% of that month's invoice.

## 6. How to file a claim

1. File within **30 days** of the month the disruption occurred.
2. Send it to [xycdigital@gmail.com](mailto:xycdigital@gmail.com) with the subject **"SLA Claim"**.
3. Include the Instance ID, the date and time of the disruption with its time zone, and supporting evidence such as ping results, a traceroute, or screenshots.
4. We verify and reply within **10 working days**.
5. Approved credit appears on your next invoice.

Claims filed after 30 days cannot be processed.

## 7. Support response times

| Level | Description | First response | Service hours |
|---|---|---|---|
| Critical | Service completely down | 1 hour | 24/7 |
| High | A core function is impaired | 4 hours | 24/7 |
| Medium | Partial disruption | 1 working day | Monday–Friday |
| Low | General questions | 2 working days | Monday–Friday |

Enterprise customers receive a priority lane and a dedicated channel.

## 8. Scheduled maintenance

The routine maintenance window is **Sunday, 02:00–06:00 WIB**. Notice goes out by email and on the status page at least 48 hours ahead. Most maintenance is carried out live without stopping the service.

## 9. Monitoring and transparency

We monitor every Instance continuously from several vantage points. Incident history and post-mortems for major disruptions are published so you can judge our reliability for yourself.

## 10. Changes to this SLA

Changes that reduce the commitment take effect only from the following subscription period and are announced at least 60 days in advance.
