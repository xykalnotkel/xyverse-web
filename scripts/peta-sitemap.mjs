import { readdirSync, readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

/**
 * Peta url -> { lastmod, gambar } untuk sitemap.
 *
 * Sumbernya berkas markdown di disk. `diperbarui` dipakai bila ada, kalau
 * tidak `date`. Ini yang membuat sitemap berhenti mengaku seluruh situs
 * berubah di setiap build.
 */
const KOLEKSI = ['blog', 'berita', 'proyek', 'legal'];
const BAHASA = ['id', 'en'];

/** Ambil satu field frontmatter tanpa menarik dependensi YAML penuh. */
function depan(teks) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(teks);
  if (!m) return {};
  const keluar = {};
  for (const baris of m[1].split(/\r?\n/)) {
    const p = /^([A-Za-z_][\w-]*):\s*(.*)$/.exec(baris);
    if (p) keluar[p[1]] = p[2].trim().replace(/^["']|["']$/g, '');
  }
  return keluar;
}

/** `en/foo` -> `foo`; slug konten tidak pernah membawa prefiks bahasa. */
const tanpaBahasa = (id) => id.replace(/^en\//, '');

export function petaSitemap(situs) {
  const peta = new Map();
  const akar = path.resolve('src', 'content');

  for (const col of KOLEKSI) {
    const dirCol = path.join(akar, col);
    if (!existsSync(dirCol)) continue;

    for (const lang of BAHASA) {
      const dir = lang === 'id' ? dirCol : path.join(dirCol, 'en');
      if (!existsSync(dir)) continue;

      for (const nama of readdirSync(dir)) {
        if (!nama.endsWith('.md')) continue;
        const fm = depan(readFileSync(path.join(dir, nama), 'utf8'));
        const slug = nama.replace(/\.md$/, '');
        const tgl = fm.diperbarui || fm.date;
        const lastmod = tgl && !Number.isNaN(Date.parse(tgl)) ? new Date(tgl).toISOString() : undefined;

        // Gambar relatif jadi absolut; sitemap menolak URL relatif.
        let gambar;
        if (fm.gambar) {
          gambar = /^https?:\/\//.test(fm.gambar)
            ? fm.gambar
            : new URL(fm.gambar.startsWith('/') ? fm.gambar : `/${fm.gambar}`, situs).href;
        }

        peta.set(`${siteUrl(situs, lang, col, slug)}`, { lastmod, gambar });
      }
    }
  }
  return peta;
}

function siteUrl(baseUrl, lang, col, slug) {
  const ekor = baseUrl.endsWith('/') ? '' : '/';
  return `${baseUrl}${ekor}${lang}/${col}/${slug}/`;
}
