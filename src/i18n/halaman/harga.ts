import settings from '../../data/settings.json';
import type { Lang } from '../config';

export const HARGA: Record<Lang, any> = {
  id: {
    metaTitle: 'Harga — Xyverse',
    metaDesc: 'Daftar harga sewa Cloud PC dan layanan produksi aplikasi serta software custom dari Xyverse.',
    eyebrow: 'Harga', h1: 'Transparan, tanpa kejutan.',
    lead: 'Harga sudah termasuk setup dan support standar. Semua dalam Rupiah, belum termasuk PPN.',
    sec1H2: 'Sewa Cloud PC',
    sec1Lead: 'Ditagih bulanan. Upgrade atau downgrade kapan saja tanpa migrasi ulang.',
    sec2H2: 'Produksi Apps & Software',
    sec2Lead: 'Harga proyek, disesuaikan dengan ruang lingkup akhir setelah sesi discovery.',
    populer: 'Paling populer', perBulan: '/bulan',
    pesan: 'Pesan sekarang', penawaran: 'Minta penawaran',
    ctaH2: 'Punya kebutuhan enterprise?',
    ctaP: 'Multi-node, kontrak tahunan, atau SLA khusus — kami siap berdiskusi.',
    ctaB1: 'Hubungi Sales',
    cloud: [
      { n: 'Starter', p: '149K', d: 'Untuk kerja ringan & remote office', s: ['4 vCPU · 8 GB RAM', '120 GB NVMe SSD', 'Tanpa GPU', 'Windows / Linux', 'Akses RDP 24/7', 'Support via email'], hi: false },
      { n: 'Creator', p: '499K', d: 'Untuk kreator, editor, dan gamer', s: ['8 vCPU · 24 GB RAM', '250 GB NVMe SSD', 'GPU 6 GB dedicated', 'Parsec low-latency', 'Snapshot mingguan', 'Support prioritas'], hi: true },
      { n: 'Studio', p: '1.2JT', d: 'Untuk studio, tim, dan workload AI', s: ['16 vCPU · 64 GB RAM', '500 GB NVMe SSD', 'GPU 16 GB (AI/3D)', 'Dedicated IP', 'Snapshot harian', 'Support 24/7 + SLA'], hi: false },
    ],
    dev: [
      { n: 'Landing / Web Profil', p: '3.5JT', pre: 'mulai', s: ['Desain custom responsif', 'Hingga 6 halaman', 'SEO dasar + analytics', 'Deploy & setup domain', 'Garansi bug 30 hari'] },
      { n: 'Aplikasi Mobile / Web', p: '15JT', pre: 'mulai', s: ['Discovery & wireframe', 'Android · iOS · PWA', 'Backend + REST API', 'Panel admin', 'Rilis ke store', 'Garansi bug 90 hari'] },
      { n: 'Software Custom', p: 'Custom', pre: '', s: ['Analisis proses bisnis', 'Arsitektur skalabel', 'Integrasi payment / API', 'Training pengguna', 'Kontrak maintenance'] },
    ],
  },
  en: {
    metaTitle: 'Pricing — Xyverse',
    metaDesc: 'Pricing for Xyverse Cloud PC rental, app development, and custom software services.',
    eyebrow: 'Pricing', h1: 'Transparent, with no surprises.',
    lead: 'Prices include setup and standard support. All figures in Rupiah, excluding VAT.',
    sec1H2: 'Cloud PC Rental',
    sec1Lead: 'Billed monthly. Upgrade or downgrade any time, with no re-migration.',
    sec2H2: 'Apps & Software Development',
    sec2Lead: 'Project pricing, adjusted to the final scope after a discovery session.',
    populer: 'Most popular', perBulan: '/month',
    pesan: 'Order now', penawaran: 'Request a quote',
    ctaH2: 'Have enterprise requirements?',
    ctaP: 'Multi-node, annual contracts, or a bespoke SLA — we are happy to talk it through.',
    ctaB1: 'Contact Sales',
    cloud: [
      { n: 'Starter', p: '149K', d: 'For light work and remote office use', s: ['4 vCPU · 8 GB RAM', '120 GB NVMe SSD', 'No GPU', 'Windows / Linux', '24/7 RDP access', 'Email support'], hi: false },
      { n: 'Creator', p: '499K', d: 'For creators, editors, and gamers', s: ['8 vCPU · 24 GB RAM', '250 GB NVMe SSD', 'Dedicated 6 GB GPU', 'Low-latency Parsec', 'Weekly snapshots', 'Priority support'], hi: true },
      { n: 'Studio', p: '1.2M', d: 'For studios, teams, and AI workloads', s: ['16 vCPU · 64 GB RAM', '500 GB NVMe SSD', '16 GB GPU (AI/3D)', 'Dedicated IP', 'Daily snapshots', '24/7 support + SLA'], hi: false },
    ],
    dev: [
      { n: 'Landing / Profile Site', p: '3.5M', pre: 'from', s: ['Custom responsive design', 'Up to 6 pages', 'Basic SEO + analytics', 'Deployment & domain setup', '30-day bug warranty'] },
      { n: 'Mobile / Web App', p: '15M', pre: 'from', s: ['Discovery & wireframes', 'Android · iOS · PWA', 'Backend + REST API', 'Admin panel', 'Store release', '90-day bug warranty'] },
      { n: 'Custom Software', p: 'Custom', pre: '', s: ['Business process analysis', 'Scalable architecture', 'Payment / API integration', 'User training', 'Maintenance contract'] },
    ],
  },
};

// Public display values managed by the owner in the admin dashboard.
for (const lang of ['id', 'en'] as const) {
  HARGA[lang].cloud = HARGA[lang].cloud.map((p: any, i: number) => ({ ...p, n: settings.plans[i].name, p: lang === 'id' ? settings.plans[i].priceId : settings.plans[i].priceEn }));
}
