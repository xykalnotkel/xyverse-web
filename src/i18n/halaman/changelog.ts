import type { Lang } from '../config';

export const CHANGELOG: Record<Lang, any> = {
  id: {
    metaTitle: 'Changelog', ogTag: 'Changelog', ldName: 'Changelog Xyverse',
    ldDesc: 'Riwayat pembaruan layanan Cloud PC, XyDesk, dan XyCloudStore.',
    metaDesc: 'Riwayat lengkap pembaruan Xyverse: fitur baru, perubahan, perbaikan, dan yang dihentikan di setiap rilis.',
    eyebrow: 'Changelog',
    judul: 'Apa saja yang berubah, dicatat jujur.',
    lead: 'Setiap rilis kami tulis lengkap — termasuk yang dihapus dan yang diperbaiki. Tidak cuma daftar fitur baru.',
    semua: 'Semua',
    label: { tambah: 'Baru', ubah: 'Ubah', perbaiki: 'Perbaikan', hapus: 'Dihapus' },
    ctaH2: 'Ingin tahu lebih dulu?',
    ctaP: 'Pembaruan besar selalu kami umumkan di halaman berita dan kanal komunitas.',
    ctaB1: 'Baca Berita', ctaB2: 'Gabung Komunitas', ctaB3: 'Langganan RSS',
    rilis: [
      { v: '2.4.0', tgl: '2026-09-10', tglT: '10 September 2026', judul: 'Snapshot otomatis dan penjadwalan mesin', jenis: 'fitur', item: [
        { t: 'tambah', d: 'Snapshot terjadwal harian atau mingguan, dapat diatur per instance.' },
        { t: 'tambah', d: 'Penjadwal nyala-mati mesin berdasarkan jam kerja untuk menekan biaya.' },
        { t: 'tambah', d: 'Ekspor riwayat tagihan ke CSV dari XyCloudStore.' },
        { t: 'ubah', d: 'Grafik penggunaan kini menampilkan rentang 90 hari, sebelumnya 30 hari.' },
        { t: 'perbaiki', d: 'Notifikasi kuota bandwidth tidak terkirim pada paket tahunan.' },
      ]},
      { v: '2.3.2', tgl: '2026-08-22', tglT: '22 Agustus 2026', judul: 'Perbaikan stabilitas XyDesk', jenis: 'patch', item: [
        { t: 'perbaiki', d: 'Sesi terputus saat berpindah jaringan Wi-Fi ke seluler.' },
        { t: 'perbaiki', d: 'Gamepad tidak terbaca pada Windows 11 build terbaru.' },
        { t: 'perbaiki', d: 'Kursor melompat pada konfigurasi tiga monitor.' },
        { t: 'ubah', d: 'Buffer adaptif diturunkan, latensi rata-rata berkurang sekitar 4 ms.' },
      ]},
      { v: '2.3.0', tgl: '2026-07-30', tglT: '30 Juli 2026', judul: 'Akses tim dan peran pengguna', jenis: 'fitur', item: [
        { t: 'tambah', d: 'Undang anggota tim dengan peran penuh, operator, atau hanya melihat.' },
        { t: 'tambah', d: 'Log audit untuk setiap tindakan administratif.' },
        { t: 'tambah', d: 'Dukungan kunci SSH ganda per instance.' },
        { t: 'ubah', d: 'Panel XyCloudStore dirombak agar lebih ringan di ponsel.' },
        { t: 'hapus', d: 'Dukungan TLS 1.1 dihentikan demi keamanan.' },
      ]},
      { v: '2.2.1', tgl: '2026-06-18', tglT: '18 Juni 2026', judul: 'Region Jakarta tersedia umum', jenis: 'fitur', item: [
        { t: 'tambah', d: 'Region Jakarta keluar dari beta, latensi ke Jawa turun drastis.' },
        { t: 'tambah', d: 'Pemindahan instance antar region lewat panel.' },
        { t: 'perbaiki', d: 'Kesalahan perhitungan prorata saat naik paket di tengah bulan.' },
      ]},
      { v: '2.2.0', tgl: '2026-05-05', tglT: '5 Mei 2026', judul: 'Paket Studio GPU 16 GB', jenis: 'fitur', item: [
        { t: 'tambah', d: 'Paket Studio dengan GPU 16 GB untuk render dan pelatihan model.' },
        { t: 'tambah', d: 'Katalog software bertambah: DaVinci Resolve, Houdini, Unreal Engine.' },
        { t: 'ubah', d: 'Kuota bandwidth paket Pro naik dari 1 TB ke 2 TB tanpa tambahan biaya.' },
      ]},
      { v: '2.1.0', tgl: '2026-03-12', tglT: '12 Maret 2026', judul: 'XyCloudStore untuk iOS dan Android', jenis: 'fitur', item: [
        { t: 'tambah', d: 'Aplikasi ponsel untuk menyalakan, mematikan, dan memantau instance.' },
        { t: 'tambah', d: 'Notifikasi dorong saat mesin selesai dinyalakan atau kuota hampir habis.' },
        { t: 'perbaiki', d: 'Waktu muat dasbor pada koneksi lambat.' },
      ]},
    ],
  },
  en: {
    metaTitle: 'Changelog', ogTag: 'Changelog', ldName: 'Xyverse Changelog',
    ldDesc: 'Update history for the Cloud PC service, XyDesk, and XyCloudStore.',
    metaDesc: 'The full history of Xyverse updates: new features, changes, fixes, and removals in every release.',
    eyebrow: 'Changelog',
    judul: 'Everything that changed, recorded honestly.',
    lead: 'We write up every release in full — including what was removed and what was fixed. Not just a list of new features.',
    semua: 'All',
    label: { tambah: 'New', ubah: 'Changed', perbaiki: 'Fixed', hapus: 'Removed' },
    ctaH2: 'Want to hear it first?',
    ctaP: 'Major updates are always announced on the news page and in our community channels.',
    ctaB1: 'Read the News', ctaB2: 'Join the Community', ctaB3: 'Subscribe via RSS',
    rilis: [
      { v: '2.4.0', tgl: '2026-09-10', tglT: '10 September 2026', judul: 'Automatic snapshots and machine scheduling', jenis: 'fitur', item: [
        { t: 'tambah', d: 'Scheduled daily or weekly snapshots, configurable per instance.' },
        { t: 'tambah', d: 'A power on/off scheduler based on working hours to cut costs.' },
        { t: 'tambah', d: 'Export billing history to CSV from XyCloudStore.' },
        { t: 'ubah', d: 'Usage charts now show a 90-day range, up from 30 days.' },
        { t: 'perbaiki', d: 'Bandwidth quota notifications were not being sent on annual plans.' },
      ]},
      { v: '2.3.2', tgl: '2026-08-22', tglT: '22 August 2026', judul: 'XyDesk stability fixes', jenis: 'patch', item: [
        { t: 'perbaiki', d: 'Sessions dropped when switching from Wi-Fi to mobile data.' },
        { t: 'perbaiki', d: 'Gamepads were not detected on the latest Windows 11 build.' },
        { t: 'perbaiki', d: 'The cursor jumped on three-monitor configurations.' },
        { t: 'ubah', d: 'Adaptive buffering reduced, cutting average latency by around 4 ms.' },
      ]},
      { v: '2.3.0', tgl: '2026-07-30', tglT: '30 July 2026', judul: 'Team access and user roles', jenis: 'fitur', item: [
        { t: 'tambah', d: 'Invite team members with full, operator, or view-only roles.' },
        { t: 'tambah', d: 'An audit log for every administrative action.' },
        { t: 'tambah', d: 'Support for multiple SSH keys per instance.' },
        { t: 'ubah', d: 'The XyCloudStore panel was rebuilt to be lighter on mobile.' },
        { t: 'hapus', d: 'TLS 1.1 support discontinued for security reasons.' },
      ]},
      { v: '2.2.1', tgl: '2026-06-18', tglT: '18 June 2026', judul: 'Jakarta region generally available', jenis: 'fitur', item: [
        { t: 'tambah', d: 'The Jakarta region left beta, sharply reducing latency across Java.' },
        { t: 'tambah', d: 'Move instances between regions from the panel.' },
        { t: 'perbaiki', d: 'Incorrect pro-rata calculation when upgrading mid-month.' },
      ]},
      { v: '2.2.0', tgl: '2026-05-05', tglT: '5 May 2026', judul: 'Studio plan with 16 GB GPU', jenis: 'fitur', item: [
        { t: 'tambah', d: 'A Studio plan with a 16 GB GPU for rendering and model training.' },
        { t: 'tambah', d: 'Software catalogue expanded: DaVinci Resolve, Houdini, Unreal Engine.' },
        { t: 'ubah', d: 'Pro plan bandwidth quota raised from 1 TB to 2 TB at no extra cost.' },
      ]},
      { v: '2.1.0', tgl: '2026-03-12', tglT: '12 March 2026', judul: 'XyCloudStore for iOS and Android', jenis: 'fitur', item: [
        { t: 'tambah', d: 'A mobile app to start, stop, and monitor instances.' },
        { t: 'tambah', d: 'Push notifications when a machine finishes booting or quota runs low.' },
        { t: 'perbaiki', d: 'Dashboard load times on slow connections.' },
      ]},
    ],
  },
};
