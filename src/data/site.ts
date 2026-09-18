import settings from './settings.json';
export const SITE = {
  nama: 'Xyverse',
  /**
   * Dibaca dari PUBLIC_SITE_URL supaya selalu sama dengan `site` di
   * astro.config.mjs. Dua sumber kebenaran untuk alamat situs adalah cara
   * termudah membuat canonical dan og:url saling bertentangan.
   */
  url: (import.meta.env.PUBLIC_SITE_URL || 'https://www.xyverse.my.id').replace(/\/+$/, ''),
  tagline: 'Cloud PC, Apps & Software',
  desc: 'Xyverse menyewakan Cloud PC berperforma tinggi dan memproduksi aplikasi, software, serta tools digital untuk kreator dan bisnis di Indonesia.',
  email: settings.email,
  emailLegal: settings.email,
  emailPrivasi: settings.email,
  emailAbuse: settings.email,
  wa: settings.wa,
  waTampil: settings.wa ? '+' + settings.wa : '',
  alamat: {
    jalan: 'Tanak Beaq, Kec. Batukliang Utara',
    kota: 'Kabupaten Lombok Tengah',
    provinsi: 'Nusa Tenggara Barat',
    pos: '83562',
    negara: 'Indonesia',
    negaraKode: 'ID',
  },
  berdiri: 2024,
};

export const SOSMED = settings.socials;

export const APLIKASI = [
  {
    slug: 'xydesk',
    nama: 'XyDesk',
    tagline: 'Klien remote desktop resmi Xyverse',
    desc: 'Aplikasi untuk terhubung ke Cloud PC lu dengan latensi rendah. Dibangun khusus agar streaming terasa seperti memakai komputer di depan mata.',
    platform: ['Windows', 'macOS', 'Linux', 'Android', 'iOS'],
    warna: '#8b5cf6',
    fitur: [
      { t: 'Koneksi adaptif', d: 'Kualitas streaming menyesuaikan bandwidth secara otomatis tanpa memutus sesi.' },
      { t: 'Latensi rendah', d: 'Encoding berbasis hardware GPU, rata-rata di bawah 20 ms untuk region terdekat.' },
      { t: 'Multi-monitor', d: 'Dukungan hingga tiga layar dengan resolusi berbeda secara bersamaan.' },
      { t: 'Transfer berkas', d: 'Seret dan lepas berkas antara perangkat lokal dan Cloud PC.' },
      { t: 'Pemetaan periferal', d: 'Gamepad, tablet gambar, dan perangkat USB terbaca langsung di sesi remote.' },
      { t: 'Kunci sesi', d: 'Autentikasi dua langkah dan penguncian otomatis saat sesi ditinggalkan.' },
    ],
    status: 'Tersedia',
  },
  {
    slug: 'xycloudstore',
    nama: 'XyCloudStore',
    tagline: 'Pusat aplikasi dan pengelolaan instance',
    desc: 'Kelola langganan, nyalakan atau matikan mesin, dan pasang perangkat lunak siap pakai ke Cloud PC hanya dengan satu ketukan.',
    platform: ['Web', 'Android', 'iOS'],
    warna: '#a78bfa',
    fitur: [
      { t: 'Pasang satu ketuk', d: 'Katalog perangkat lunak siap pakai: Blender, DaVinci, VS Code, Docker, dan lainnya.' },
      { t: 'Kontrol instance', d: 'Nyalakan, matikan, atau jadwalkan mesin langsung dari ponsel.' },
      { t: 'Pantau penggunaan', d: 'Grafik konsumsi CPU, RAM, GPU, dan biaya berjalan secara real-time.' },
      { t: 'Kelola snapshot', d: 'Buat dan pulihkan titik simpan mesin kapan saja.' },
      { t: 'Tagihan transparan', d: 'Rincian biaya per jam pemakaian, tanpa komponen tersembunyi.' },
      { t: 'Akses tim', d: 'Undang anggota tim dengan peran dan batas akses yang berbeda.' },
    ],
    status: 'Tersedia',
  },
];

export const TIM = [
  {
    nama: 'Kal',
    peran: 'Founder & CEO',
    inisial: 'K',
    bio: 'Memimpin arah produk dan infrastruktur Xyverse. Memulai Xyverse dari keresahan bahwa perangkat keras mahal tidak seharusnya jadi penghalang berkarya.',
    fokus: ['Strategi Produk', 'Infrastruktur', 'Kemitraan'],
    sosmed: { github: 'https://github.com/xykalnotkel', x: 'https://x.com/xyverse_id' },
  },
  {
    nama: 'Tim Infrastruktur',
    peran: 'Cloud & Operations',
    inisial: 'IN',
    bio: 'Menjaga mesin tetap menyala, cepat, dan aman. Mengelola region, jaringan, serta pemantauan 24 jam.',
    fokus: ['Orkestrasi GPU', 'Jaringan', 'Keamanan'],
    sosmed: {},
  },
  {
    nama: 'Tim Produk',
    peran: 'Engineering & Design',
    inisial: 'PR',
    bio: 'Membangun XyDesk, XyCloudStore, dan proyek klien. Dari riset pengguna sampai rilis ke toko aplikasi.',
    fokus: ['Aplikasi', 'Antarmuka', 'Integrasi'],
    sosmed: {},
  },
];

export const NILAI = [
  { t: 'Transparan', d: 'Harga, spesifikasi, dan batasan dijelaskan apa adanya sejak awal. Tidak ada biaya kejutan di tagihan.' },
  { t: 'Cepat', d: 'Mesin aktif dalam hitungan menit, balasan dukungan di hari kerja yang sama.' },
  { t: 'Bisa diandalkan', d: 'Infrastruktur dipantau sepanjang waktu, dengan jalur eskalasi yang jelas saat terjadi gangguan.' },
  { t: 'Berpihak pengguna', d: 'Data lu milik lu. Kami tidak menjual atau membagikannya untuk tujuan pemasaran.' },
];

export const SUMBER_NAV = [
  { href: '/panduan', t: 'Panduan', d: 'Tutorial langkah demi langkah' },
  { href: '/changelog', t: 'Changelog', d: 'Riwayat pembaruan produk' },
  { href: '/pelajari', t: 'Pelajari', d: 'Konsep dasar Cloud PC' },
  { href: '/kontribusi', t: 'Kontribusi', d: 'Ikut membangun Xyverse' },
  { href: '/kolaborasi', t: 'Kolaborasi', d: 'Kemitraan dan afiliasi' },
  { href: '/sponsor', t: 'Sponsor', d: 'Dukung pengembangan' },
  { href: '/komunitas', t: 'Komunitas', d: 'Tempat berkumpul pengguna' },
  { href: '/status', t: 'Status', d: 'Kondisi layanan terkini' },
  { href: '/faq', t: 'FAQ', d: 'Pertanyaan yang sering muncul' },
  { href: '/karier', t: 'Karier', d: 'Bergabung dengan tim' },
];

export const LEGAL_NAV = [
  { href: '/legal/syarat-layanan', t: 'Syarat Layanan' },
  { href: '/legal/kebijakan-privasi', t: 'Kebijakan Privasi' },
  { href: '/legal/kebijakan-cookie', t: 'Kebijakan Cookie' },
  { href: '/legal/kebijakan-penggunaan', t: 'Kebijakan Penggunaan' },
  { href: '/legal/kebijakan-pengembalian', t: 'Pengembalian Dana' },
  { href: '/legal/sla', t: 'Jaminan Layanan (SLA)' },
  { href: '/legal/lisensi', t: 'Lisensi' },
  { href: '/legal/dmca', t: 'DMCA' },
  { href: '/legal/keamanan', t: 'Keamanan' },
];
