/**
 * Plugin rehype untuk gambar di dalam markdown.
 *
 * Dipakai lewat `markdown.rehypePlugins` di astro.config.mjs, jadi berlaku
 * untuk SEMUA koleksi (blog, berita, proyek, legal) tanpa menyentuh tiap
 * halaman.
 *
 * Yang dikerjakan, dan kenapa:
 *
 *   loading="lazy"   Gambar di bawah lipatan tidak boleh menyedot kuota
 *                    sebelum terlihat. Tanpa ini, artikel dengan delapan
 *                    tangkapan layar mengunduh semuanya sekaligus.
 *   fetchpriority    Gambar PERTAMA dapat prioritas tinggi karena biasanya
 *   ="high"          itulah LCP halaman — menandainya lazy justru merugikan.
 *   decoding="async" Dekode gambar tidak memblokir paint.
 *   alt=""           Gambar tanpa alt ditandai dekoratif secara eksplisit;
 *                    alt yang bolong membuat pembaca layar membacakan nama
 *                    berkasnya.
 *   <figure>         Paragraf yang isinya cuma satu gambar jadi figure, dan
 *   + figcaption     alt-nya tampil sebagai keterangan — kecuali alt itu
 *                    cuma pengulangan nama berkas, yang tidak menambah apa-apa.
 *
 * Catatan: width/height tidak bisa diketahui saat build untuk berkas di
 * public/media/, jadi pencegahan pergeseran tata letak (CLS) diserahkan ke
 * `aspect-ratio` pada .prose img.
 */

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
const batang = (src) =>
  String(src || '').split('/').pop().replace(/\.[a-z0-9]+$/i, '').toLowerCase();

/** Alt layak jadi keterangan bila bukan pengulangan nama berkasnya. */
const layakKeterangan = (alt, src) => Boolean(alt) && norm(alt) !== norm(batang(src));

export default function gambarMarkdown() {
  let nomor = 0;
  return (pohon) => {
    nomor = 0; // setiap dokumen mulai hitung dari awal

    const anak = pohon.children || [];
    for (let i = 0; i < anak.length; i++) {
      const n = anak[i];
      if (n.type !== 'element') continue;
      if (n.tagName !== 'img' && n.tagName !== 'p') continue;

      // Kumpulkan <img> langsung di bawah paragraf, atau gambar tunggal.
      const daftar =
        n.tagName === 'img'
          ? [n]
          : n.children.filter((c) => c.type === 'element' && c.tagName === 'img');

      for (const img of daftar) {
        nomor += 1;
        const p = img.properties || (img.properties = {});
        if (nomor === 1) p.fetchPriority = 'high';
        else if (!p.loading) p.loading = 'lazy';
        if (!p.decoding) p.decoding = 'async';
        if (p.alt === undefined || p.alt === null) p.alt = '';
      }

      // Paragraf yang HANYA berisi satu gambar -> figure (+ keterangan)
      if (n.tagName !== 'p') continue;
      if (daftar.length !== 1) continue;
      if (n.children.length !== 1) continue;

      const img = daftar[0];
      const alt = String(img.properties?.alt ?? '').trim();
      const src = String(img.properties?.src ?? '');
      const simpul = [img];
      if (layakKeterangan(alt, src)) {
        simpul.push({
          type: 'element',
          tagName: 'figcaption',
          properties: {},
          children: [{ type: 'text', value: alt }],
        });
      }
      anak[i] = { type: 'element', tagName: 'figure', properties: {}, children: simpul };
    }
  };
}
