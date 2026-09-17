/**
 * Pemeriksa hasil build statis (dist/) — dijalankan SETELAH `npm run build`.
 *
 *   npm test            periksa dist/ yang ada
 *   npm run test:mandiri  pasang contoh berisi gambar + sampul, build ulang,
 *                         periksa, lalu bersihkan. Mode ini yang membuktikan
 *                         pemeriksaan [7] dan [8] benar-benar menggigit —
 *                         tanpa berkas bergambar, keduanya lolos karena tidak
 *                         ada yang diperiksa, dan itu bukan bukti apa-apa.
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
import { readdirSync, readFileSync, statSync, existsSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import zlib from 'node:zlib';

/* ---------- mode uji mandiri ---------- */

const CONTOH_SLUG = 'contoh-uji-gambar';
const CONTOH_MD = `src/content/blog/${CONTOH_SLUG}.md`;
const CONTOH_PNG = 'public/media/contoh-uji.png';

/** PNG 8×8 ungu yang sah — cukup untuk membuat pemeriksa punya sasaran. */
function pngKecil() {
  const w = 8, h = 8;
  const potong = (tipe, data) => {
    const badan = Buffer.concat([Buffer.from(tipe, 'latin1'), data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(badan), 0);
    const panjang = Buffer.alloc(4);
    panjang.writeUInt32BE(data.length, 0);
    return Buffer.concat([panjang, badan, crc]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;  // kedalaman bit
  ihdr[9] = 2;  // warna: truecolor RGB
  // Tiap baris didahului byte filter 0, lalu w piksel RGB.
  const mentah = Buffer.concat(
    Array.from({ length: h }, () =>
      Buffer.concat([Buffer.from([0]), Buffer.alloc(w * 3).fill(0x8b)])),
  );
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    potong('IHDR', ihdr),
    potong('IDAT', zlib.deflateSync(mentah)),
    potong('IEND', Buffer.alloc(0)),
  ]);
}

function crc32(buf) {
  let c, tabel = crc32.tabel || (crc32.tabel = (() => {
    const t = [];
    for (let n = 0; n < 256; n++) {
      c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      t[n] = c >>> 0;
    }
    return t;
  })());
  c = 0xffffffff;
  for (const b of buf) c = tabel[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function pasangContoh() {
  mkdirSync(path.dirname(CONTOH_PNG), { recursive: true });
  writeFileSync(CONTOH_PNG, pngKecil());
  writeFileSync(CONTOH_MD, `---
title: Contoh Uji Gambar
desc: Berkas sementara untuk membuktikan pemeriksa gambar benar-benar jalan.
date: 2026-09-17
diperbarui: 2026-09-18
kategori: Teknis
baca: 2
gambar: /media/contoh-uji.png
tags: [uji]
---
![Tangkapan layar panel admin](/media/contoh-uji.png)

Paragraf di antaranya.

![contoh-uji](/media/contoh-uji.png)
`);
}

function bersihkanContoh() {
  for (const f of [CONTOH_MD, CONTOH_PNG]) {
    try { rmSync(f, { force: true }); } catch {}
  }
  for (const lang of ['id', 'en']) {
    try { rmSync(path.join('dist', lang, 'blog', CONTOH_SLUG), { recursive: true, force: true }); } catch {}
  }
}

const MANDIRI = process.argv.includes('--mandiri');
if (MANDIRI) {
  console.log('Mode mandiri: memasang contoh bergambar, lalu build ulang.\n');
  pasangContoh();
  // Berkas contoh sementara tidak boleh tertinggal, termasuk kalau
  // pemeriksa di bawah ini gagal — kalau tertinggal, build berikutnya
  // akan menerbitkan artikel palsu ke produksi.
  process.on('exit', bersihkanContoh);
  try {
    execFileSync('npm', ['run', 'build'], { stdio: 'inherit' });
  } catch {
    console.error('\nBuild gagal saat mode mandiri.');
    process.exit(1);
  }
}


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

/* ============================================================
 * 6. Tidak ada kunci i18n yang bocor menjadi teks
 * ============================================================ */
console.log('\n[6] Tidak ada kunci i18n yang tampil sebagai teks');
/*
 * `t()` jatuh ke mengembalikan kuncinya sendiri bila kuncinya tidak ada di
 * kamus. Itu gagal secara diam-diam: build tetap hijau, dan footer di
 * seluruh situs pernah menampilkan "foot.blog", "foot.status", dan
 * sepuluh lainnya — 176-264 kemunculan, di kedua bahasa. Pemeriksaan ini
 * yang menangkapnya.
 */
const bocorKunci = new Map();
for (const f of berkas) {
  const html = readFileSync(f, 'utf8');
  for (const m of html.matchAll(/>([a-z]{2,12}(?:\.[a-zA-Z0-9]+)+)</g)) {
    const k = m[1];
    // Nama domain di footer memang berbentuk titik; bukan kunci.
    if (k.includes('xyverse.my.id') || /\.(com|id|net|org)$/.test(k)) continue;
    bocorKunci.set(k, (bocorKunci.get(k) || 0) + 1);
  }
}
cek('tidak ada kunci seperti "foot.blog" yang tampil apa adanya',
  bocorKunci.size === 0,
  [...bocorKunci].map(([k, n]) => `${k} (${n}×)`).join(', '));

/* ============================================================
 * 7. <img> di dalam isi artikel punya atribut hemat kuota
 * ============================================================ */
console.log('\n[7] Gambar di isi artikel punya loading & decoding');
const imgBermasalah = [];
let imgIsi = 0;
for (const f of berkas) {
  const html = readFileSync(f, 'utf8');
  // Hanya <img> di dalam .prose — gambar dekoratif nav/footer sudah punya
  // width/height eksplisit dan tidak perlu lazy.
  const prose = /<div class="prose"[\s\S]*?<\/div>\s*(?:<\/article>|<div)/.exec(html);
  if (!prose) continue;
  for (const m of prose[0].matchAll(/<img\b[^>]*>/g)) {
    imgIsi++;
    const tag = m[0];
    const malas = /loading="lazy"/.test(tag) || /fetchpriority="high"/.test(tag);
    if (!malas || !/decoding="async"/.test(tag) || !/\balt=/.test(tag)) {
      imgBermasalah.push(`${relatif(f)} → ${tag.slice(0, 90)}`);
    }
  }
}
cek(`${imgIsi} gambar isi punya loading/decoding/alt`, imgBermasalah.length === 0,
  imgBermasalah.slice(0, 8).join('\n       '));

/* ============================================================
 * 8. Setiap rujukan aset lokal benar-benar ikut ter-build
 * ============================================================ */
console.log('\n[8] Semua href/src lokal menunjuk berkas yang ada');
/*
 * Ini kelas bug yang sama dengan og:image 404 di sesi sebelumnya, tapi
 * untuk SEMUA atribut: /favicon.svg pernah dirujuk padahal berkasnya tidak
 * pernah ada, dan halaman itu justru pengalih akar yang paling sering
 * dilihat peramban.
 */
const asetHilang = new Set();
let asetDiperiksa = 0;
for (const f of berkas) {
  const html = readFileSync(f, 'utf8');
  for (const m of html.matchAll(/\b(?:href|src)="(\/[^"#?]*)"/g)) {
    const jalurUrl = m[1];
    // Rute internal, bukan berkas — dilewati.
    if (/^\/(id|en)\//.test(jalurUrl) || jalurUrl === '/') continue;
    asetDiperiksa++;
    if (!existsSync(path.join(DIST, jalurUrl))) asetHilang.add(jalurUrl);
  }
}
cek(`${asetDiperiksa} rujukan aset lokal valid`, asetHilang.size === 0,
  [...asetHilang].slice(0, 12).join(', '));

/* ============================================================
 * 9. Pencarian: indeks terbit dan halamannya ada di dua bahasa
 * ============================================================ */
console.log('\n[9] Pencarian siap pakai');
const indeksAda = existsSync(path.join(DIST, 'indeks.json'));
cek('indeks.json ter-build', indeksAda);
if (indeksAda) {
  const indeks = JSON.parse(readFileSync(path.join(DIST, 'indeks.json'), 'utf8'));
  cek('indeks punya kedua bahasa',
    Array.isArray(indeks.id) && Array.isArray(indeks.en) && indeks.id.length > 0 && indeks.en.length > 0,
    `id=${indeks.id?.length} en=${indeks.en?.length}`);
  const tanpaJudul = [...(indeks.id || []), ...(indeks.en || [])].filter((x) => !x.j || !x.u);
  cek('setiap baris indeks punya judul dan URL', tanpaJudul.length === 0);
}
cek('halaman /cari ada di kedua bahasa',
  existsSync(path.join(DIST, 'id', 'cari', 'index.html')) &&
  existsSync(path.join(DIST, 'en', 'cari', 'index.html')));

/* ============================================================
 * 10. Sitemap: lastmod per halaman, bukan tanggal build
 * ============================================================ */
console.log('\n[10] Sitemap jujur soal tanggal perubahan');
const smPath = path.join(DIST, 'sitemap-0.xml');
if (existsSync(smPath)) {
  const sm = readFileSync(smPath, 'utf8');
  const tanggal = [...sm.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1]);
  const unik = new Set(tanggal);
  /*
   * Dulu `lastmod: new Date()` membuat SEMUA URL memakai tanggal build.
   * Isi yang bervariasi membuktikan tanggalnya berasal dari kontennya.
   */
  cek(`lastmod bervariasi (${unik.size} tanggal berbeda dari ${tanggal.length} entri)`,
    unik.size > 1, [...unik].slice(0, 5).join(', '));
  cek('tidak ada /cari di sitemap', !sm.includes('/cari/'));
  cek('namespace image dinyalakan bila ada entri gambar',
    !sm.includes('<image:loc>') || sm.includes('xmlns:image='));
} else {
  cek('sitemap-0.xml ada', false);
}

/* ============================================================
 * 11. RSS per bahasa memuat ketiga koleksi
 * ============================================================ */
console.log('\n[11] RSS memuat blog, berita, dan proyek');
for (const lang of ['id', 'en']) {
  const rp = path.join(DIST, lang, 'rss.xml');
  if (!existsSync(rp)) { cek(`${lang}/rss.xml ada`, false); continue; }
  const xml = readFileSync(rp, 'utf8');
  const tautan = [...xml.matchAll(/<link>([^<]+)<\/link>/g)].map((m) => m[1]);
  const ada = (seg) => tautan.some((l) => l.includes(`/${seg}/`));
  cek(`RSS ${lang}: blog + berita + proyek`, ada('blog') && ada('berita') && ada('proyek'),
    tautan.slice(0, 4).join(' '));
}

/* ============================================================
 * 12. og:image & JSON-LD image absolut dan ada di dist/
 * ============================================================ */
console.log('\n[12] Gambar Open Graph & JSON-LD absolut dan nyata');
const ogRelatif = [];
let gambarDiperiksa = 0;
for (const f of berkas) {
  const html = readFileSync(f, 'utf8');
  for (const m of html.matchAll(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/g)) {
    gambarDiperiksa++;
    // og:image relatif diabaikan diam-diam oleh sebagian besar platform
    // (WhatsApp, Discord, Slack) tanpa pesan apa pun.
    if (!/^https?:\/\//.test(m[1])) ogRelatif.push(`${relatif(f)} → ${m[1]}`);
  }
  for (const m of html.matchAll(/"image"\s*:\s*"([^"]+)"/g)) {
    gambarDiperiksa++;
    if (!/^https?:\/\//.test(m[1])) ogRelatif.push(`${relatif(f)} → ${m[1]}`);
  }
}
cek(`${gambarDiperiksa} rujukan gambar OG/JSON-LD absolut`, ogRelatif.length === 0,
  ogRelatif.slice(0, 8).join('\n       '));

/*
 * Mode mandiri gagal bila contohnya justru tidak ikut terperiksa — itu
 * berarti pemeriksanya yang bolong, bukan kontennya.
 */
if (MANDIRI) {
  if (imgIsi === 0) { gagal++; console.log('  GAGAL mode mandiri: tidak ada gambar isi yang terperiksa'); }
  else console.log(`\nMode mandiri: ${imgIsi} gambar contoh ikut terperiksa.`);
  bersihkanContoh();
  // Bangun ulang supaya dist/ tidak menyimpan halaman contoh.
  try { execFileSync('npm', ['run', 'build'], { stdio: 'ignore' }); } catch {}
}

console.log(`\n${berkas.length} halaman diperiksa (${en.length} EN, ${id.length} ID/akar).`);
console.log(gagal ? `${gagal} pemeriksaan GAGAL\n` : 'Semua pemeriksaan lolos\n');
process.exit(gagal ? 1 : 0);
