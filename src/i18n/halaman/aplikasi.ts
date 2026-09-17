import type { Lang } from '../config';

export const APL: Record<Lang, any> = {
  id: {
    metaTitle: 'Aplikasi', ogTag: 'Aplikasi', ldName: 'Aplikasi Xyverse',
    metaDesc: 'XyDesk dan XyCloudStore: dua aplikasi resmi untuk mengakses dan mengelola Cloud PC Xyverse dari perangkat apa pun.',
    remah: 'Remah roti',
    eyebrow: 'Aplikasi', judul: 'Dua aplikasi untuk semua kebutuhan Cloud PC.',
    lead: 'XyDesk menghubungkan lu ke mesin. XyCloudStore mengurus sisanya — langganan, instalasi, dan pemantauan. Keduanya gratis untuk pelanggan aktif.',
    hint: 'Sebagian besar pelanggan memakai keduanya: XyCloudStore untuk mengatur, XyDesk untuk bekerja.',
    detail: 'Lihat detail', langganan: 'Mulai berlangganan',
    bedaH2: 'Bedanya apa?',
    thKebutuhan: 'Kebutuhan', ya: 'Ya',
    baris: [
      'Mengakses layar Cloud PC', 'Menyalakan / mematikan mesin', 'Memasang perangkat lunak',
      'Melihat tagihan & pemakaian', 'Transfer berkas', 'Kelola snapshot',
      'Undang anggota tim', 'Berjalan di peramban',
    ],
    // halaman detail
    beranda: 'Beranda', unduhOpsi: 'Lihat opsi unduh',
    hintUnduh: 'Tautan unduh aktif otomatis di dasbor setelah langganan lu aktif.',
    fiturH2: 'Fitur lengkap', tersediaH2: 'Tersedia di',
    faqH2: 'Pertanyaan umum', lainH2: 'Aplikasi lainnya',
    unduh: {
      xydesk: [
        { p: 'Windows', v: '10 / 11 · 64-bit', f: '.exe' },
        { p: 'macOS', v: '12 Monterey ke atas', f: '.dmg' },
        { p: 'Linux', v: 'Debian, Ubuntu, Fedora', f: '.AppImage' },
        { p: 'Android', v: '9.0 ke atas', f: 'Play Store' },
        { p: 'iOS', v: '15 ke atas', f: 'App Store' },
      ],
      xycloudstore: [
        { p: 'Web', v: 'Peramban modern apa pun', f: 'Buka panel' },
        { p: 'Android', v: '9.0 ke atas', f: 'Play Store' },
        { p: 'iOS', v: '15 ke atas', f: 'App Store' },
      ],
    },
    faq: {
      xydesk: [
        { q: 'Apakah XyDesk berbayar?', a: 'Gratis untuk semua pelanggan Cloud PC aktif. Tidak ada batasan jumlah perangkat pribadi.' },
        { q: 'Berapa bandwidth yang dibutuhkan?', a: 'Minimal 10 Mbps untuk 1080p 60fps. Untuk pengalaman terbaik pada multi-monitor, disarankan 25 Mbps ke atas.' },
        { q: 'Bisa dipakai untuk gaming?', a: 'Bisa. Encoding hardware dan pemetaan gamepad membuat latensi input terasa wajar untuk sebagian besar judul.' },
        { q: 'Apakah sesi terenkripsi?', a: 'Ya, seluruh kanal sesi terenkripsi ujung ke ujung. Lihat Kebijakan Keamanan untuk rinciannya.' },
      ],
      xycloudstore: [
        { q: 'Perlu memasang aplikasi?', a: 'Tidak wajib. XyCloudStore berjalan penuh di peramban. Versi ponsel hanya mempermudah kontrol cepat.' },
        { q: 'Apakah katalog aplikasinya bertambah?', a: 'Ya, katalog diperbarui berkala. Lu juga bisa mengusulkan perangkat lunak baru lewat dukungan.' },
        { q: 'Bagaimana penagihannya dihitung?', a: 'Per jam pemakaian mesin yang menyala, ditotal per bulan. Rinciannya terlihat real-time di dasbor.' },
        { q: 'Bisa berbagi akses dengan tim?', a: 'Bisa. Undang anggota tim dan tentukan perannya: penuh, operator, atau hanya melihat.' },
      ],
    },
  },
  en: {
    metaTitle: 'Apps', ogTag: 'Apps', ldName: 'Xyverse Apps',
    metaDesc: 'XyDesk and XyCloudStore: the two official apps for reaching and managing your Xyverse Cloud PC from any device.',
    remah: 'Breadcrumb',
    eyebrow: 'Apps', judul: 'Two apps for everything a Cloud PC needs.',
    lead: 'XyDesk connects you to the machine. XyCloudStore handles the rest — subscriptions, installs, and monitoring. Both are free for active customers.',
    hint: 'Most customers use both: XyCloudStore to manage, XyDesk to work.',
    detail: 'See details', langganan: 'Start a subscription',
    bedaH2: 'What is the difference?',
    thKebutuhan: 'What you need', ya: 'Yes',
    baris: [
      'Viewing the Cloud PC screen', 'Powering machines on and off', 'Installing software',
      'Viewing invoices & usage', 'File transfer', 'Managing snapshots',
      'Inviting team members', 'Running in a browser',
    ],
    beranda: 'Home', unduhOpsi: 'See download options',
    hintUnduh: 'Download links appear automatically in your dashboard once your subscription is active.',
    fiturH2: 'Full feature list', tersediaH2: 'Available on',
    faqH2: 'Common questions', lainH2: 'Other apps',
    unduh: {
      xydesk: [
        { p: 'Windows', v: '10 / 11 · 64-bit', f: '.exe' },
        { p: 'macOS', v: '12 Monterey or later', f: '.dmg' },
        { p: 'Linux', v: 'Debian, Ubuntu, Fedora', f: '.AppImage' },
        { p: 'Android', v: '9.0 or later', f: 'Play Store' },
        { p: 'iOS', v: '15 or later', f: 'App Store' },
      ],
      xycloudstore: [
        { p: 'Web', v: 'Any modern browser', f: 'Open the panel' },
        { p: 'Android', v: '9.0 or later', f: 'Play Store' },
        { p: 'iOS', v: '15 or later', f: 'App Store' },
      ],
    },
    faq: {
      xydesk: [
        { q: 'Does XyDesk cost anything?', a: 'It is free for every active Cloud PC customer, with no limit on the number of personal devices.' },
        { q: 'How much bandwidth do I need?', a: 'At least 10 Mbps for 1080p at 60fps. For the best multi-monitor experience we suggest 25 Mbps or more.' },
        { q: 'Can I use it for gaming?', a: 'Yes. Hardware encoding and gamepad mapping keep input latency comfortable for most titles.' },
        { q: 'Are sessions encrypted?', a: 'Yes, the entire session channel is encrypted end to end. See the Security Policy for details.' },
      ],
      xycloudstore: [
        { q: 'Do I need to install the app?', a: 'Not necessarily. XyCloudStore runs fully in the browser; the mobile version simply makes quick control easier.' },
        { q: 'Does the app catalogue keep growing?', a: 'Yes, the catalogue is updated regularly. You can also suggest new software through support.' },
        { q: 'How is billing calculated?', a: 'By the hour while a machine is running, totalled monthly. The breakdown is visible in real time on the dashboard.' },
        { q: 'Can I share access with my team?', a: 'Yes. Invite team members and set their role: full, operator, or view-only.' },
      ],
    },
  },
};
