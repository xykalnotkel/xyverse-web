import type { Lang } from './config';

/**
 * Data situs yang punya teks — disediakan per bahasa.
 * Data netral (URL, warna, slug, angka) tetap di src/data/site.ts.
 */

export const TAGLINE: Record<Lang, string> = {
  id: 'Cloud PC, Apps & Software',
  en: 'Cloud PC, Apps & Software',
};

export const DESC_SITUS: Record<Lang, string> = {
  id: 'Xyverse menyewakan Cloud PC berperforma tinggi dan memproduksi aplikasi, software, serta tools digital untuk kreator dan bisnis di Indonesia.',
  en: 'Xyverse rents high-performance Cloud PCs and builds apps, software, and digital tools for creators and businesses across Indonesia.',
};

export const ALAMAT: Record<Lang, { provinsi: string; negara: string }> = {
  id: { provinsi: 'Nusa Tenggara Barat', negara: 'Indonesia' },
  en: { provinsi: 'West Nusa Tenggara', negara: 'Indonesia' },
};

/** Teks aplikasi per bahasa. Dikunci dengan slug dari APLIKASI. */
export const APLIKASI_TEKS: Record<Lang, Record<string, {
  tagline: string; desc: string; status: string;
  fitur: { t: string; d: string }[];
}>> = {
  id: {
    xydesk: {
      tagline: 'Klien remote desktop resmi Xyverse',
      desc: 'Aplikasi untuk terhubung ke Cloud PC lu dengan latensi rendah. Dibangun khusus agar streaming terasa seperti memakai komputer di depan mata.',
      status: 'Tersedia',
      fitur: [
        { t: 'Koneksi adaptif', d: 'Kualitas streaming menyesuaikan bandwidth secara otomatis tanpa memutus sesi.' },
        { t: 'Latensi rendah', d: 'Encoding berbasis hardware GPU, rata-rata di bawah 20 ms untuk region terdekat.' },
        { t: 'Multi-monitor', d: 'Dukungan hingga tiga layar dengan resolusi berbeda secara bersamaan.' },
        { t: 'Transfer berkas', d: 'Seret dan lepas berkas antara perangkat lokal dan Cloud PC.' },
        { t: 'Pemetaan periferal', d: 'Gamepad, tablet gambar, dan perangkat USB terbaca langsung di sesi remote.' },
        { t: 'Kunci sesi', d: 'Autentikasi dua langkah dan penguncian otomatis saat sesi ditinggalkan.' },
      ],
    },
    xycloudstore: {
      tagline: 'Pusat aplikasi dan pengelolaan instance',
      desc: 'Kelola langganan, nyalakan atau matikan mesin, dan pasang perangkat lunak siap pakai ke Cloud PC hanya dengan satu ketukan.',
      status: 'Tersedia',
      fitur: [
        { t: 'Pasang satu ketuk', d: 'Katalog perangkat lunak siap pakai: Blender, DaVinci, VS Code, Docker, dan lainnya.' },
        { t: 'Kontrol instance', d: 'Nyalakan, matikan, atau jadwalkan mesin langsung dari ponsel.' },
        { t: 'Pantau penggunaan', d: 'Grafik konsumsi CPU, RAM, GPU, dan biaya berjalan secara real-time.' },
        { t: 'Kelola snapshot', d: 'Buat dan pulihkan titik simpan mesin kapan saja.' },
        { t: 'Tagihan transparan', d: 'Rincian biaya per jam pemakaian, tanpa komponen tersembunyi.' },
        { t: 'Akses tim', d: 'Undang anggota tim dengan peran dan batas akses yang berbeda.' },
      ],
    },
  },
  en: {
    xydesk: {
      tagline: 'The official Xyverse remote desktop client',
      desc: 'An app that connects you to your Cloud PC with low latency. Built so that streaming feels like using the computer sitting right in front of you.',
      status: 'Available',
      fitur: [
        { t: 'Adaptive connection', d: 'Stream quality adjusts to your bandwidth automatically without dropping the session.' },
        { t: 'Low latency', d: 'GPU hardware encoding, averaging under 20 ms in the nearest region.' },
        { t: 'Multi-monitor', d: 'Up to three displays at different resolutions, all at once.' },
        { t: 'File transfer', d: 'Drag and drop files between your local device and the Cloud PC.' },
        { t: 'Peripheral passthrough', d: 'Gamepads, drawing tablets, and USB devices are recognised inside the remote session.' },
        { t: 'Session lock', d: 'Two-factor authentication and automatic locking when a session is left idle.' },
      ],
    },
    xycloudstore: {
      tagline: 'App hub and instance management',
      desc: 'Manage your subscription, power machines on or off, and install ready-made software onto your Cloud PC with a single tap.',
      status: 'Available',
      fitur: [
        { t: 'One-tap install', d: 'A catalogue of ready-made software: Blender, DaVinci, VS Code, Docker, and more.' },
        { t: 'Instance control', d: 'Start, stop, or schedule machines straight from your phone.' },
        { t: 'Usage monitoring', d: 'Real-time charts for CPU, RAM, GPU, and running costs.' },
        { t: 'Snapshot management', d: 'Create and restore machine save points whenever you need to.' },
        { t: 'Transparent billing', d: 'Hourly cost breakdowns, with no hidden line items.' },
        { t: 'Team access', d: 'Invite teammates with distinct roles and access limits.' },
      ],
    },
  },
};

/** Teks anggota tim per bahasa. Dikunci dengan inisial. */
export const TIM_TEKS: Record<Lang, Record<string, { peran: string; bio: string; fokus: string[] }>> = {
  id: {
    K: {
      peran: 'Founder & CEO',
      bio: 'Memimpin arah produk dan infrastruktur Xyverse. Memulai Xyverse dari keresahan bahwa perangkat keras mahal tidak seharusnya jadi penghalang berkarya.',
      fokus: ['Strategi Produk', 'Infrastruktur', 'Kemitraan'],
    },
    IN: {
      peran: 'Cloud & Operations',
      bio: 'Menjaga mesin tetap menyala, cepat, dan aman. Mengelola region, jaringan, serta pemantauan 24 jam.',
      fokus: ['Orkestrasi GPU', 'Jaringan', 'Keamanan'],
    },
    PR: {
      peran: 'Engineering & Design',
      bio: 'Membangun XyDesk, XyCloudStore, dan proyek klien. Dari riset pengguna sampai rilis ke toko aplikasi.',
      fokus: ['Aplikasi', 'Antarmuka', 'Integrasi'],
    },
  },
  en: {
    K: {
      peran: 'Founder & CEO',
      bio: 'Leads product direction and infrastructure at Xyverse. Started the company out of a conviction that expensive hardware should never be what stops someone from creating.',
      fokus: ['Product Strategy', 'Infrastructure', 'Partnerships'],
    },
    IN: {
      peran: 'Cloud & Operations',
      bio: 'Keeps the machines running, fast, and secure. Manages regions, networking, and round-the-clock monitoring.',
      fokus: ['GPU Orchestration', 'Networking', 'Security'],
    },
    PR: {
      peran: 'Engineering & Design',
      bio: 'Builds XyDesk, XyCloudStore, and client projects. From user research through to app store release.',
      fokus: ['Applications', 'Interfaces', 'Integrations'],
    },
  },
};

export const NILAI_TEKS: Record<Lang, { t: string; d: string }[]> = {
  id: [
    { t: 'Transparan', d: 'Harga, spesifikasi, dan batasan dijelaskan apa adanya sejak awal. Tidak ada biaya kejutan di tagihan.' },
    { t: 'Cepat', d: 'Mesin aktif dalam hitungan menit, balasan dukungan di hari kerja yang sama.' },
    { t: 'Bisa diandalkan', d: 'Infrastruktur dipantau sepanjang waktu, dengan jalur eskalasi yang jelas saat terjadi gangguan.' },
    { t: 'Berpihak pengguna', d: 'Data lu milik lu. Kami tidak menjual atau membagikannya untuk tujuan pemasaran.' },
  ],
  en: [
    { t: 'Transparent', d: 'Pricing, specifications, and limits are spelled out from the start. No surprise charges on your bill.' },
    { t: 'Fast', d: 'Machines live within minutes, and support replies the same working day.' },
    { t: 'Dependable', d: 'Infrastructure is monitored around the clock, with a clear escalation path when something breaks.' },
    { t: 'On your side', d: 'Your data is yours. We do not sell it or share it for marketing purposes.' },
  ],
};

/** Navigasi sumber daya: slug netral, label per bahasa. */
export const SUMBER_SLUG = [
  'panduan', 'changelog', 'pelajari', 'kontribusi', 'kolaborasi',
  'sponsor', 'komunitas', 'status', 'faq', 'karier',
] as const;

export const SUMBER_TEKS: Record<Lang, Record<string, { t: string; d: string }>> = {
  id: {
    panduan: { t: 'Panduan', d: 'Tutorial langkah demi langkah' },
    changelog: { t: 'Changelog', d: 'Riwayat pembaruan produk' },
    pelajari: { t: 'Pelajari', d: 'Konsep dasar Cloud PC' },
    kontribusi: { t: 'Kontribusi', d: 'Ikut membangun Xyverse' },
    kolaborasi: { t: 'Kolaborasi', d: 'Kemitraan dan afiliasi' },
    sponsor: { t: 'Sponsor', d: 'Dukung pengembangan' },
    komunitas: { t: 'Komunitas', d: 'Tempat berkumpul pengguna' },
    status: { t: 'Status', d: 'Kondisi layanan terkini' },
    faq: { t: 'FAQ', d: 'Pertanyaan yang sering muncul' },
    karier: { t: 'Karier', d: 'Bergabung dengan tim' },
  },
  en: {
    panduan: { t: 'Guides', d: 'Step-by-step walkthroughs' },
    changelog: { t: 'Changelog', d: 'Product release history' },
    pelajari: { t: 'Learn', d: 'Cloud PC fundamentals' },
    kontribusi: { t: 'Contribute', d: 'Help build Xyverse' },
    kolaborasi: { t: 'Collaborate', d: 'Partnerships and affiliates' },
    sponsor: { t: 'Sponsor', d: 'Support development' },
    komunitas: { t: 'Community', d: 'Where users gather' },
    status: { t: 'Status', d: 'Current service health' },
    faq: { t: 'FAQ', d: 'Frequently asked questions' },
    karier: { t: 'Careers', d: 'Join the team' },
  },
};

/** Dokumen legal: slug netral, judul per bahasa. */
export const LEGAL_SLUG = [
  'syarat-layanan', 'kebijakan-privasi', 'kebijakan-cookie', 'kebijakan-penggunaan',
  'kebijakan-pengembalian', 'sla', 'lisensi', 'dmca', 'keamanan',
] as const;

export const LEGAL_TEKS: Record<Lang, Record<string, string>> = {
  id: {
    'syarat-layanan': 'Syarat Layanan',
    'kebijakan-privasi': 'Kebijakan Privasi',
    'kebijakan-cookie': 'Kebijakan Cookie',
    'kebijakan-penggunaan': 'Kebijakan Penggunaan',
    'kebijakan-pengembalian': 'Pengembalian Dana',
    'sla': 'Jaminan Layanan (SLA)',
    'lisensi': 'Lisensi',
    'dmca': 'DMCA',
    'keamanan': 'Keamanan',
  },
  en: {
    'syarat-layanan': 'Terms of Service',
    'kebijakan-privasi': 'Privacy Policy',
    'kebijakan-cookie': 'Cookie Policy',
    'kebijakan-penggunaan': 'Acceptable Use Policy',
    'kebijakan-pengembalian': 'Refund Policy',
    'sla': 'Service Level Agreement',
    'lisensi': 'Licensing',
    'dmca': 'DMCA',
    'keamanan': 'Security',
  },
};

/** Helper gabungan. */
export function sumberNav(lang: Lang) {
  return SUMBER_SLUG.map((s) => ({ slug: s, ...SUMBER_TEKS[lang][s] }));
}
export function legalNav(lang: Lang) {
  return LEGAL_SLUG.map((s) => ({ slug: s, t: LEGAL_TEKS[lang][s] }));
}

/** Konten: id entri berawalan `en/` untuk bahasa Inggris. */
export function slugKonten(id: string) {
  return id.replace(/^en\//, '');
}
export function filterLang(lang: Lang) {
  return ({ id, data }: { id: string; data: any }) =>
    !data.draft && (data.lang ?? 'id') === lang;
}
