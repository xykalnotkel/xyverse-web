import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://xyverse.my.id',
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/og/') && !page.includes('/rss.xml') && page !== 'https://xyverse.my.id/',
      i18n: {
        defaultLocale: 'id',
        locales: { id: 'id-ID', en: 'en-US' },
      },
      changefreq: 'weekly',
      lastmod: new Date(),
      serialize(item) {
        if (/^https:\/\/xyverse\.my\.id\/(id|en)\/?$/.test(item.url)) item.priority = 1.0;
        else if (/\/(cloud-pc|harga|aplikasi)/.test(item.url)) item.priority = 0.9;
        else if (/\/(blog|proyek|berita)\/$/.test(item.url)) item.priority = 0.8;
        else if (/\/(legal|kebijakan|syarat|lisensi)/.test(item.url)) item.priority = 0.3;
        else item.priority = 0.6;
        return item;
      },
    }),
  ],
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
