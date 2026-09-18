---
title: "Kebijakan Keamanan"
desc: "Praktik keamanan infrastruktur Xyverse dan panduan pelaporan kerentanan secara bertanggung jawab."
diperbarui: "16 September 2026"
ringkas: "Kami mengenkripsi semuanya, mengisolasi setiap Instance, dan mencatat tiap akses admin. Kalau lu menemukan celah keamanan, laporkan ke kami \u2014 peneliti yang melapor dengan baik tidak akan kami tuntut, dan kami beri apresiasi."
lang: "id"
---
## 1. Praktik keamanan kami

### 1.1 Enkripsi

| Lapisan | Perlindungan |
|---|---|
| Transportasi | TLS 1.3, HSTS aktif, sertifikat diperbarui otomatis |
| Penyimpanan | Enkripsi tingkat disk pada seluruh volume |
| Cadangan | Terenkripsi dengan kunci terpisah |
| Sesi remote | Kanal terenkripsi ujung ke ujung pada XyDesk |

### 1.2 Isolasi

Setiap Instance berjalan pada virtualisasi dengan isolasi penuh. Tidak ada berbagi memori atau
namespace proses antar pelanggan. Jaringan tiap pelanggan dipisahkan secara logis.

### 1.3 Kontrol akses

- Autentikasi dua langkah wajib untuk seluruh akses administratif
- Prinsip hak akses paling minim bagi seluruh personel
- Setiap akses administratif dicatat dan ditinjau berkala
- Kredensial dirotasi secara terjadwal

### 1.4 Pemantauan

Pemantauan berjalan sepanjang waktu untuk anomali lalu lintas, percobaan masuk yang gagal
secara beruntun, lonjakan sumber daya yang tidak wajar, dan integritas berkas sistem.

### 1.5 Pengelolaan celah

Tambalan keamanan kritis diterapkan dalam **72 jam** sejak tersedia. Pemindaian kerentanan
infrastruktur dilakukan secara berkala.

## 2. Tanggung jawab bersama

| Tanggung jawab kami | Tanggung jawab Anda |
|---|---|
| Keamanan fisik pusat data | Keamanan sistem operasi di dalam Instance |
| Hypervisor dan jaringan dasar | Kata sandi dan kunci akses Anda |
| Isolasi antar pelanggan | Konfigurasi firewall di dalam Instance |
| Ketersediaan infrastruktur | Pembaruan perangkat lunak yang Anda pasang |
| Enkripsi penyimpanan | Cadangan data penting Anda |

Cloud PC bersifat seperti komputer pribadi: isinya sepenuhnya kendali Anda, termasuk
keamanannya.

## 3. Pelaporan kerentanan

Kami menyambut baik laporan dari peneliti keamanan.

**Kirim ke:** [xycdigital@gmail.com](mailto:xycdigital@gmail.com)
**Berkas standar:** [/.well-known/security.txt](/.well-known/security.txt)

### Yang perlu disertakan

1. Uraian kerentanan dan potensi dampaknya
2. Langkah reproduksi yang jelas dan dapat diikuti
3. Bukti konsep, bila ada
4. Versi atau komponen yang terdampak
5. Nama Anda untuk pencantuman apresiasi, bila diinginkan

### Waktu tanggap kami

| Tahap | Target |
|---|---|
| Konfirmasi penerimaan | 24 jam |
| Penilaian awal | 5 hari kerja |
| Perbaikan celah kritis | 7 hari |
| Perbaikan celah sedang | 30 hari |
| Publikasi apresiasi | Setelah perbaikan diterapkan |

## 4. Pengungkapan yang bertanggung jawab

### Aturan main

**Diperbolehkan:** menguji pada akun milik Anda sendiri, melaporkan temuan secara privat lebih
dulu, dan memberi kami waktu wajar untuk memperbaiki.

**Tidak diperbolehkan:** mengakses data pelanggan lain, melakukan serangan penolakan layanan,
merekayasa sosial terhadap personel kami, merusak atau menghapus data, dan mengungkap temuan
ke publik sebelum perbaikan tersedia.

### Pelabuhan aman

Peneliti yang mematuhi aturan di atas **tidak akan kami tuntut secara hukum** dan tidak akan
kami hentikan akunnya. Kami memperlakukan pelaporan yang beritikad baik sebagai kontribusi,
bukan ancaman.

### Apresiasi

Kami belum menjalankan program hadiah uang formal. Untuk temuan yang valid kami memberikan
pencantuman nama pada halaman apresiasi keamanan, kredit layanan Cloud PC, dan surat
rekomendasi bila diperlukan.

## 5. Penanganan insiden

Bila terjadi insiden keamanan yang memengaruhi data Pelanggan:

1. Kami menahan dan mengisolasi dampak secepat mungkin.
2. Pelanggan terdampak diberitahu dalam **maksimal 3 × 24 jam** sesuai UU PDP.
3. Pemberitahuan memuat apa yang terjadi, data yang terdampak, dan langkah yang perlu Anda ambil.
4. Laporan pascakejadian diterbitkan setelah investigasi selesai.

## 6. Saran keamanan untuk Anda

- Aktifkan autentikasi dua langkah pada akun Xyverse
- Gunakan kata sandi unik yang panjang, disimpan pada pengelola kata sandi
- Batasi akses RDP atau SSH hanya pada alamat IP yang Anda percaya
- Perbarui sistem operasi di dalam Instance secara rutin
- Buat cadangan berkala dan simpan salinannya di luar Instance
- Jangan membagikan kredensial melalui kanal yang tidak terenkripsi

## 7. Kontak

- Kerentanan keamanan: [xycdigital@gmail.com](mailto:xycdigital@gmail.com)
- Penyalahgunaan layanan: [xycdigital@gmail.com](mailto:xycdigital@gmail.com)
- Pertanyaan umum: [xycdigital@gmail.com](mailto:xycdigital@gmail.com)
