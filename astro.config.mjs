import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import gambarMarkdown from './scripts/rehype-gambar.mjs';
import { petaSitemap } from './scripts/peta-sitemap.mjs';

/**
 * url -> { lastmod, gambar } untuk setiap halaman konten.
 *
 * Dibaca langsung dari berkas markdown di disk, bukan dari koleksi Astro:
 * config dievaluasi sebelum pipeline konten jalan, jadi `getCollection`
 * belum tersedia di sini. Membaca frontmatter sendiri justru membuat
 * sitemap tetap jujur tanpa bergantung urutan inisialisasi.
 */
/*
 * Alamat kanonis situs, dibaca dari env.
 *
 * Astro memakai satu nilai ini untuk canonical, og:url, hreflang, setiap
 * <loc> di sitemap, dan setiap og:image absolut. Menghardcode
 * https://xyverse.my.id sementara domainnya belum dibeli membuat 1967 URL
 * terbit menunjuk ke alamat yang tidak resolve — pratinjau tautan mati,
 * sitemap tidak bisa dikirim ke Search Console, dan JSON-LD tidak sah.
 *
 * Selama domain belum ada, setel PUBLIC_SITE_URL ke subdomain *.vercel.app
 * di dashboard. Begitu domain dibeli, ganti SATU variabel itu — bukan
 * mengedit kode dan membangun ulang.
 */
const SITE_URL = (process.env.PUBLIC_SITE_URL || 'https://xyverse.my.id').replace(/\/+$/, '');

const PETA_JALUR = petaSitemap(SITE_URL);

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/404') && !page.includes('/og/') && !page.includes('/rss.xml')
        && !page.includes('/cari')       // hasil pencarian per kueri tidak untuk diindeks
        && !page.includes('/tidak-ada')  // halaman 404, sudah noindex
        && page !== `${SITE_URL}/`,
      i18n: {
        defaultLocale: 'id',
        locales: { id: 'id-ID', en: 'en-US' },
      },
      changefreq: 'weekly',
      // Tanpa ini namespace xmlns:image tidak ditulis dan entri gambar
      // di bawahnya jadi tidak sah.
      namespaces: { image: true },
      /*
       * `lastmod` global sengaja TIDAK disetel. Dulu nilainya `new Date()`,
       * yang berarti seluruh 86 URL mengaku baru berubah di setiap build —
       * termasuk dokumen hukum yang tidak disentuh setahun. Google
       * memperlakukan lastmod yang selalu berubah sebagai sinyal yang tidak
       * bisa dipercaya dan akhirnya mengabaikannya untuk semua URL.
       * Tanggal asli diisi per item di serialize() dari LASTMOD.
       */
      serialize(item) {
        if (/^https:\/\/xyverse\.my\.id\/(id|en)\/?$/.test(item.url)) item.priority = 1.0;
        else if (/\/(cloud-pc|harga|aplikasi)/.test(item.url)) item.priority = 0.9;
        else if (/\/(blog|proyek|berita)\/$/.test(item.url)) item.priority = 0.8;
        else if (/\/(legal|kebijakan|syarat|lisensi)/.test(item.url)) item.priority = 0.3;
        else item.priority = 0.6;

        // Tanggal perubahan asli per halaman, dari isi kontennya sendiri.
        const info = PETA_JALUR.get(item.url);
        if (info?.lastmod) item.lastmod = info.lastmod;
        // Kunci yang diterima paket ini adalah `img`, bukan `images`.
        if (info?.gambar) item.img = [{ url: info.gambar }];
        return item;
      },
    }),
  ],
  // Gambar di markdown disempurnakan di tingkat AST — lihat
  // scripts/rehype-gambar.mjs untuk alasan tiap atributnya.
  markdown: { rehypePlugins: [gambarMarkdown] },
  server: { host: '0.0.0.0', port: 4321 },
  preview: { host: '0.0.0.0', port: 4321 },
  vite: {
    preview: { allowedHosts: true },
    server: {
      host: '0.0.0.0',
      allowedHosts: ['.e2b.app', 'localhost', '127.0.0.1'],
      hmr: { clientPort: 443, protocol: 'wss' },
    },
  },
});
