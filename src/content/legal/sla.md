---
title: "Jaminan Tingkat Layanan (SLA)"
desc: "Komitmen uptime Xyverse sebesar 99,9% per bulan, definisi gangguan, dan skema kredit kompensasi."
diperbarui: "16 September 2026"
ringkas: "Kami menjamin uptime 99,9% per bulan untuk Cloud PC. Kalau meleset, lu dapat kredit layanan \u2014 mulai 10% sampai 100% dari tagihan bulan itu, tergantung seberapa parah gangguannya."
lang: "id"
---
## 1. Cakupan

SLA ini berlaku untuk layanan **Cloud PC berbayar** pada paket aktif. SLA tidak berlaku untuk
masa uji coba gratis, lingkungan beta, dan jasa pengembangan proyek.

## 2. Komitmen ketersediaan

| Paket | Komitmen uptime bulanan | Maksimal gangguan |
|---|---|---|
| Starter | 99,5% | ± 3 jam 39 menit |
| Pro | 99,9% | ± 43 menit |
| Enterprise | 99,95% | ± 21 menit |

Perhitungan memakai bulan kalender berjalan.

## 3. Definisi

**Uptime** adalah persentase waktu Instance dapat diakses dari jaringan publik dalam satu
bulan kalender.

Rumus: `Uptime = ((Total menit − Menit gangguan) ÷ Total menit) × 100`

**Menit gangguan** adalah rentang waktu sejak Instance terbukti tidak dapat diakses sampai
akses pulih, dihitung dari sistem pemantauan kami maupun laporan tiket yang terverifikasi.

## 4. Yang tidak dihitung sebagai gangguan

1. Pemeliharaan terjadwal yang diumumkan minimal 48 jam sebelumnya, maksimal 4 jam per bulan.
2. Pemeliharaan darurat untuk menambal celah keamanan kritis.
3. Gangguan akibat tindakan Pelanggan, misalnya salah konfigurasi firewall, kehabisan disk, atau sistem operasi mogok.
4. Gangguan pada jaringan internet Pelanggan atau penyedia internetnya.
5. Penangguhan akibat pelanggaran kebijakan atau tunggakan pembayaran.
6. Keadaan kahar: bencana alam, perang, kerusuhan, atau perintah pemerintah.
7. Serangan DDoS yang ditujukan kepada Instance Pelanggan dan berada di luar kendali wajar kami.

## 5. Kredit layanan

| Uptime tercapai | Kredit |
|---|---|
| 99,0% – kurang dari komitmen | 10% tagihan bulan berjalan |
| 95,0% – 98,99% | 25% |
| 90,0% – 94,99% | 50% |
| 80,0% – 89,99% | 75% |
| Di bawah 80,0% | 100% |

Kredit diberikan sebagai potongan tagihan periode berikutnya, bukan uang tunai. Total kredit
dalam satu bulan tidak melebihi 100% tagihan bulan tersebut.

## 6. Cara mengajukan klaim

1. Ajukan dalam **30 hari** setelah bulan terjadinya gangguan.
2. Kirim ke [halo@xyverse.my.id](mailto:halo@xyverse.my.id) dengan subjek **"Klaim SLA"**.
3. Sertakan ID Instance, tanggal dan jam gangguan beserta zona waktu, serta bukti pendukung berupa hasil ping, traceroute, atau tangkapan layar.
4. Kami memverifikasi dan menjawab dalam **10 hari kerja**.
5. Kredit yang disetujui muncul pada tagihan berikutnya.

Klaim yang diajukan lewat 30 hari tidak dapat diproses.

## 7. Waktu tanggap dukungan

| Tingkat | Deskripsi | Tanggap pertama | Jam layanan |
|---|---|---|---|
| Kritis | Layanan mati total | 1 jam | 24/7 |
| Tinggi | Fungsi utama terganggu | 4 jam | 24/7 |
| Sedang | Gangguan sebagian | 1 hari kerja | Senin–Jumat |
| Rendah | Pertanyaan umum | 2 hari kerja | Senin–Jumat |

Pelanggan Enterprise memperoleh jalur prioritas dan kanal khusus.

## 8. Pemeliharaan terjadwal

Jendela pemeliharaan rutin: **Minggu, 02.00–06.00 WIB**. Pemberitahuan dikirim melalui email
dan halaman status minimal 48 jam sebelumnya. Sebagian besar pemeliharaan dilakukan secara
langsung tanpa menghentikan layanan.

## 9. Pemantauan dan transparansi

Kami memantau setiap Instance dari beberapa titik secara terus-menerus. Riwayat insiden dan
laporan pascakejadian untuk gangguan besar dipublikasikan agar Anda dapat menilai sendiri
keandalan layanan.

## 10. Perubahan SLA

Perubahan yang mengurangi komitmen hanya berlaku pada periode langganan berikutnya dan
diberitahukan minimal 60 hari sebelumnya.
