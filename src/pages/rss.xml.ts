import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { SITE } from '../data/site';

export const GET: APIRoute = async (ctx) => {
  const [blog, berita] = await Promise.all([
    getCollection('blog', ({ data }) => !data.draft),
    getCollection('berita', ({ data }) => !data.draft),
  ]);

  const items = [
    ...blog.map((p) => ({
      title: p.data.title,
      description: p.data.desc,
      pubDate: p.data.date,
      link: `/blog/${p.id}/`,
      categories: [p.data.kategori, 'Blog'],
      author: SITE.email,
    })),
    ...berita.map((p) => ({
      title: p.data.title,
      description: p.data.desc,
      pubDate: p.data.date,
      link: `/berita/${p.id}/`,
      categories: [p.data.tag, 'Berita'],
      author: SITE.email,
    })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: `${SITE.nama} — Blog & Berita`,
    description: SITE.desc,
    site: ctx.site ?? SITE.url,
    items,
    customData: `<language>id-ID</language><copyright>© ${new Date().getFullYear()} ${SITE.nama}</copyright>`,
  });
};
