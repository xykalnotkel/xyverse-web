import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { SITE } from '../../data/site';
import { SEMUA_LANG, BAHASA, rute, type Lang } from '../../i18n/config';
import { slugKonten, filterLang, DESC_SITUS } from '../../i18n/data';

export function getStaticPaths() {
  return SEMUA_LANG.map((lang) => ({ params: { lang }, props: { lang } }));
}

const JUDUL: Record<Lang, string> = {
  id: 'Blog & Berita',
  en: 'Blog & News',
};
const LABEL: Record<Lang, { blog: string; berita: string }> = {
  id: { blog: 'Blog', berita: 'Berita' },
  en: { blog: 'Blog', berita: 'News' },
};

export const GET: APIRoute = async (ctx) => {
  const lang = (ctx.props as any).lang as Lang;
  const [blogAll, beritaAll] = await Promise.all([getCollection('blog'), getCollection('berita')]);
  const blog = blogAll.filter(filterLang(lang));
  const berita = beritaAll.filter(filterLang(lang));

  const items = [
    ...blog.map((p) => ({
      title: p.data.title,
      description: p.data.desc,
      pubDate: p.data.date,
      link: rute(lang, `blog/${slugKonten(p.id)}`),
      categories: [p.data.kategori, LABEL[lang].blog],
      author: SITE.email,
    })),
    ...berita.map((p) => ({
      title: p.data.title,
      description: p.data.desc,
      pubDate: p.data.date,
      link: rute(lang, `berita/${slugKonten(p.id)}`),
      categories: [p.data.tag, LABEL[lang].berita],
      author: SITE.email,
    })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: `${SITE.nama} — ${JUDUL[lang]}`,
    description: DESC_SITUS[lang],
    site: ctx.site ?? SITE.url,
    items,
    customData: `<language>${BAHASA[lang].htmlLang}</language><copyright>© ${new Date().getFullYear()} ${SITE.nama}</copyright>`,
  });
};
