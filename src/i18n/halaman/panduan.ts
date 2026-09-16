import type { Lang } from '../config';

export const PANDUAN: Record<Lang, any> = {
  id: {
    ctaH2: 'Panduan yang lu cari belum ada?',
    ctaP: 'Kirim usulan topik — kalau banyak yang butuh, kami tulis dan publikasikan.',
    metaTitle: 'Panduan', ogTag: 'Panduan', ldName: 'Panduan Xyverse',
    ldDescB: ' panduan langkah demi langkah untuk Cloud PC, XyDesk, dan XyCloudStore.',
    metaDescB: ' panduan praktis: memulai Cloud PC, mengoptimalkan XyDesk, mengelola tim, keamanan, sampai pemecahan masalah.',
    eyebrow: 'Panduan',
    judul: 'Semua yang perlu lu tahu, ditulis runtut.',
    leadB: ' panduan dari nol sampai mahir. Tiap artikel punya langkah konkret, bukan teori panjang.',
    cariPh: 'Cari panduan… misal: latensi, snapshot, 2FA', cariAria: 'Cari panduan',
    kosong: 'Tidak ada panduan yang cocok.',
    kategori: [
      { h: 'Memulai', ik: 'rocket', item: [
        { t: 'Membuat akun Xyverse', d: 'Daftar, verifikasi email, dan amankan akun dengan 2FA.', m: '4 menit' },
        { t: 'Menyewa Cloud PC pertama', d: 'Memilih paket, region, dan sistem operasi yang tepat.', m: '7 menit' },
        { t: 'Menghubungkan lewat XyDesk', d: 'Pasang klien, masukkan kode sesi, dan atur kualitas streaming.', m: '5 menit' },
        { t: 'Memahami tagihan', d: 'Cara biaya per jam dihitung dan kapan tagihan diterbitkan.', m: '6 menit' },
      ]},
      { h: 'Cloud PC', ik: 'server', item: [
        { t: 'Memilih spesifikasi sesuai beban kerja', d: 'Panduan CPU, RAM, dan GPU untuk render, coding, atau gaming.', m: '9 menit' },
        { t: 'Mengatur snapshot dan cadangan', d: 'Membuat titik simpan sebelum perubahan besar.', m: '5 menit' },
        { t: 'Menjadwalkan mesin otomatis', d: 'Hemat biaya dengan mematikan mesin di luar jam kerja.', m: '6 menit' },
        { t: 'Menambah penyimpanan', d: 'Memperluas disk tanpa kehilangan data.', m: '4 menit' },
        { t: 'Memindahkan instance antar region', d: 'Prosedur migrasi dan perkiraan waktu henti.', m: '8 menit' },
      ]},
      { h: 'XyDesk', ik: 'monitor', item: [
        { t: 'Mengoptimalkan latensi', d: 'Pengaturan bitrate, codec, dan buffer untuk koneksi lu.', m: '8 menit' },
        { t: 'Menggunakan multi-monitor', d: 'Mengatur tiga layar dengan resolusi berbeda.', m: '5 menit' },
        { t: 'Transfer berkas dua arah', d: 'Seret dan lepas antara perangkat lokal dan Cloud PC.', m: '3 menit' },
        { t: 'Memetakan gamepad dan tablet', d: 'Membuat periferal USB terbaca di sesi remote.', m: '6 menit' },
      ]},
      { h: 'XyCloudStore', ik: 'grid', item: [
        { t: 'Memasang software satu ketuk', d: 'Katalog Blender, DaVinci, Docker, dan lainnya.', m: '4 menit' },
        { t: 'Mengundang anggota tim', d: 'Peran penuh, operator, atau hanya melihat.', m: '5 menit' },
        { t: 'Membaca grafik penggunaan', d: 'Memahami konsumsi CPU, RAM, GPU, dan biaya berjalan.', m: '6 menit' },
      ]},
      { h: 'Keamanan', ik: 'shield', item: [
        { t: 'Mengaktifkan autentikasi dua langkah', d: 'Melindungi akun dari akses tidak sah.', m: '3 menit' },
        { t: 'Membatasi akses berdasarkan IP', d: 'Hanya izinkan koneksi dari jaringan yang lu percaya.', m: '7 menit' },
        { t: 'Mengelola kunci SSH', d: 'Membuat, memasang, dan merotasi kunci dengan aman.', m: '8 menit' },
      ]},
      { h: 'Pemecahan Masalah', ik: 'wrench', item: [
        { t: 'Sesi terputus berulang', d: 'Mendiagnosis masalah jaringan dan MTU.', m: '7 menit' },
        { t: 'Performa terasa lambat', d: 'Mengecek bottleneck CPU, disk, atau bandwidth.', m: '9 menit' },
        { t: 'Tidak bisa masuk ke akun', d: 'Memulihkan akses saat 2FA hilang.', m: '5 menit' },
        { t: 'Instance tidak mau menyala', d: 'Langkah pemulihan dan kapan menghubungi dukungan.', m: '6 menit' },
      ]},
    ],
  },
  en: {
    ctaH2: 'The guide you need is not here yet?',
    ctaP: 'Send us a topic suggestion — if enough people need it, we will write it and publish it.',
    metaTitle: 'Guides', ogTag: 'Guides', ldName: 'Xyverse Guides',
    ldDescB: ' step-by-step guides for Cloud PC, XyDesk, and XyCloudStore.',
    metaDescB: ' practical guides: getting started with a Cloud PC, tuning XyDesk, managing a team, security, and troubleshooting.',
    eyebrow: 'Guides',
    judul: 'Everything you need to know, written in order.',
    leadB: ' guides from zero to fluent. Every article gives concrete steps rather than long theory.',
    cariPh: 'Search guides… e.g. latency, snapshot, 2FA', cariAria: 'Search guides',
    kosong: 'No guides match your search.',
    kategori: [
      { h: 'Getting Started', ik: 'rocket', item: [
        { t: 'Creating an Xyverse account', d: 'Sign up, verify your email, and secure the account with 2FA.', m: '4 min' },
        { t: 'Renting your first Cloud PC', d: 'Choosing the right plan, region, and operating system.', m: '7 min' },
        { t: 'Connecting through XyDesk', d: 'Install the client, enter the session code, and set stream quality.', m: '5 min' },
        { t: 'Understanding your bill', d: 'How hourly costs are calculated and when invoices are issued.', m: '6 min' },
      ]},
      { h: 'Cloud PC', ik: 'server', item: [
        { t: 'Choosing specs for your workload', d: 'A guide to CPU, RAM, and GPU for rendering, coding, or gaming.', m: '9 min' },
        { t: 'Setting up snapshots and backups', d: 'Creating a save point before any major change.', m: '5 min' },
        { t: 'Scheduling machines automatically', d: 'Save money by shutting machines down outside working hours.', m: '6 min' },
        { t: 'Adding storage', d: 'Expanding the disk without losing data.', m: '4 min' },
        { t: 'Moving instances between regions', d: 'The migration procedure and expected downtime.', m: '8 min' },
      ]},
      { h: 'XyDesk', ik: 'monitor', item: [
        { t: 'Optimising latency', d: 'Bitrate, codec, and buffer settings for your connection.', m: '8 min' },
        { t: 'Using multiple monitors', d: 'Setting up three displays at different resolutions.', m: '5 min' },
        { t: 'Two-way file transfer', d: 'Drag and drop between your local device and the Cloud PC.', m: '3 min' },
        { t: 'Mapping gamepads and tablets', d: 'Making USB peripherals visible inside the remote session.', m: '6 min' },
      ]},
      { h: 'XyCloudStore', ik: 'grid', item: [
        { t: 'One-tap software installs', d: 'The catalogue: Blender, DaVinci, Docker, and more.', m: '4 min' },
        { t: 'Inviting team members', d: 'Full access, operator, or view-only roles.', m: '5 min' },
        { t: 'Reading the usage charts', d: 'Understanding CPU, RAM, GPU consumption and running costs.', m: '6 min' },
      ]},
      { h: 'Security', ik: 'shield', item: [
        { t: 'Enabling two-factor authentication', d: 'Protecting your account from unauthorised access.', m: '3 min' },
        { t: 'Restricting access by IP', d: 'Allow connections only from networks you trust.', m: '7 min' },
        { t: 'Managing SSH keys', d: 'Creating, installing, and rotating keys safely.', m: '8 min' },
      ]},
      { h: 'Troubleshooting', ik: 'wrench', item: [
        { t: 'Sessions disconnecting repeatedly', d: 'Diagnosing network and MTU problems.', m: '7 min' },
        { t: 'Performance feels slow', d: 'Checking for CPU, disk, or bandwidth bottlenecks.', m: '9 min' },
        { t: 'Cannot sign in to your account', d: 'Recovering access when you have lost 2FA.', m: '5 min' },
        { t: 'An instance will not start', d: 'Recovery steps and when to contact support.', m: '6 min' },
      ]},
    ],
  },
};
