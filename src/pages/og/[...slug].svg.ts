import type { APIRoute } from 'astro';
import { slugKonten, filterLang } from '../../i18n/data';
import { getCollection } from 'astro:content';
import { buatOG } from '../../lib/og';
import { SITE, APLIKASI } from '../../data/site';
import { SEMUA_LANG } from '../../i18n/config';
import { TAGLINE, sumberNav, legalNav, APLIKASI_TEKS } from '../../i18n/data';

/**
 * OG image statis per halaman. Setiap rute situs punya berkas SVG sendiri
 * di /og/<slug>.svg sehingga tetap berfungsi pada build statis penuh.
 */
export async function getStaticPaths() {
  const [blogAll, beritaAll, proyekAll] = await Promise.all([
    getCollection('blog'),
    getCollection('berita'),
    getCollection('proyek'),
  ]);

  const statis: Record<string, { judul: Record<string, string>; tag: Record<string, string> }> = {
    default: { judul: { id: TAGLINE.id, en: TAGLINE.en }, tag: { id: '', en: '' } },
    'cloud-pc': {
      judul: { id: 'Sewa Cloud PC berperforma tinggi', en: 'Rent a high-performance Cloud PC' },
      tag: { id: 'Layanan', en: 'Service' },
    },
    harga: {
      judul: { id: 'Harga transparan, tanpa biaya tersembunyi', en: 'Transparent pricing, no hidden fees' },
      tag: { id: 'Harga', en: 'Pricing' },
    },
    aplikasi: { judul: { id: 'XyDesk & XyCloudStore', en: 'XyDesk & XyCloudStore' }, tag: { id: 'Aplikasi', en: 'Apps' } },
    tentang: {
      judul: { id: 'Tentang Xyverse dan tim di baliknya', en: 'About Xyverse and the team behind it' },
      tag: { id: 'Tentang', en: 'About' },
    },
    kontak: { judul: { id: 'Hubungi tim Xyverse', en: 'Get in touch with Xyverse' }, tag: { id: 'Kontak', en: 'Contact' } },
    blog: { judul: { id: 'Panduan dan catatan teknis', en: 'Guides and technical notes' }, tag: { id: 'Blog', en: 'Blog' } },
    berita: { judul: { id: 'Pengumuman dan pembaruan layanan', en: 'Announcements and service updates' }, tag: { id: 'Berita', en: 'News' } },
    proyek: { judul: { id: 'Proyek yang pernah kami kerjakan', en: 'Projects we have delivered' }, tag: { id: 'Proyek', en: 'Projects' } },
    legal: { judul: { id: 'Pusat dokumen legal', en: 'Legal document center' }, tag: { id: 'Legal', en: 'Legal' } },
  };

  const halaman = SEMUA_LANG.flatMap((lang) => [
    ...Object.entries(statis).map(([slug, v]) => ({
      slug: `${lang}-${slug}`,
      judul: v.judul[lang],
      tag: v.tag[lang],
    })),
    ...APLIKASI.map((a) => ({
      slug: `${lang}-aplikasi-${a.slug}`,
      judul: `${a.nama} — ${APLIKASI_TEKS[lang][a.slug].tagline}`,
      tag: lang === 'id' ? 'Aplikasi' : 'Apps',
    })),
    ...sumberNav(lang).map((x) => ({ slug: `${lang}-${x.slug}`, judul: x.d, tag: x.t })),
    ...legalNav(lang).map((x) => ({ slug: `${lang}-legal-${x.slug}`, judul: x.t, tag: lang === 'id' ? 'Legal' : 'Legal' })),
    ...blogAll.filter(filterLang(lang)).map((p) => ({ slug: `${lang}-blog-${slugKonten(p.id)}`, judul: p.data.title, tag: p.data.kategori })),
    ...beritaAll.filter(filterLang(lang)).map((p) => ({ slug: `${lang}-berita-${slugKonten(p.id)}`, judul: p.data.title, tag: p.data.tag })),
    ...proyekAll.filter(filterLang(lang)).map((p) => ({ slug: `${lang}-proyek-${slugKonten(p.id)}`, judul: p.data.title, tag: p.data.layanan })),
  ]);

  return halaman.map((h) => ({ params: { slug: h.slug }, props: { judul: h.judul, tag: h.tag } }));
}

export const GET: APIRoute = ({ props }) =>
  new Response(buatOG(props.judul as string, props.tag as string), {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
