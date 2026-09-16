---
title: "Render Farm untuk Studio Animasi Lombok"
desc: "Membangun kluster render enam node yang memangkas waktu render episode dari 18 jam menjadi 3 jam."
date: 2026-08-28
klien: "Studio Animasi Lokal"
layanan: "Cloud PC"
stack: ["Blender", "Ubuntu", "NVIDIA GPU", "Deadline"]
status: "Selesai"
unggulan: true
---

## Tantangan

Studio memproduksi satu episode animasi per minggu, namun render satu episode memakan 18 jam pada workstation tunggal. Deadline sering meleset dan revisi hampir mustahil dilakukan.

## Solusi

Kami menyiapkan enam node Cloud PC dengan GPU dedicated, dikoordinasi oleh manajer antrean render terpusat. Artist mengirim job dari mesin lokal, sistem membagi frame ke seluruh node secara otomatis.

Node hanya aktif saat ada antrean, sehingga biaya mengikuti pemakaian nyata, bukan sewa bulanan penuh.

## Hasil

- Waktu render turun dari **18 jam menjadi 3 jam**
- Studio mampu melakukan dua siklus revisi per episode
- Biaya infrastruktur 40% lebih rendah dibanding membeli workstation baru
