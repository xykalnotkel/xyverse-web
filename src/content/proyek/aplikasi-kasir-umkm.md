---
title: "Aplikasi Kasir untuk Jaringan UMKM Kuliner"
desc: "Sistem POS lintas cabang dengan mode offline, sinkronisasi otomatis, dan laporan terpusat."
date: 2026-07-19
klien: "Jaringan Kuliner 9 Cabang"
layanan: "Produksi Apps"
stack: ["Flutter", "PostgreSQL", "Node.js", "Midtrans"]
status: "Maintenance"
unggulan: true
---

## Tantangan

Sembilan cabang memakai sistem pencatatan berbeda. Pemilik baru mengetahui angka penjualan gabungan di akhir bulan, dan sering terjadi selisih stok.

## Solusi

Aplikasi kasir berbasis Flutter yang berjalan di tablet Android murah. Kunci utamanya adalah **mode offline**: transaksi tetap tercatat saat internet mati, lalu tersinkron otomatis begitu koneksi pulih.

Dashboard pemilik menampilkan penjualan seluruh cabang secara real-time, lengkap dengan peringatan stok menipis.

## Hasil

- Selisih stok turun dari 7% menjadi di bawah 1%
- Laporan gabungan tersedia real-time, bukan bulanan
- Waktu tutup kasir harian berkurang dari 30 menit menjadi 5 menit
