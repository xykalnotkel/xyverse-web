import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { SITE } from '../../data/site';
import { SEMUA_LANG, BAHASA, rute, type Lang } from '../../i18n/config';
import { slugKonten, filterLang, DESC_SITUS } from '../../i18n/data';
import { urlGambar } from '../../lib/gambar';

const MIME: Record<string, string> = {
  '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.gif': 'image/gif',
};

/**
 * `<enclosure>` untuk gambar sampul di umpan.
 *
 * Panjang berkas wajib diisi dan beberapa pembaca RSS menolak umpan yang
 * berbohong soal itu, jadi berkasnya benar-benar dibaca dari public/.
 * Berkas yang belum ada (mis. artikel sudah terbit tapi gambarnya belum
 * diunggah) dilewati diam-diam — umpan tidak boleh mati karena satu gambar.
 */
async function lampiran(jalur?: string) {
  const u = urlGambar(SITE.url, jalur);
  if (!u) return undefined;
  const lokal = path.join('public', new URL(u).pathname);
  const mime = MIME[path.extname(lokal).toLowerCase()];
  if (!mime || !existsSync(lokal)) return undefined;
  try {
    const panjang = (await readFile(lokal)).length;
    return { url: u, length: panjang, type: mime };
  } catch {
    return undefined;
  }
}

export function getStaticPaths() {
  return SEMUA_LANG.map((lang) => ({ params: { lang }, props: { lang } }));
}

const JUDUL: Record<Lang, string> = {
  id: 'Blog, Berita & Proyek',
  en: 'Blog, News & Projects',
};
const LABEL: Record<Lang, { blog: string; berita: string; proyek: string }> = {
  id: { blog: 'Blog', berita: 'Berita', proyek: 'Proyek' },
  en: { blog: 'Blog', berita: 'News', proyek: 'Projects' },
};

export const GET: APIRoute = async (ctx) => {
  const lang = (ctx.props as any).lang as Lang;
  const [blogAll, beritaAll, proyekAll] = await Promise.all([
    getCollection('blog'), getCollection('berita'), getCollection('proyek'),
  ]);
  const blog = blogAll.filter(filterLang(lang));
  const berita = beritaAll.filter(filterLang(lang));
  const proyek = proyekAll.filter(filterLang(lang));

  const mentah = [
    ...blog.map((p) => ({
      title: p.data.title,
      description: p.data.desc,
      pubDate: p.data.date,
      gambar: p.data.gambar,
      link: rute(lang, `blog/${slugKonten(p.id)}`),
      categories: [p.data.kategori, LABEL[lang].blog],
      author: SITE.email,
    })),
    ...berita.map((p) => ({
      title: p.data.title,
      description: p.data.desc,
      pubDate: p.data.date,
      gambar: p.data.gambar,
      link: rute(lang, `berita/${slugKonten(p.id)}`),
      categories: [p.data.tag, LABEL[lang].berita],
      author: SITE.email,
    })),
    // Proyek ikut diumpankan: portofolio yang baru selesai sama pentingnya
    // dengan pengumuman, dan selama ini tidak pernah muncul di RSS mana pun.
    ...proyek.map((p) => ({
      title: p.data.title,
      description: p.data.desc,
      pubDate: p.data.date,
      gambar: p.data.gambar,
      link: rute(lang, `proyek/${slugKonten(p.id)}`),
      categories: [p.data.layanan, LABEL[lang].proyek],
      author: SITE.email,
    })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  const items = await Promise.all(
    mentah.map(async ({ gambar, ...sisanya }) => ({
      ...sisanya,
      enclosure: await lampiran(gambar),
    })),
  );

  return rss({
    title: `${SITE.nama} — ${JUDUL[lang]}`,
    description: DESC_SITUS[lang],
    site: ctx.site ?? SITE.url,
    items,
    customData: `<language>${BAHASA[lang].htmlLang}</language><copyright>© ${new Date().getFullYear()} ${SITE.nama}</copyright>`,
  });
};
