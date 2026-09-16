import type { Lang } from '../config';

export const FAQ_HAL: Record<Lang, any> = {
  id: {
    eyebrow: 'FAQ',
    judul: 'Pertanyaan yang paling sering masuk.',
    leadA: '', leadB: ' jawaban singkat dan jujur. Kalau yang lu cari belum ada di sini, tanya langsung — kami balas.',
    metaTitle: 'FAQ', metaDescA: '', metaDescB: ' pertanyaan yang paling sering ditanyakan soal Cloud PC Xyverse: harga, keamanan, dukungan, dan teknis.',
    cariPh: 'Cari pertanyaan…',
    cocokA: 'pertanyaan cocok dengan', tidakA: 'Tidak ada yang cocok dengan', tidakB: '— coba kata kunci lain.',
    ctaH2: 'Masih penasaran?',
    ctaP: 'Tanya langsung ke tim kami, atau lihat panduan lengkap yang membahas semuanya lebih dalam.',
    ctaB1: 'Hubungi Kami', ctaB2: 'Buka Panduan', ctaB3: 'Tanya Komunitas',
    grup: [
      { k: 'Umum', ik: 'info', q: [
        { t: 'Xyverse itu apa sebenarnya?', j: 'Xyverse menyewakan Cloud PC dan membangun aplikasi serta perkakas pendukungnya. Lu menyewa mesin yang berjalan di pusat data kami, lalu mengaksesnya dari perangkat apa pun lewat XyDesk.' },
        { t: 'Siapa yang cocok pakai Xyverse?', j: 'Editor video, artis 3D, pengembang yang butuh mesin kuat, pelajar dengan laptop terbatas, dan tim yang butuh lingkungan kerja seragam tanpa membeli perangkat keras.' },
        { t: 'Apakah butuh internet cepat?', j: 'Minimal 10 Mbps stabil untuk pengalaman nyaman di 1080p. Untuk 4K atau 120 fps kami sarankan 35 Mbps ke atas. Yang paling berpengaruh justru kestabilan, bukan kecepatan mentahnya.' },
        { t: 'Di mana pusat data kalian?', j: 'Saat ini Singapura dan Jakarta. Pengguna Indonesia biasanya mendapat latensi terendah dari region Jakarta.' },
      ]},
      { k: 'Cloud PC', ik: 'server', q: [
        { t: 'Apakah datanya hilang kalau mesin dimatikan?', j: 'Tidak. Penyimpanan bersifat persisten dan tetap ada selama langganan aktif. Mematikan mesin hanya menghentikan tagihan komputasi per jam.' },
        { t: 'Bisa pakai GPU?', j: 'Bisa, mulai paket Pro. Pilihan GPU tersedia untuk render, pelatihan model, dan beban kerja grafis berat.' },
        { t: 'Boleh instal aplikasi sendiri?', j: 'Boleh. Lu punya akses administrator penuh, sama seperti PC sendiri. Lisensi perangkat lunak berbayar tetap tanggung jawab lu.' },
        { t: 'Berapa lama mesin baru siap dipakai?', j: 'Umumnya di bawah 3 menit untuk konfigurasi standar. Konfigurasi GPU kadang butuh sampai 8 menit saat permintaan tinggi.' },
        { t: 'Bisa naik atau turun spesifikasi?', j: 'Bisa kapan saja tanpa kehilangan data. Mesin perlu dimatikan sebentar, lalu dinyalakan ulang dengan spesifikasi baru.' },
      ]},
      { k: 'Harga & Tagihan', ik: 'card', q: [
        { t: 'Bagaimana skema penagihannya?', j: 'Komputasi dihitung per jam saat mesin menyala. Penyimpanan dihitung bulanan dan tetap berjalan meski mesin dimatikan.' },
        { t: 'Ada biaya tersembunyi?', j: 'Tidak. Bandwidth keluar wajar sudah termasuk. Bila pemakaian lu jauh di atas rata-rata, kami hubungi dulu sebelum ada biaya tambahan.' },
        { t: 'Metode pembayaran apa saja?', j: 'Transfer bank, QRIS, kartu kredit, dan e-wallet utama. Untuk kontrak institusi tersedia penagihan berbasis faktur.' },
        { t: 'Bisa refund?', j: 'Uji coba 7 hari pertama bisa dibatalkan penuh. Setelahnya, kredit SLA berlaku bila kami gagal memenuhi jaminan ketersediaan.' },
        { t: 'Ada diskon tahunan?', j: 'Ada, hemat dua bulan bila membayar setahun di muka. Kampus dan komunitas punya skema terpisah di halaman Kolaborasi.' },
      ]},
      { k: 'Keamanan & Data', ik: 'lock', q: [
        { t: 'Siapa yang bisa melihat data saya?', j: 'Tidak ada. Penyimpanan dienkripsi dan tim kami tidak mengakses isi mesin lu tanpa izin tertulis, kecuali diwajibkan hukum.' },
        { t: 'Apakah ada cadangan otomatis?', j: 'Snapshot harian tersedia mulai paket Pro dengan retensi 7 hari. Paket Enterprise bisa diatur sampai 30 hari.' },
        { t: 'Bagaimana kalau saya berhenti berlangganan?', j: 'Data disimpan 30 hari setelah langganan berakhir agar lu sempat mengunduh, lalu dihapus permanen.' },
        { t: 'Bisa lapor celah keamanan?', j: 'Sangat kami hargai. Kirim privat ke keamanan@xyverse.my.id, jangan diumumkan di kanal publik. Detailnya ada di kebijakan keamanan kami.' },
      ]},
      { k: 'Dukungan', ik: 'help', q: [
        { t: 'Berapa lama balasan dukungan?', j: 'Starter dalam 24 jam kerja, Pro dalam 8 jam, Enterprise dalam 1 jam untuk isu kritis sepanjang waktu.' },
        { t: 'Ada dukungan bahasa Indonesia?', j: 'Ada, dan itu bahasa utama kami. Inggris juga dilayani penuh.' },
        { t: 'Bisa minta bantuan konfigurasi?', j: 'Bisa. Pengaturan awal dibantu gratis untuk semua paket. Konfigurasi lanjutan seperti pipeline render dibahas per kasus.' },
      ]},
    ],
  },

  en: {
    eyebrow: 'FAQ',
    judul: 'The questions we get most often.',
    leadA: '', leadB: ' short, honest answers. If what you are looking for is not here, just ask — we do reply.',
    metaTitle: 'FAQ', metaDescA: '', metaDescB: ' of the most common questions about Xyverse Cloud PCs: pricing, security, support, and technical details.',
    cariPh: 'Search questions…',
    cocokA: 'questions match', tidakA: 'Nothing matches', tidakB: '— try a different keyword.',
    ctaH2: 'Still curious?',
    ctaP: 'Ask our team directly, or browse the full guides that cover everything in more depth.',
    ctaB1: 'Contact Us', ctaB2: 'Open Guides', ctaB3: 'Ask the Community',
    grup: [
      { k: 'General', ik: 'info', q: [
        { t: 'What exactly is Xyverse?', j: 'Xyverse rents out Cloud PCs and builds the apps and tooling around them. You rent a machine running in our data centre, then reach it from any device through XyDesk.' },
        { t: 'Who is Xyverse a good fit for?', j: 'Video editors, 3D artists, developers who need a powerful machine, students on limited laptops, and teams who want a uniform working environment without buying hardware.' },
        { t: 'Do I need fast internet?', j: 'A stable 10 Mbps is the minimum for a comfortable 1080p experience. For 4K or 120 fps we suggest 35 Mbps or more. Stability matters far more than raw speed.' },
        { t: 'Where are your data centres?', j: 'Singapore and Jakarta at present. Users in Indonesia usually get the lowest latency from the Jakarta region.' },
      ]},
      { k: 'Cloud PC', ik: 'server', q: [
        { t: 'Do I lose my data when the machine is switched off?', j: 'No. Storage is persistent and stays in place for as long as your subscription is active. Switching the machine off only stops the hourly compute charge.' },
        { t: 'Can I use a GPU?', j: 'Yes, from the Pro plan upward. GPU options are available for rendering, model training, and heavy graphics workloads.' },
        { t: 'Can I install my own software?', j: 'Yes. You get full administrator access, exactly as on your own PC. Licences for paid software remain your responsibility.' },
        { t: 'How long before a new machine is ready?', j: 'Usually under 3 minutes for a standard configuration. GPU configurations can take up to 8 minutes when demand is high.' },
        { t: 'Can I scale the specification up or down?', j: 'Any time, without losing data. The machine needs a brief shutdown, then restarts on the new specification.' },
      ]},
      { k: 'Pricing & Billing', ik: 'card', q: [
        { t: 'How does billing work?', j: 'Compute is charged hourly while the machine is running. Storage is charged monthly and continues even when the machine is off.' },
        { t: 'Are there hidden fees?', j: 'No. Reasonable outbound bandwidth is included. If your usage runs far above average, we will contact you before any additional charge applies.' },
        { t: 'Which payment methods do you accept?', j: 'Bank transfer, QRIS, credit cards, and the major e-wallets. Invoice-based billing is available for institutional contracts.' },
        { t: 'Can I get a refund?', j: 'The first 7-day trial can be cancelled for a full refund. After that, SLA credits apply if we fail to meet our availability guarantee.' },
        { t: 'Is there an annual discount?', j: 'Yes — pay a year up front and save two months. Campuses and communities have a separate scheme on the Collaborate page.' },
      ]},
      { k: 'Security & Data', ik: 'lock', q: [
        { t: 'Who can see my data?', j: 'Nobody. Storage is encrypted and our team does not access the contents of your machine without written permission, unless legally compelled.' },
        { t: 'Are there automatic backups?', j: 'Daily snapshots are included from the Pro plan with 7-day retention. Enterprise can be configured up to 30 days.' },
        { t: 'What happens if I cancel my subscription?', j: 'Data is retained for 30 days after the subscription ends so you have time to download it, then permanently deleted.' },
        { t: 'Can I report a security vulnerability?', j: 'We would be grateful. Send it privately to keamanan@xyverse.my.id rather than announcing it publicly. Details are in our security policy.' },
      ]},
      { k: 'Support', ik: 'help', q: [
        { t: 'How quickly does support reply?', j: 'Starter within 24 working hours, Pro within 8 hours, and Enterprise within 1 hour for critical issues, around the clock.' },
        { t: 'Is support available in Indonesian?', j: 'Yes, and it is our primary language. English is fully supported too.' },
        { t: 'Can I get help with configuration?', j: 'Yes. Initial setup is assisted free of charge on every plan. Advanced configuration such as render pipelines is discussed case by case.' },
      ]},
    ],
  },
};
