/**
 * Penanganan gambar — jembatan antara panel admin dan halaman publik.
 *
 * Gambar diunggah dari dashboard ke `public/media/` repo ini, lalu dirujuk
 * dari markdown sebagai `/media/<nama>.webp`. Berkas ini mengurus dua hal
 * yang tidak bisa diurus markdown biasa:
 *
 *   1. URL absolut untuk og:image dan JSON-LD. Keduanya WAJIB absolut;
 *      `/media/x.png` di sana membuat Google dan pratinjau WhatsApp/Discord
 *      gagal memuat gambarnya tanpa pesan apa pun.
 *   2. Menyempurnakan `<img>` hasil render markdown — `loading="lazy"`,
 *      `decoding="async"`, dan `<figure>` + keterangan bila gambarnya
 *      berdiri sendiri. Tanpa `width`/`height` (yang tidak bisa diketahui
 *      saat build untuk berkas di public/) `loading="lazy"` saja belum cukup:
 *      `aspect-ratio` di CSS-lah yang mencegah halaman melompat (CLS).
 */

/** `/media/x.webp` → `https://xyverse.my.id/media/x.webp`. Absolut dibiarkan. */
export function urlGambar(baseUrl: string, jalur?: string | null): string | undefined {
  const j = String(jalur ?? '').trim();
  if (!j) return undefined;
  if (/^https?:\/\//.test(j)) return j;
  return new URL(j.startsWith('/') ? j : `/${j}`, baseUrl).href;
}

/**
 * Gambar untuk og:image / twitter:image / JSON-LD `image`.
 * Urutan: field `og` (khusus Open Graph) → `gambar` (sampul) → undefined
 * supaya pemanggil jatuh ke generator SVG.
 */
export function gambarOG(
  baseUrl: string,
  data: { og?: string; gambar?: string } = {},
): string | undefined {
  return urlGambar(baseUrl, data.og) || urlGambar(baseUrl, data.gambar);
}

/*
 * Penyempurnaan <img> itu sendiri dilakukan pada tingkat AST oleh
 * scripts/rehype-gambar.mjs (terdaftar di astro.config.mjs). Di situ atribut
 * bisa disetel sebelum HTML terbentuk — melakukan hal yang sama dengan regex
 * sesudahnya berarti menebak-nebak bentuk HTML hasil render.
 */
