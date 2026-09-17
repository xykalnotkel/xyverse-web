/**
 * Pemeriksa hasil build statis (dist/) — dijalankan SETELAH `npm run build`.
 *
 * Tujuannya mengunci tiga kelas bug yang pernah ada di situs ini:
 *
 *   1. Teks Indonesia bocor ke halaman /en/  (string UI yang di-hardcode
 *      padahal kamus i18n-nya tidak punya kuncinya).
 *   2. JSON-LD `inLanguage` dikunci `id-ID` walau halamannya berbahasa Inggris.
 *   3. og:image / twitter:image menunjuk berkas yang tidak ikut ter-build
 *      (dulu `/og.png` — berkasnya memang tidak pernah ada).
 *
 * Ditambah satu pemeriksaan regresi: tautan berprefiks bahasa ganda
 * (`/en/blog/en/...`) yang muncul kalau `slugKonten()` terlewat.
 *
 * Jalankan:  npm run build && npm test
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');
if (!existsSync(DIST)) {
  console.error('dist/ tidak ada — jalankan `npm run build` dulu.');
  process.exit(1);
}

/* ---- kumpulkan semua .html ---- */
function jalan(dir) {
  const out = [];
  for (const e of readdirSync(dir)) {
    const p = path.join(dir, e);
    if (statSync(p).isDirectory()) out.push(...jalan(p));
    else if (e.endsWith('.html')) out.push(p);
  }
  return out;
}
const berkas = jalan(DIST);
const en = berkas.filter((f) => f.includes(`${path.sep}en${path.sep}`));
const id = berkas.filter((f) => !f.includes(`${path.sep}en${path.sep}`));

let gagal = 0;
const cek = (nama, syarat, detail = '') => {
  if (syarat) console.log(`  ok   ${nama}`);
  else { gagal++; console.log(`  GAGAL ${nama}${detail ? '\n       ' + detail : ''}`); }
};
const relatif = (f) => path.relative(DIST, f);

/* ============================================================
 * 1. Kebocoran teks Indonesia di halaman EN
 * ============================================================ */
console.log('\n[1] Tidak ada teks Indonesia di halaman /en/');

// Kata/frasa UI yang hanya boleh muncul dalam Bahasa Indonesia.
const BOCOR = [
  'menit baca',
  'Sebelumnya',
  'Berikutnya',
  'Beranda',
  'Remah roti',
  'Konsultasi Gratis',
  'Butuh bantuan teknis',
  'Baca juga',
  'Navigasi artikel',
  'Navigasi berita',
  'Proyek lainnya',
  'Berita lainnya',
  'Detail Proyek',
  'menit<',
];
const kena = [];
for (const f of en) {
  const html = readFileSync(f, 'utf8');
  for (const kata of BOCOR) if (html.includes(kata)) kena.push(`${relatif(f)} → "${kata}"`);
}
cek(`${en.length} halaman EN bersih dari ${BOCOR.length} string Indonesia`, kena.length === 0, kena.slice(0, 12).join('\n       '));

/* ============================================================
 * 2. inLanguage sesuai bahasa halaman
 * ============================================================ */
console.log('\n[2] JSON-LD inLanguage cocok dengan bahasa halaman');
const salahLang = [];
for (const f of berkas) {
  const html = readFileSync(f, 'utf8');
  const inggris = f.includes(`${path.sep}en${path.sep}`);
  for (const m of html.matchAll(/"inLanguage"\s*:\s*"([^"]+)"/g)) {
    const harap = inggris ? 'en-US' : 'id-ID';
    if (m[1] !== harap) salahLang.push(`${relatif(f)} → inLanguage="${m[1]}" (harusnya ${harap})`);
  }
}
cek('semua inLanguage benar', salahLang.length === 0, salahLang.slice(0, 12).join('\n       '));

/* ============================================================
 * 3. Setiap og:image / twitter:image benar-benar ada di dist/
 * ============================================================ */
console.log('\n[3] Semua og:image & twitter:image menunjuk berkas yang ada');
const imgHilang = new Set();
let imgDiperiksa = 0;
for (const f of berkas) {
  const html = readFileSync(f, 'utf8');
  for (const m of html.matchAll(/<meta[^>]+(?:property|name)="(?:og:image|twitter:image)"[^>]+content="([^"]+)"/g)) {
    imgDiperiksa++;
    const url = new URL(m[1]);
    const lokal = path.join(DIST, url.pathname);
    if (!existsSync(lokal)) imgHilang.add(url.pathname);
  }
}
cek(`${imgDiperiksa} rujukan gambar OG valid`, imgHilang.size === 0, [...imgHilang].slice(0, 12).join('\n       '));

/* ============================================================
 * 4. Tidak ada tautan berprefiks bahasa ganda
 * ============================================================ */
console.log('\n[4] Tidak ada tautan berprefiks bahasa ganda');
const ganda = [];
for (const f of berkas) {
  const html = readFileSync(f, 'utf8');
  for (const m of html.matchAll(/href="(\/(?:id|en)\/(?:blog|berita|proyek|legal)\/(?:id|en)\/[^"]*)"/g)) {
    ganda.push(`${relatif(f)} → ${m[1]}`);
  }
}
cek('tidak ada /en/blog/en/…', ganda.length === 0, ganda.slice(0, 12).join('\n       '));

/* ============================================================
 * 5. Berkas OG artikel benar-benar ter-build untuk kedua bahasa
 * ============================================================ */
console.log('\n[5] Gambar OG ada untuk setiap artikel, dua bahasa');
const ogDir = path.join(DIST, 'og');
const ogAda = new Set(readdirSync(ogDir));
const ogKurang = [];
for (const col of ['blog', 'berita', 'proyek']) {
  for (const lang of ['id', 'en']) {
    const dir = path.join(DIST, lang, col);
    if (!existsSync(dir)) continue;
    for (const slug of readdirSync(dir)) {
      if (!statSync(path.join(dir, slug)).isDirectory()) continue;
      const nama = `${lang}-${col}-${slug}.svg`;
      if (!ogAda.has(nama)) ogKurang.push(nama);
    }
  }
}
cek('OG lengkap per artikel per bahasa', ogKurang.length === 0, ogKurang.slice(0, 12).join('\n       '));

console.log(`\n${berkas.length} halaman diperiksa (${en.length} EN, ${id.length} ID/akar).`);
console.log(gagal ? `${gagal} pemeriksaan GAGAL\n` : 'Semua pemeriksaan lolos\n');
process.exit(gagal ? 1 : 0);
