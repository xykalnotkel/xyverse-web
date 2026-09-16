import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { buatOG } from '../../lib/og';
import { SITE, APLIKASI, LEGAL_NAV } from '../../data/site';

/**
 * OG image statis per halaman. Setiap rute situs punya berkas SVG sendiri
 * di /og/<slug>.svg sehingga tetap berfungsi pada build statis penuh.
 */
export async function getStaticPaths() {
  const [blog, berita, proyek] = await Promise.all([
    getCollection('blog', ({ data }) => !data.draft),
    getCollection('berita', ({ data }) => !data.draft),
    getCollection('proyek', ({ data }) => !data.draft),
  ]);

  const halaman = [
    { slug: 'default', judul: SITE.tagline, tag: '' },
    { slug: 'cloud-pc', judul: 'Sewa Cloud PC berperforma tinggi', tag: 'Layanan' },
    { slug: 'harga', judul: 'Harga transparan, tanpa biaya tersembunyi', tag: 'Harga' },
    { slug: 'aplikasi', judul: 'XyDesk & XyCloudStore', tag: 'Aplikasi' },
    { slug: 'tentang', judul: 'Tentang Xyverse dan tim di baliknya', tag: 'Tentang' },
    { slug: 'kontak', judul: 'Hubungi tim Xyverse', tag: 'Kontak' },
    { slug: 'blog', judul: 'Panduan dan catatan teknis', tag: 'Blog' },
    { slug: 'berita', judul: 'Pengumuman dan pembaruan layanan', tag: 'Berita' },
    { slug: 'proyek', judul: 'Proyek yang pernah kami kerjakan', tag: 'Proyek' },
    { slug: 'legal', judul: 'Pusat dokumen legal', tag: 'Legal' },
    ...APLIKASI.map((a) => ({ slug: `aplikasi-${a.slug}`, judul: `${a.nama} — ${a.tagline}`, tag: 'Aplikasi' })),
    ...LEGAL_NAV.map((l) => ({ slug: `legal-${l.href.split('/').pop()}`, judul: l.t, tag: 'Legal' })),
    ...blog.map((p) => ({ slug: `blog-${p.id}`, judul: p.data.title, tag: p.data.kategori })),
    ...berita.map((p) => ({ slug: `berita-${p.id}`, judul: p.data.title, tag: p.data.tag })),
    ...proyek.map((p) => ({ slug: `proyek-${p.id}`, judul: p.data.title, tag: p.data.layanan })),
  ];

  return halaman.map((h) => ({ params: { slug: h.slug }, props: { judul: h.judul, tag: h.tag } }));
}

export const GET: APIRoute = ({ props }) =>
  new Response(buatOG(props.judul as string, props.tag as string), {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
