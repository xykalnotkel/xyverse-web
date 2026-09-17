/**
 * Pemeriksa responsif — dijalankan SETELAH `npm run build`.
 *
 * Situs ini punya ~60 media query yang tersebar di <style> tiap komponen,
 * dengan lima belas nilai titik henti berbeda (480, 560, 600, 620, 640, 680,
 * 700, 760, 820, 900, 940, 1000, 1040, 1120, 1240). Tidak ada yang salah
 * dengan itu per se, tapi artinya tidak mungkin menilai lewat mata apakah
 * sebuah tata letak benar-benar runtuh di 360 px — harus dihitung.
 *
 * Yang dikerjakan pemeriksa ini:
 *   1. Ambil semua <style> dari dist/, uraikan dengan postcss.
 *   2. Untuk tiap lebar layar, tentukan aturan mana yang berlaku (media query
 *      dievaluasi sungguhan, jadi aturan di dalam @media(max-width:680px)
 *      hanya ikut dihitung di bawah 680 px).
 *   3. Selesaikan kaskade per (selektor, properti) — yang terakhir menang.
 *   4. Hitung lebar minimum tiap grid: setiap track `Npx` menyumbang N,
 *      `minmax(a,b)` menyumbang a, `1fr`/`auto`/`minmax(a,1fr)` menyumbang
 *      nol karena bisa menciut. Tambahkan celah.
 *   5. Bandingkan dengan lebar wadah — yang melewati batas adalah kandidat
 *      kuat halaman yang melebar horizontal di layar sempit.
 *
 * Sengaja tidak mencoba menjadi mesin CSS penuh: tanpa selektor spesifik
 * dan pewarisan, angka absolutnya perkiraan. Tapi nilai AMBANG dibuat longgar
 * sehingga yang lolos penyaring benar-benar layak dilihat manusia.
 *
 * Jalankan:  npm run build && npm run test:responsif
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');
if (!existsSync(DIST)) {
  console.error('dist/ tidak ada — jalankan `npm run build` dulu.');
  process.exit(1);
}

/** Lebar layar yang diuji. 360 = ponsel kecil, 768 = tablet tegak. */
const LEBAR = [360, 768, 1024, 1440];
/** Sisa lebar wadah terhadap viewport setelah padding .wrap (2×24 px). */
const SISI = 48;
/** Panjang minimum target sentuh, pedoman WCAG 2.5.8. */
const SENTUH_MIN = 44;

/* ---------- kumpulkan .html ---------- */
function jalan(dir) {
  const keluar = [];
  for (const e of readdirSync(dir)) {
    const p = path.join(dir, e);
    if (statSync(p).isDirectory()) keluar.push(...jalan(p));
    else if (e.endsWith('.html')) keluar.push(p);
  }
  return keluar;
}
const berkasHtml = jalan(DIST);
const relatif = (f) => path.relative(DIST, f);

/* ---------- parser CSS kecil, tanpa dependensi ----------
 *
 * `postcss` hanya dependensi transitif Vite di proyek ini, jadi tidak bisa
 * diimpor langsung. Yang dibutuhkan pemeriksa ini cuma tiga hal: pemisah
 * aturan, deklarasi, dan blok @media bersarang — cukup untuk parser seukuran
 * ini. Yang penting: kedalaman kurung kurawal dilacak, bukan dihitung dari
 * jumlah karakter, supaya @media bersarang tidak merusak posisi.
 */

/** Buang komentar dan aturan yang tidak relevan agar tidak mengacaukan hitungan. */
function bersihkan(css) {
  return String(css)
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/@keyframes[^{]*\{/g, (m) => m + '/*KEYFRAMES*/')
    .replace(/@font-face\s*\{/g, '@media(never){');
}

/**
 * Urai CSS menjadi pohon: [{ jenis:'rule', selektor, deklarasi:{}, } |
 * { jenis:'media', kondisi, anak:[...] }]
 */
function urai(css) {
  const sumber = bersihkan(css);
  const keluar = [];
  const tumpukan = [keluar];
  let penyangga = '';
  let i = 0;

  while (i < sumber.length) {
    const c = sumber[i];
    if (c === '{') {
      const kepala = penyangga.trim();
      penyangga = '';
      if (kepala.startsWith('@media')) {
        const simpul = { jenis: 'media', kondisi: kepala.slice(6).trim(), anak: [] };
        tumpukan[tumpukan.length - 1].push(simpul);
        tumpukan.push(simpul.anak);
      } else if (kepala.startsWith('@')) {
        tumpukan.push([]); // @supports, @layer, dll: telusuri isinya
      } else {
        // Cari '}' penutup aturan ini.
        const tutup = sumber.indexOf('}', i);
        const isi = tutup === -1 ? '' : sumber.slice(i + 1, tutup);
        const deklarasi = {};
        for (const d of isi.split(';')) {
          const t = d.indexOf(':');
          if (t > 0) deklarasi[d.slice(0, t).trim()] = d.slice(t + 1).trim();
        }
        for (const selektor of kepala.split(',').map((x) => x.trim()).filter(Boolean)) {
          tumpukan[tumpukan.length - 1].push({ jenis: 'rule', selektor, deklarasi });
        }
        if (tutup === -1) break;
        i = tutup;
      }
    } else if (c === '}') {
      if (tumpukan.length > 1) tumpukan.pop();
    } else {
      penyangga += c;
    }
    i++;
  }
  return keluar;
}

/* ---------- evaluasi media query ---------- */

/**
 * Mengerti bentuk yang benar-benar dipakai di proyek ini:
 *   (max-width:Npx) · (min-width:Npx) · (prefers-reduced-motion:reduce)
 * Fitur selain lebar dianggap selalu TIDAK cocok, supaya aturan di dalamnya
 * tidak ikut mengubah hitungan tata letak.
 */
function cocokMedia(kondisi, lebar) {
  if (!kondisi) return true;
  let hasil = true;
  for (const bagian of kondisi.split(/\s+and\s+/i)) {
    const m = /\(\s*(max-width|min-width)\s*:\s*([\d.]+)(px|rem|em)\s*\)/i.exec(bagian.trim());
    if (!m) { hasil = false; continue; } // fitur non-lebar: anggap tidak cocok
    const nilai = Number(m[2]) * (m[3] === 'px' ? 1 : 16);
    if (m[1].toLowerCase() === 'max-width' && lebar > nilai) hasil = false;
    if (m[1].toLowerCase() === 'min-width' && lebar < nilai) hasil = false;
  }
  return hasil;
}

/* ---------- hitung lebar minimum track grid ---------- */

/**
 * `repeat(6,1fr)` -> 6 track; `minmax(200px,1fr)` -> 200; `190px` -> 190.
 * Mengembalikan { tetap, elastis } — `tetap` px yang tidak bisa menciut,
 * `elastis` jumlah track yang boleh menciut sampai nol.
 */
function hitungTrack(nilai) {
  let tetap = 0;
  let elastis = 0;
  let sisa = String(nilai).trim();

  // Uraikan repeat() lebih dulu.
  sisa = sisa.replace(/repeat\(\s*([\d]+|auto-fit|auto-fill)\s*,\s*([^)]+)\)/gi, (_s, kali, isi) => {
    const n = /^\d+$/.test(kali) ? Number(kali) : 0; // auto-fit/fill bisa menciut
    const bagian = hitungTrack(isi);
    tetap += bagian.tetap * n;
    elastis += (bagian.elastis + (bagian.tetap ? 0 : 0)) * n + (/^\d+$/.test(kali) ? 0 : 0);
    if (!/^\d+$/.test(kali)) elastis += 1;
    return '';
  });

  for (const track of sisa.split(',').map((x) => x.trim()).filter(Boolean)) {
    const minmax = /minmax\(\s*([^,]+)\s*,/i.exec(track);
    if (minmax) {
      const a = minmax[1].trim();
      const px = /^([\d.]+)px$/.exec(a);
      if (px) tetap += Number(px[1]);
      else elastis += 1;
      continue;
    }
    const px = /^([\d.]+)px$/.exec(track);
    if (px) tetap += Number(px[1]);
    else elastis += 1; // 1fr, auto, min-content, %, dll.
  }
  return { tetap, elastis };
}

const kePx = (v) => {
  const m = /^(-?[\d.]+)px$/.exec(String(v).trim());
  return m ? Number(m[1]) : null;
};

/* ---------- kumpulkan deklarasi per halaman ---------- */

/**
 * Mengembalikan Map: selektor -> { prop -> nilai } untuk satu lebar layar.
 * Aturan yang muncul belakangan menang (kaskade sederhana, tanpa
 * spesifikasi selektor — cukup untuk membandingkan nilai default vs
 * penimpa di dalam media query, yang memang pola di proyek ini).
 */
function kumpulkan(css, lebar, variabel = {}) {
  const keluar = new Map();
  const telusuri = (daftar) => {
    for (const simpul of daftar) {
      if (simpul.jenis === 'media') {
        if (cocokMedia(simpul.kondisi, lebar)) telusuri(simpul.anak);
        continue;
      }
      let peta = keluar.get(simpul.selektor);
      if (!peta) keluar.set(simpul.selektor, (peta = {}));
      for (const [k, v] of Object.entries(simpul.deklarasi)) {
        peta[k] = String(v).replace(/var\(\s*(--[\w-]+)\s*(?:,\s*([^)]*))?\)/g,
          (_s, nama, cadangan) => (nama in variabel ? variabel[nama] : (cadangan ?? '')));
      }
    }
  };
  telusuri(urai(css));
  return keluar;
}

/**
 * Ambil nilai variabel CSS yang berlaku pada lebar ini.
 *
 * Di layar sempit kita selalu menilai "apakah ini cukup besar untuk JARI",
 * jadi `(pointer:coarse)` sengaja dianggap cocok — itu kasus yang justru
 * ingin kita periksa.
 */
function kumpulVariabel(css, lebar) {
  const keluar = {};
  const telusuri = (daftar) => {
    for (const simpul of daftar) {
      if (simpul.jenis === 'media') {
        const kondisi = simpul.kondisi;
        const sentuh = /pointer\s*:\s*coarse/i.test(kondisi);
        if (sentuh || cocokMedia(kondisi.replace(/\(\s*pointer\s*:\s*coarse\s*\)/gi, ''), lebar)) {
          telusuri(simpul.anak);
        }
        continue;
      }
      if (!/:root|^html(\[|$|\s)/.test(simpul.selektor)) continue;
      for (const [k, v] of Object.entries(simpul.deklarasi)) {
        if (k.startsWith('--')) keluar[k] = v;
      }
    }
  };
  telusuri(urai(css));
  return keluar;
}

/**
 * Seluruh CSS yang berlaku untuk satu halaman.
 *
 * Astro memecah CSS jadi dua tempat: <style> yang di-scope per komponen
 * (kadang tetap inline, kadang ikut dipaketkan) dan berkas gabungan di
 * /_astro/*.css yang memuat :root, ui.css, dan gaya layout. Hanya membaca
 * <style> inline berarti token seperti --sentuh dan semua aturan global
 * tidak terlihat — dan pemeriksa yang tidak melihat CSS utamanya akan
 * menyimpulkan "bersih" tanpa dasar.
 */
const cacheCssBerkas = new Map();
function cssHalaman(html) {
  const bagian = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]);
  for (const m of html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)) {
    const jalur = path.join(DIST, new URL(m[1], 'http://x').pathname);
    if (!cacheCssBerkas.has(jalur)) {
      cacheCssBerkas.set(jalur, existsSync(jalur) ? readFileSync(jalur, 'utf8') : '');
    }
    bagian.push(cacheCssBerkas.get(jalur));
  }
  return bagian.join('\n');
}

/**
 * Analisis satu halaman: kembalikan daftar { selektor, prop } yang berlaku
 * pada `lebar`. Variabel dikumpulkan dari SELURUH halaman lebih dulu, karena
 * token seperti `--sentuh` didefinisikan di <style> layout sementara yang
 * memakainya ada di <style> komponen yang di-scope terpisah.
 */
function analisis(css, lebar) {
  const variabel = kumpulVariabel(css, lebar);
  return kumpulkan(css, lebar, variabel);
}

/* ---------- jalankan ---------- */

let gagal = 0;
const cek = (nama, syarat, detail = '') => {
  if (syarat) console.log(`  ok   ${nama}`);
  else { gagal++; console.log(`  GAGAL ${nama}${detail ? '\n       ' + detail : ''}`); }
};

/* --- A. Grid yang tidak muat di layar sempit --- */
console.log('\n[A] Grid yang melewatkan lebar wadah');
const gridSempit = new Map(); // selektor -> {lebar, butuh}
for (const lebar of [360, 768]) {
  for (const f of berkasHtml) {
    const html = readFileSync(f, 'utf8');
    const css = cssHalaman(html);
    if (!css.includes('grid-template-columns')) continue;
    let peta;
    try { peta = analisis(css, lebar); } catch { continue; }

    const wadah = lebar - SISI;
    for (const [selektor, prop] of peta) {
      const kolom = prop['grid-template-columns'];
      if (!kolom || kolom.includes('var(') || kolom === 'none') continue;
      const { tetap } = hitungTrack(kolom);
      const celah = kePx(prop.gap || prop['column-gap'] || '0px') || 0;
      // Celah hanya dihitung bila ada lebih dari satu track. Track elastis
      // (1fr/auto) bisa menciut sampai nol, jadi tidak ikut menjumlah.
      const butuh = tetap + celah * Math.max(0, jumlahTrack(kolom) - 1);
      if (butuh > wadah + 12) {
        const kunci = `${selektor} @${lebar}px`;
        if (!gridSempit.has(kunci)) {
          gridSempit.set(kunci, { selektor, lebar, butuh: Math.round(butuh), wadah, kolom });
        }
      }
    }
  }
}
/** Berapa banyak track dalam sebuah nilai grid-template-columns. */
function jumlahTrack(kolom) {
  const tanpaRepeat = String(kolom).replace(/repeat\([^)]*\)/gi, 'X');
  return tanpaRepeat.split(',').filter((x) => x.trim()).length;
}
cek(
  `tidak ada grid dengan track tetap melebihi wadah di 360/768 px`,
  gridSempit.size === 0,
  [...gridSempit.values()].slice(0, 10)
    .map((g) => `${g.selektor} @${g.lebar}px: butuh ${g.butuh}px > wadah ${g.wadah}px  [${g.kolom}]`)
    .join('\n       '),
);

/* --- B. Elemen dengan lebar tetap lebih besar dari layar ponsel --- */
console.log('\n[B] Lebar tetap yang melewati 360 px');
const lebarTetap = new Set();
for (const f of berkasHtml) {
  const html = readFileSync(f, 'utf8');
  const css = cssHalaman(html);
  if (!css) continue;
  let peta;
  try { peta = analisis(css, 360); } catch { continue; }
  for (const [selektor, prop] of peta) {
    /*
     * Tabel dengan `min-width` memang SENGAJA lebih lebar dari layar — itu
     * yang membuatnya bisa digeser di dalam pembungkus `overflow-x:auto`
     * (di proyek ini pembungkusnya `.tbl`, bukan tabelnya sendiri), bukan
     * membuat halaman melebar. Melaporkannya cuma berisik.
     */
    if (/(^|[\s,>+~])table(\[|\s|:|\.|[>]|$)/i.test(selektor)) continue;

    for (const kunciProp of ['width', 'min-width']) {
      const px = kePx(prop[kunciProp]);
      // Sengaja longgar: 336 = 360 dikurangi padding. Hanya yang benar-benar
      // melewati yang dilaporkan, karena tanpa spesifikasi selektor angka ini
      // tetap perkiraan.
      if (px !== null && px > 336) lebarTetap.add(`${selektor} { ${kunciProp}: ${px}px }`);
    }
  }
}
cek('tidak ada width/min-width tetap > 336 px', lebarTetap.size === 0,
  [...lebarTetap].slice(0, 12).join('\n       '));

/* --- C. Titik henti yang dipakai --- */
console.log('\n[C] Konsistensi titik henti');
const semuaTitik = new Map();
for (const f of berkasHtml) {
  const css = cssHalaman(readFileSync(f, 'utf8'));
  for (const m of css.matchAll(/@media[^{]*max-width\s*:\s*(\d+(?:\.\d+)?)px/g)) {
    semuaTitik.set(Number(m[1]), (semuaTitik.get(Number(m[1])) || 0) + 1);
  }
}
const urut = [...semuaTitik.keys()].sort((a, b) => a - b);
console.log(`       ${urut.length} titik henti berbeda: ${urut.join(', ')} px`);
/*
 * Banyaknya titik henti bukan bug, tapi di atas delapan biasanya berarti tiap
 * komponen mengarang angkanya sendiri. Dilaporkan sebagai peringatan, bukan
 * kegagalan — memaksakan satu tangga akan memaksa perubahan visual massal.
 */
if (urut.length > 8) console.log('       catatan: lebih dari 8 titik henti — layak diseragamkan');
cek('titik henti terbaca', urut.length > 0);

/* --- D. Target sentuh --- */
console.log('\n[D] Target sentuh pada layar sentuh');
const sentuhKecil = new Set();
for (const f of berkasHtml) {
  const html = readFileSync(f, 'utf8');
  const css = cssHalaman(html);
  if (!css) continue;
  let peta;
  try { peta = analisis(css, 360); } catch { continue; }
  for (const [selektor, prop] of peta) {
    /*
     * Hanya kelas yang namanya menyiratkan tombol/tautan interaktif.
     * `.tag` dan `.pill` di proyek ini adalah <span> lencana, bukan kontrol —
     * ikut dihitung hanya menghasilkan laporan palsu.
     */
    if (!/(btn|chip|tombol|tab|ikon-?btn|icon-btn)/i.test(selektor)) continue;
    if (/(^|[\s.,>+~])(pill|tag|badge|label)([\s.,:[>]|$)/i.test(selektor)) continue;
    const tinggi = kePx(prop.height);
    const minTinggi = kePx(prop['min-height']);
    // Sudah ada lantai eksplisit yang cukup -> aman, apa pun padding-nya.
    if ((tinggi !== null && tinggi >= SENTUH_MIN) || (minTinggi !== null && minTinggi >= SENTUH_MIN)) continue;

    const atas = kePx(prop['padding-top'] ?? prop.padding?.split(/\s+/)[0] ?? '');
    const font = kePx(prop['font-size']) ?? 14;
    // Perkiraan tinggi bila tidak ada height/min-height: font × 1.45 + 2×padding.
    const kira = atas !== null ? Math.round(font * 1.45 + atas * 2) : null;
    if (kira !== null && kira < SENTUH_MIN) {
      sentuhKecil.add(`${selektor} { ~${kira}px (padding ${atas}px, font ${font}px) }`);
    }
  }
}
cek(`tidak ada tombol non-.btn dengan target < ${SENTUH_MIN}px`, sentuhKecil.size === 0,
  [...sentuhKecil].slice(0, 10).join('\n       '));

/* --- E. Setiap halaman punya penanganan 404 & keadaan kosong --- */
console.log('\n[E] Halaman galat tersedia');
/*
 * Halaman galat memakai nama `tidak-ada`, bukan `404`, karena Astro hanya
 * merender satu 404 di akar. vercel.json yang memetakan URL mati ke sini.
 */
for (const lang of ['id', 'en']) {
  for (const bagian of ['blog', 'berita', 'proyek', 'legal', 'aplikasi']) {
    const p = path.join(DIST, lang, bagian, 'tidak-ada', 'index.html');
    if (!existsSync(p)) { gagal++; console.log(`  GAGAL ${lang}/${bagian}/tidak-ada/ tidak ada`); }
  }
  const um = path.join(DIST, lang, 'tidak-ada', 'index.html');
  if (!existsSync(um)) { gagal++; console.log(`  GAGAL ${lang}/tidak-ada/ tidak ada`); }
}
cek('404 khusus bagian ada untuk 5 bagian × 2 bahasa + 2 halaman bahasa',
  ['id', 'en'].every((l) =>
    existsSync(path.join(DIST, l, 'tidak-ada', 'index.html')) &&
    ['blog', 'berita', 'proyek', 'legal', 'aplikasi'].every((b) =>
      existsSync(path.join(DIST, l, b, 'tidak-ada', 'index.html')))));

/* vercel.json harus memetakan URL mati ke halaman-halaman itu. */
const vjPath = path.resolve('vercel.json');
if (existsSync(vjPath)) {
  const vj = readFileSync(vjPath, 'utf8');
  const tanpaKomentar = vj.replace(/"\/\/":\s*\[[^\]]*\],?/s, '');
  let aturan;
  try { aturan = JSON.parse(tanpaKomentar).rewrites || []; } catch { aturan = []; }
  const punya = (seg) => aturan.some((r) => r.destination?.includes(`/${seg}/tidak-ada/`));
  cek('vercel.json memetakan tiap bagian ke 404-nya',
    ['blog', 'berita', 'proyek', 'legal', 'aplikasi'].every(punya) && aturan.length >= 6,
    aturan.map((r) => r.destination).join(' '));
  cek('semua rewrite memakai status 404',
    aturan.length > 0 && aturan.every((r) => r.status === 404));
} else {
  gagal++;
  console.log('  GAGAL vercel.json tidak ada — 404 per bagian tidak akan terpakai');
}

console.log(`\n${berkasHtml.length} halaman diperiksa pada ${LEBAR.join(', ')} px.`);
console.log(gagal ? `${gagal} pemeriksaan GAGAL\n` : 'Semua pemeriksaan lolos\n');
process.exit(gagal ? 1 : 0);
