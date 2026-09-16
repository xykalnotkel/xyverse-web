import type { Lang } from '../config';

export const BERANDA: Record<Lang, any> = {
  id: {
    pill: 'Infrastruktur & produk digital',
    h1a: 'Kekuatan komputasi ', h1em: 'tanpa batas', h1b: ' perangkat.',
    leadA: 'Xyverse menyewakan ', leadB: 'Cloud PC', leadC: ' berperforma tinggi dan memproduksi ',
    leadD: 'aplikasi, software, serta tools', leadE: ' yang bikin kerja lu lebih cepat. Satu ekosistem, dari mesin sampai produk jadi.',
    ctaSewa: 'Sewa Cloud PC', ctaLayanan: 'Lihat Layanan',
    micro: 'Dipercaya kreator, studio game, dan UMKM digital',
    altIlus: 'Ilustrasi infrastruktur Cloud PC Xyverse',

    stats: [
      { n: '99.9%', l: 'Uptime infrastruktur' },
      { n: '<20', l: 'ms latensi region SEA' },
      { n: '120+', l: 'Proyek telah dirilis' },
      { n: '24/7', l: 'Dukungan tim teknis' },
    ],

    layananEye: 'Layanan',
    layananH2: 'Semua yang lu butuh, satu tempat.',
    layananLead: 'Dari mesin virtual yang siap render 8K sampai aplikasi yang siap masuk Play Store.',
    services: [
      { ic: 'cloud', t: 'Sewa Cloud PC', d: 'Remote desktop bertenaga GPU kelas workstation. Render, gaming, coding, dan AI workload dari perangkat apa pun.', tags: ['RDP & Parsec', 'GPU NVIDIA', 'Uptime 99.9%'], href: 'cloud-pc' },
      { ic: 'app', t: 'Produksi Apps', d: 'Aplikasi mobile & web dari riset sampai rilis. Android, iOS, PWA, dan dashboard internal — desain, kode, deploy.', tags: ['Flutter', 'React / Next', 'REST API'], href: '#kontak' },
      { ic: 'code', t: 'Software Custom', d: 'Sistem bisnis sesuai alur kerja lu: POS, ERP ringan, sistem lisensi, bot, dan integrasi payment gateway.', tags: ['Backend', 'Database', 'Integrasi'], href: '#kontak' },
      { ic: 'tool', t: 'Tools & Automation', d: 'Utility, panel, dan script otomasi yang memangkas kerja manual berjam-jam jadi satu klik.', tags: ['Automation', 'Panel', 'Scraping'], href: '#kontak' },
    ],

    cpEye: 'Cloud PC',
    cpH2: 'Workstation kelas studio, diakses dari browser.',
    cpLead: 'Nggak perlu beli PC 40 juta. Sewa mesin dengan GPU dedicated, nyalakan saat butuh, matikan saat selesai. Lu bayar performa, bukan besi yang nganggur di meja.',
    cpChecks: [
      'Windows 11 / Ubuntu siap pakai dalam hitungan menit',
      'Akses via RDP, Parsec, atau langsung dari browser',
      'Storage NVMe cepat dengan snapshot otomatis',
      'Skalakan spesifikasi kapan saja tanpa migrasi ulang',
    ],
    cpBtn: 'Jelajahi Cloud PC',
    winAria: 'Contoh panel sesi remote Xyverse',
    winRows: { instance: 'Instance', gpu: 'GPU', cpu: 'vCPU / RAM', region: 'Region', lat: 'Latensi', status: 'Status', running: 'Berjalan' },

    prosesEye: 'Proses', prosesH2: 'Cara kami bekerja.',
    prosesLead: 'Empat tahap yang jelas, tanpa drama dan tanpa biaya tersembunyi.',
    steps: [
      { n: '01', t: 'Konsultasi', d: 'Ceritakan kebutuhan — spek Cloud PC, ide aplikasi, atau proses yang mau diotomasi.' },
      { n: '02', t: 'Blueprint', d: 'Kami susun arsitektur, timeline, dan estimasi biaya transparan sebelum satu baris kode ditulis.' },
      { n: '03', t: 'Build & Deploy', d: 'Eksekusi dengan update berkala. Mesin aktif dalam menit, software dirilis bertahap.' },
      { n: '04', t: 'Support', d: 'Monitoring, patch, dan iterasi lanjutan. Kami tetap ada setelah proyek live.' },
    ],

    proyekEye: 'Proyek', proyekH2: 'Hasil kerja terbaru.',
    proyekLeadA: 'Studi kasus lengkap dengan tantangan dan dampaknya. ', proyekLink: 'Lihat semua proyek →',
    blogEye: 'Blog', blogH2: 'Catatan teknis terbaru.',
    blogLeadA: 'Panduan dan pelajaran dari lapangan. ', blogLink: 'Baca semua artikel →',
    menit: 'menit',

    ttgEye: 'Tentang', ttgH2: 'Kami bangun fondasi, lu bangun karya.',
    ttgBtn: 'Lihat Harga',
    ttgP1: 'Xyverse lahir dari satu keresahan sederhana: terlalu banyak ide bagus mati karena keterbatasan perangkat dan biaya pengembangan. Kami menutup celah itu dengan infrastruktur komputasi yang bisa disewa bulanan, dan tim produksi yang mengeksekusi ide jadi produk nyata.',
    ttgP2a: 'Fokus kami tiga hal — ', ttgP2b: 'cepat', ttgP2c: 'stabil', ttgP2d: 'bisa diandalkan jangka panjang',
    ttgP2e: '. Bukan sekadar vendor, tapi partner teknis.',

    faqEye: 'FAQ', faqH2: 'Pertanyaan yang sering masuk.',
    faqLeadA: 'Belum terjawab? ', faqLeadLink: 'Email kami',
    faqs: [
      { q: 'Cloud PC-nya bisa dipakai untuk apa saja?', a: 'Rendering 3D & video, cloud gaming, training model AI ringan, development environment, trading bot, sampai mesin kerja kantor yang bisa diakses dari mana saja. Tersedia Windows maupun Linux.' },
      { q: 'Berapa lama mesin aktif setelah pembayaran?', a: 'Rata-rata 5–15 menit untuk paket standar. Untuk konfigurasi GPU khusus atau spesifikasi custom, umumnya aktif dalam 1–3 jam kerja.' },
      { q: 'Apakah data saya aman?', a: 'Setiap instance terisolasi, terenkripsi saat transit, dan tersedia snapshot berkala. Kami tidak mengakses isi mesin Anda tanpa permintaan tertulis untuk keperluan support.' },
      { q: 'Bagaimana alur produksi aplikasi?', a: 'Discovery & wireframe, sprint pengembangan dengan demo tiap milestone, QA menyeluruh, rilis ke store atau server Anda, lalu masa garansi bug fix setelah rilis.' },
      { q: 'Bisa custom spesifikasi di luar paket?', a: 'Bisa. Paket di halaman harga adalah konfigurasi populer. Hubungi kami untuk kebutuhan enterprise, multi-node, atau kontrak jangka panjang dengan harga khusus.' },
    ],

    kontakEye: 'Kontak', kontakH2: 'Siap mulai proyek lu?',
    kontakLead: 'Ceritakan kebutuhan — sewa Cloud PC, bikin aplikasi, atau otomasi internal. Kami balas di hari kerja yang sama.',
    lEmail: 'Email', lKantor: 'Kantor', lKantorV: 'Lombok Tengah, NTB', lWa: 'WhatsApp',
    fNama: 'Nama', fNamaPh: 'Nama lengkap', fEmail: 'Email',
    fKebutuhan: 'Kebutuhan', fPesan: 'Pesan', fPesanPh: 'Ceritakan kebutuhan lu...',
    fKirim: 'Kirim Pesan', fOk: '✓ Terima kasih! Kami akan menghubungi lu segera.',
    fOpsi: ['Sewa Cloud PC', 'Produksi Aplikasi', 'Software Custom', 'Tools & Automation', 'Lainnya'],
  },

  en: {
    pill: 'Infrastructure & digital products',
    h1a: 'Computing power ', h1em: 'unbound', h1b: ' by your device.',
    leadA: 'Xyverse rents high-performance ', leadB: 'Cloud PCs', leadC: ' and builds the ',
    leadD: 'apps, software, and tools', leadE: ' that make your work faster. One ecosystem, from the machine to the finished product.',
    ctaSewa: 'Rent a Cloud PC', ctaLayanan: 'See Services',
    micro: 'Trusted by creators, game studios, and digital small businesses',
    altIlus: 'Illustration of Xyverse Cloud PC infrastructure',

    stats: [
      { n: '99.9%', l: 'Infrastructure uptime' },
      { n: '<20', l: 'ms latency, SEA region' },
      { n: '120+', l: 'Projects shipped' },
      { n: '24/7', l: 'Technical support' },
    ],

    layananEye: 'Services',
    layananH2: 'Everything you need, in one place.',
    layananLead: 'From virtual machines ready to render in 8K to apps ready for the Play Store.',
    services: [
      { ic: 'cloud', t: 'Cloud PC Rental', d: 'Workstation-class GPU remote desktops. Rendering, gaming, coding, and AI workloads from any device.', tags: ['RDP & Parsec', 'NVIDIA GPU', '99.9% uptime'], href: 'cloud-pc' },
      { ic: 'app', t: 'App Development', d: 'Mobile and web apps from research to release. Android, iOS, PWA, and internal dashboards — design, code, deploy.', tags: ['Flutter', 'React / Next', 'REST API'], href: '#kontak' },
      { ic: 'code', t: 'Custom Software', d: 'Business systems shaped around your workflow: POS, lightweight ERP, licensing systems, bots, and payment gateway integrations.', tags: ['Backend', 'Database', 'Integrations'], href: '#kontak' },
      { ic: 'tool', t: 'Tools & Automation', d: 'Utilities, panels, and automation scripts that turn hours of manual work into a single click.', tags: ['Automation', 'Panels', 'Scraping'], href: '#kontak' },
    ],

    cpEye: 'Cloud PC',
    cpH2: 'A studio-class workstation, opened in your browser.',
    cpLead: 'No need to buy a machine worth tens of millions. Rent one with a dedicated GPU, switch it on when you need it, switch it off when you are done. You pay for performance, not for metal idling on a desk.',
    cpChecks: [
      'Windows 11 or Ubuntu, ready to use within minutes',
      'Connect over RDP, Parsec, or straight from the browser',
      'Fast NVMe storage with automatic snapshots',
      'Scale your specification any time, with no re-migration',
    ],
    cpBtn: 'Explore Cloud PC',
    winAria: 'Example of an Xyverse remote session panel',
    winRows: { instance: 'Instance', gpu: 'GPU', cpu: 'vCPU / RAM', region: 'Region', lat: 'Latency', status: 'Status', running: 'Running' },

    prosesEye: 'Process', prosesH2: 'How we work.',
    prosesLead: 'Four clear stages, with no drama and no hidden costs.',
    steps: [
      { n: '01', t: 'Consultation', d: 'Tell us what you need — a Cloud PC spec, an app idea, or a process you want automated.' },
      { n: '02', t: 'Blueprint', d: 'We lay out the architecture, timeline, and a transparent cost estimate before a single line of code is written.' },
      { n: '03', t: 'Build & Deploy', d: 'Execution with regular updates. Machines go live in minutes; software ships in stages.' },
      { n: '04', t: 'Support', d: 'Monitoring, patches, and further iteration. We are still here after the project goes live.' },
    ],

    proyekEye: 'Projects', proyekH2: 'Our latest work.',
    proyekLeadA: 'Full case studies, with the challenges and the impact. ', proyekLink: 'See all projects →',
    blogEye: 'Blog', blogH2: 'Latest technical notes.',
    blogLeadA: 'Guides and lessons from the field. ', blogLink: 'Read all articles →',
    menit: 'min',

    ttgEye: 'About', ttgH2: 'We build the foundation, you build the work.',
    ttgBtn: 'See Pricing',
    ttgP1: 'Xyverse grew out of one simple frustration: too many good ideas die because of hardware limits and development costs. We close that gap with computing infrastructure you can rent by the month, and a production team that turns ideas into real products.',
    ttgP2a: 'We focus on three things — ', ttgP2b: 'fast', ttgP2c: 'stable', ttgP2d: 'dependable over the long run',
    ttgP2e: '. Not just a vendor, but a technical partner.',

    faqEye: 'FAQ', faqH2: 'Questions we hear often.',
    faqLeadA: 'Still unanswered? ', faqLeadLink: 'Email us',
    faqs: [
      { q: 'What can the Cloud PC be used for?', a: '3D and video rendering, cloud gaming, lightweight AI model training, development environments, trading bots, right through to an office machine you can reach from anywhere. Both Windows and Linux are available.' },
      { q: 'How long until the machine is live after payment?', a: 'Typically 5–15 minutes for standard packages. For specialised GPU configurations or custom specs, usually within 1–3 working hours.' },
      { q: 'Is my data safe?', a: 'Every instance is isolated, encrypted in transit, and backed by regular snapshots. We do not access the contents of your machine without a written support request.' },
      { q: 'What does the app production process look like?', a: 'Discovery and wireframes, development sprints with a demo at each milestone, thorough QA, release to the store or your server, then a bug-fix warranty period after launch.' },
      { q: 'Can I customise specs beyond the listed packages?', a: 'Yes. The packages on the pricing page are simply the popular configurations. Get in touch for enterprise, multi-node, or long-term contract needs with bespoke pricing.' },
    ],

    kontakEye: 'Contact', kontakH2: 'Ready to start your project?',
    kontakLead: 'Tell us what you need — a Cloud PC, an app built, or internal automation. We reply the same working day.',
    lEmail: 'Email', lKantor: 'Office', lKantorV: 'Central Lombok, NTB', lWa: 'WhatsApp',
    fNama: 'Name', fNamaPh: 'Full name', fEmail: 'Email',
    fKebutuhan: 'What you need', fPesan: 'Message', fPesanPh: 'Tell us what you need...',
    fKirim: 'Send Message', fOk: '✓ Thank you! We will be in touch shortly.',
    fOpsi: ['Cloud PC rental', 'App development', 'Custom software', 'Tools & automation', 'Something else'],
  },
};
