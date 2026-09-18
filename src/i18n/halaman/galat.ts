import type { Lang } from '../config';

/**
 * Teks halaman "tidak ditemukan".
 *
 * Satu halaman 404 untuk seluruh situs berarti pengguna yang salah mengetik
 * alamat artikel blog ditawari tautan ke harga dan karier — tidak membantu.
 * Karena itu tiap bagian punya versinya sendiri dengan tujuan yang masuk
 * akal untuk bagian itu.
 *
 * Astro memperlakukan SEMUA berkas bernama `404.astro` sebagai halaman 404
 * khusus dan hanya merender satu di akar, jadi halaman-halaman ini memakai
 * nama `tidak-ada.astro` dan dipetakan lewat `routes` di vercel.json.
 */

export interface Tujuan {
  slug: string;
  t: string;
  d: string;
}

interface TeksBagian {
  judul: string;
  h1: string;
  lead: string;
  cari: string;
  tautan: Tujuan[];
}

export const GALAT: Record<Lang, { meta: string; foot1: string; footA: string; foot2: string; bagi: Record<string, TeksBagian> }> = {
  id: {
    meta: 'Halaman tidak ditemukan',
    foot1: 'Masih buntu? ',
    footA: 'Kabari kami',
    foot2: ' dan kami bantu carikan.',
    bagi: {
      blog: {
        judul: 'Artikel tidak ditemukan',
        h1: 'Artikel ini tidak ada di blog kami.',
        lead: 'Mungkin alamatnya salah ketik, atau artikelnya sudah kami pindahkan. Coba telusuri, atau langsung ke salah satu artikel di bawah.',
        cari: 'Cari artikel lain',
        tautan: [
          { slug: 'blog', t: 'Semua artikel', d: 'Panduan dan catatan teknis' },
          { slug: 'cari', t: 'Telusuri situs', d: 'Cari berdasarkan judul atau topik' },
          { slug: 'panduan', t: 'Panduan', d: 'Langkah demi langkah sampai jalan' },
        ],
      },
      berita: {
        judul: 'Berita tidak ditemukan',
        h1: 'Berita ini tidak ada.',
        lead: 'Pengumuman yang lu cari mungkin sudah diganti atau dihapus. Kabar terbaru ada di daftar berita.',
        cari: 'Cari berita lain',
        tautan: [
          { slug: 'berita', t: 'Semua berita', d: 'Pengumuman dan pembaruan layanan' },
          { slug: 'changelog', t: 'Changelog', d: 'Setiap perubahan yang kami rilis' },
          { slug: 'status', t: 'Status', d: 'Kondisi sistem dan riwayat insiden' },
        ],
      },
      proyek: {
        judul: 'Proyek tidak ditemukan',
        h1: 'Studi kasus ini tidak ada.',
        lead: 'Mungkin alamatnya salah, atau halaman proyeknya belum kami terbitkan. Beberapa pekerjaan lain bisa lu lihat di bawah.',
        cari: 'Cari proyek lain',
        tautan: [
          { slug: 'proyek', t: 'Semua proyek', d: 'Pekerjaan yang pernah kami kerjakan' },
          { slug: 'kolaborasi', t: 'Kolaborasi', d: 'Cara memulai proyek bersama kami' },
          { slug: 'kontak', t: 'Kontak', d: 'Bicara langsung dengan tim' },
        ],
      },
      legal: {
        judul: 'Dokumen tidak ditemukan',
        h1: 'Dokumen legal ini tidak ada.',
        lead: 'Alamat dokumennya mungkin berubah. Semua dokumen yang berlaku ada di pusat legal, dan pertanyaan spesifik bisa dikirim ke tim legal kami.',
        cari: 'Cari dokumen',
        tautan: [
          { slug: 'legal', t: 'Pusat Legal', d: 'Semua dokumen yang berlaku' },
          { slug: 'legal/kebijakan-privasi', t: 'Kebijakan Privasi', d: 'Cara kami memperlakukan data lu' },
          { slug: 'kontak', t: 'Hubungi tim legal', d: 'xycdigital@gmail.com' },
        ],
      },
      aplikasi: {
        judul: 'Aplikasi tidak ditemukan',
        h1: 'Aplikasi ini tidak ada.',
        lead: 'Kami punya XyDesk dan XyCloudStore. Kalau yang lu cari di luar itu, kabari kami — mungkin memang belum kami terbitkan.',
        cari: 'Cari aplikasi',
        tautan: [
          { slug: 'aplikasi', t: 'Semua aplikasi', d: 'XyDesk dan XyCloudStore' },
          { slug: 'aplikasi/xydesk', t: 'XyDesk', d: 'Klien remote desktop resmi' },
          { slug: 'aplikasi/xycloudstore', t: 'XyCloudStore', d: 'Kelola instance dan perangkat lunak' },
        ],
      },
    },
  },
  en: {
    meta: 'Page not found',
    foot1: 'Still stuck? ',
    footA: 'Let us know',
    foot2: ' and we will help you find it.',
    bagi: {
      blog: {
        judul: 'Article not found',
        h1: 'This article is not on our blog.',
        lead: 'The address may have a typo, or we may have moved the article. Try searching, or jump straight to one below.',
        cari: 'Search for another article',
        tautan: [
          { slug: 'blog', t: 'All articles', d: 'Guides and technical notes' },
          { slug: 'cari', t: 'Search the site', d: 'Find by title or topic' },
          { slug: 'panduan', t: 'Guides', d: 'Step-by-step walkthroughs' },
        ],
      },
      berita: {
        judul: 'News not found',
        h1: 'This news item does not exist.',
        lead: 'The announcement you are after may have been replaced or removed. The latest updates are in the news list.',
        cari: 'Search for other news',
        tautan: [
          { slug: 'berita', t: 'All news', d: 'Announcements and service updates' },
          { slug: 'changelog', t: 'Changelog', d: 'Every change we ship' },
          { slug: 'status', t: 'Status', d: 'System health and incident history' },
        ],
      },
      proyek: {
        judul: 'Project not found',
        h1: 'This case study does not exist.',
        lead: 'The address may be wrong, or the project page is not published yet. Other work we have delivered is below.',
        cari: 'Search for other projects',
        tautan: [
          { slug: 'proyek', t: 'All projects', d: 'Work we have delivered' },
          { slug: 'kolaborasi', t: 'Work with us', d: 'How to start a project together' },
          { slug: 'kontak', t: 'Contact', d: 'Talk to the team directly' },
        ],
      },
      legal: {
        judul: 'Document not found',
        h1: 'This legal document does not exist.',
        lead: 'The document address may have changed. Everything currently in force is in the legal center, and specific questions can go to our legal team.',
        cari: 'Search documents',
        tautan: [
          { slug: 'legal', t: 'Legal Center', d: 'All documents in force' },
          // Slug konten EN memang masih memakai nama berkas Indonesia —
          // itu keputusan lama di slugKonten(), bukan salah ketik di sini.
          { slug: 'legal/kebijakan-privasi', t: 'Privacy Policy', d: 'How we handle your data' },
          { slug: 'kontak', t: 'Contact legal', d: 'xycdigital@gmail.com' },
        ],
      },
      aplikasi: {
        judul: 'App not found',
        h1: 'This app does not exist.',
        lead: 'We have XyDesk and XyCloudStore. If you were looking for something else, tell us — it may simply not be published yet.',
        cari: 'Search apps',
        tautan: [
          { slug: 'aplikasi', t: 'All apps', d: 'XyDesk and XyCloudStore' },
          { slug: 'aplikasi/xydesk', t: 'XyDesk', d: 'The official remote desktop client' },
          { slug: 'aplikasi/xycloudstore', t: 'XyCloudStore', d: 'Manage instances and software' },
        ],
      },
    },
  },
};

/** Bagian yang punya halaman 404 sendiri. */
export const BAGIAN_404 = ['blog', 'berita', 'proyek', 'legal', 'aplikasi'] as const;
