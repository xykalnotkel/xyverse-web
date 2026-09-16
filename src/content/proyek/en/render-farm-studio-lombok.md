---
title: "A Render Farm for an Animation Studio in Lombok"
desc: "Building a six-node render cluster that cut episode render time from 18 hours to 3."
date: 2026-08-28
klien: "A local animation studio"
layanan: "Cloud PC"
stack: ["Blender", "Ubuntu", "NVIDIA GPU", "Deadline"]
status: "Completed"
unggulan: true
lang: "en"
---

## The challenge

The studio produced one animated episode a week, but rendering a single episode took 18 hours on one workstation. Deadlines slipped often and revisions were all but impossible.

## The solution

We set up six Cloud PC nodes with dedicated GPUs, coordinated by a central render queue manager. Artists submit jobs from their local machines and the system distributes frames across every node automatically.

Nodes only run when there is a queue, so cost follows real usage rather than a full month's rent.

## The result

- Render time fell **from 18 hours to 3**
- The studio can now run two revision cycles per episode
- Infrastructure cost is 40% lower than buying new workstations
