# Xyverse — Situs Resmi

Situs perusahaan Xyverse: sewa Cloud PC, produksi aplikasi & software, dan tools digital.
Dibangun dengan **Astro 7 / Node 24** (static output), tanpa framework UI tambahan.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # hasil ke dist/
npm run preview
npm test         # periksa hasil build (butuh dist/, jadi build dulu)
npm run check    # build + test sekaligus
```

---

## Struktur

```
src/
├─ data/site.ts            # SUMBER KEBENARAN: SITE, SOSMED, APLIKASI, TIM, NILAI, LEGAL_NAV
├─ lib/og.ts               # generator gambar Open Graph (SVG murni)
├─ layouts/
│  ├─ Base.astro           # SEO, OG/Twitter, JSON-LD, tema, Nav + Footer
│  └─ Legal.astro          # kerangka dokumen legal (sidebar + TOC + ringkasan)
├─ components/
│  ├─ Nav.astro            # navigasi utama + burger + pengalih tema
│  ├─ Footer.astro         # pembatas SVG morphing + 5 kolom
│  ├─ SosmedIkon.astro     # 8 ikon media sosial inline
│  ├─ Bagikan.astro        # tombol bagikan 7 platform + salin + Web Share API
│  ├─ Daftar.astro         # daftar isi artikel + penyorotan scroll
│  ├─ Progres.astro        # bilah kemajuan baca + tombol ke atas
│  ├─ PageHead.astro       # kepala halaman standar
│  └─ Prose.astro          # gaya tipografi konten markdown
├─ content/                # koleksi blog, berita, proyek (markdown)
└─ pages/
   ├─ index, cloud-pc, harga, kontak, tentang, 404
   ├─ aplikasi/            # index + [slug] (XyDesk, XyCloudStore)
   ├─ legal/               # index + 9 dokumen
   ├─ blog|berita|proyek/  # index + [...id]
   ├─ og/[...slug].svg.ts  # 32 gambar OG statis, satu per halaman
   └─ rss.xml.ts
public/
├─ robots.txt
├─ manifest.webmanifest
├─ .well-known/security.txt
└─ brand/
```

---

## SEO

| Komponen | Status |
|---|---|
| `site` URL + canonical per halaman | ✅ |
| Sitemap (`/sitemap-index.xml`) dengan tangga prioritas | ✅ |
| `robots.txt` — izinkan mesin pencari & bot pratinjau, blokir 7 perayap AI | ✅ |
| Open Graph + Twitter Card lengkap | ✅ |
| Gambar OG unik per halaman (32 berkas) | ✅ |
| JSON-LD: Organization, WebSite, BlogPosting, NewsArticle, SoftwareApplication, FAQPage, BreadcrumbList, AboutPage | ✅ |
| RSS (`/rss.xml`) gabungan blog + berita | ✅ |
| PWA manifest + `security.txt` | ✅ |
| Halaman 404 kustom (noindex) | ✅ |

**Prioritas sitemap:** `/` = 1.0 · cloud-pc/harga/aplikasi = 0.9 · indeks koleksi = 0.8 ·
legal = 0.3 · sisanya = 0.6. Rute `/404` dan `/og/*` dikecualikan.

### Gambar OG

Dibuat dari SVG murni di `src/lib/og.ts` — tanpa Satori, Resvg, atau font binary.
Setiap halaman memperoleh berkas sendiri di `/og/<slug>.svg`, dengan slug diturunkan
otomatis dari path oleh `Base.astro` (mis. `/blog/parsec-vs-rdp/` → `/og/blog-parsec-vs-rdp.svg`).

Nama berkasnya dibangun oleh **satu** fungsi, `jalurOG()` di `src/lib/og.ts`.
`Base.astro` (og:image / twitter:image), halaman artikel (JSON-LD `image`), dan
`og/[...slug].svg.ts` semuanya memanggilnya — supaya tidak ada lagi meta yang
menunjuk berkas OG yang tidak ikut ter-build.

Menambah halaman baru? Daftarkan slug-nya di `getStaticPaths()` pada
`src/pages/og/[...slug].svg.ts`. Konten koleksi terdaftar otomatis.

### Uji hasil build

```bash
npm run check
```

`scripts/uji-build.mjs` memindai `dist/` dan menuntut lima hal:

| # | Yang dituntut |
|---|---|
| 1 | Tidak ada string UI Indonesia di halaman `/en/` |
| 2 | `inLanguage` JSON-LD cocok dengan bahasa halaman |
| 3 | Setiap `og:image` / `twitter:image` menunjuk berkas yang benar-benar ada |
| 4 | Tidak ada tautan berprefiks bahasa ganda (`/en/blog/en/…`) |
| 5 | Setiap artikel punya gambar OG di kedua bahasa |

Terhadap kode sebelum perbaikan i18n, pemeriksaan 1–4 gagal. Jadi pengujian ini
memang menangkap regresi tersebut, bukan sekadar lulus karena kebetulan.

---

## Fitur artikel

Berlaku pada blog, berita, dan proyek:

- Bilah kemajuan baca + tombol kembali ke atas
- Daftar isi otomatis dengan penyorotan bagian aktif saat menggulir
- Berbagi ke WhatsApp, X, Facebook, LinkedIn, Telegram, Reddit, Email
- Salin tautan + Web Share API asli di perangkat yang mendukung
- Artikel terkait (prioritas kategori sama) dan navigasi sebelumnya/berikutnya
- Remah roti + JSON-LD BreadcrumbList
- Gambar OG unik per artikel

---

## Dokumen legal

Sembilan dokumen di `/legal`, masing-masing dengan ringkasan "Ringkasnya" di atas:

Syarat Layanan · Kebijakan Privasi (mengacu UU PDP No. 27/2022) · Kebijakan Cookie ·
Kebijakan Penggunaan yang Wajar · Kebijakan Pengembalian Dana · SLA (uptime 99,9% + tabel
kredit) · Lisensi · DMCA & Hak Cipta · Kebijakan Keamanan (termasuk pelabuhan aman peneliti).

> Dokumen ini template yang sudah disesuaikan konteks Xyverse, bukan nasihat hukum.
> Tinjau bersama penasihat hukum sebelum dipublikasikan.

---

## Aplikasi

**XyDesk** — klien remote desktop (Windows, macOS, Linux, Android, iOS).
**XyCloudStore** — pengelolaan instance & katalog aplikasi (Web, Android, iOS).

Keduanya didefinisikan di `src/data/site.ts` dan dirender oleh
`src/pages/aplikasi/[slug].astro` lengkap dengan fitur, opsi unduh, FAQ, dan JSON-LD.

---

## Pembatas footer morphing

`Footer.astro` memakai dua `<path>` SVG yang di-morph lewat SMIL `animate` pada atribut `d`,
dengan lapisan glow buram, simpul cahaya `animateMotion`, dan tanda pusat yang berputar.
Seluruh animasi dimatikan pada `prefers-reduced-motion: reduce`.

---

## Mengubah konten

Hampir semua teks lintas halaman berasal dari `src/data/site.ts` — email, alamat, media
sosial, daftar aplikasi, anggota tim, dan navigasi legal. Ubah di satu tempat, seluruh situs
ikut menyesuaikan.

## Internasionalisasi (i18n)

Situs berjalan dua bahasa: **Indonesia (`id`, bawaan)** dan **Inggris (`en`)**.
Setiap rute diberi prefiks bahasa — `/id/harga/`, `/en/harga/` — dan `/` adalah
shim yang mengalihkan sesuai `localStorage['xy-lang']` lalu `navigator.language`.

### Struktur

| Berkas | Isi |
|---|---|
| `src/i18n/config.ts` | Daftar bahasa, `rute()`, `jalurBahasa()`, helper path |
| `src/i18n/ui.ts` | String antarmuka bersama (nav, sheet, footer, umum) |
| `src/i18n/data.ts` | Data terterjemah: alamat, aplikasi, tim, nilai, slug sumber & legal, `filterLang()` |
| `src/i18n/halaman/*.ts` | Satu kamus per halaman: `export const X: Record<Lang, any>` |
| `src/content/<koleksi>/en/*.md` | Terjemahan konten; dibedakan lewat frontmatter `lang` |

### Menambah halaman baru

1. Buat `src/pages/[lang]/nama.astro` dengan boilerplate:
   `export function getStaticPaths() { return jalurBahasa(); }` +
   `const { lang } = Astro.props; const r = (p = '') => rute(lang, p);`
2. Buat `src/i18n/halaman/nama.ts` berisi kunci `id` dan `en` yang paralel.
3. Semua tautan internal wajib lewat `r('tujuan')`, jangan `href="/tujuan"`.
4. Teruskan `lang={lang}` ke `<Base>` / `<Legal>`.

### Menambah artikel dua bahasa

Tulis `src/content/blog/slug.md` (ID) dan `src/content/blog/en/slug.md`
dengan `lang: "en"`. Slug URL sama di kedua bahasa; awalan `en/` dilucuti
oleh `slugKonten()`.

### SEO per bahasa

- `hreflang` `id-ID` / `en-US` / `x-default` pada setiap halaman
- `og:locale` + `og:locale:alternate`, gambar OG terpisah `og/<lang>-<slug>.svg`
- Sitemap memakai opsi `i18n` @astrojs/sitemap sehingga tiap URL membawa alternatnya
- Umpan RSS terpisah: `/id/rss.xml` dan `/en/rss.xml` (`/rss.xml` mengalihkan ke ID)
- Halaman `404` tunggal yang menerjemahkan dirinya sendiri di sisi klien

### Dokumen legal

Sembilan dokumen kini hidup sebagai koleksi konten di `src/content/legal/`
(ID) dan `src/content/legal/en/`, dirender oleh `src/pages/[lang]/legal/[slug].astro`.
Sebelumnya isinya ditulis sebagai markdown di dalam `.astro` sehingga **tidak pernah
dirender** — perbaikan itu termasuk dalam perubahan ini.

### Domain produksi dan Vercel

- Alamat utama: `https://www.xyverse.my.id`.
- Di Vercel, `xyverse.my.id` diarahkan dengan 308 ke `www.xyverse.my.id`.
- `PUBLIC_SITE_URL=https://www.xyverse.my.id` dipakai HTML, sitemap, RSS,
  robots.txt, dan security.txt. Perubahan env membutuhkan deploy baru.
- `PUBLIC_API_URL=https://admin.xyverse.my.id` menunjuk API form kontak.
- Cloudflare memakai record CNAME **DNS only** sesuai rekomendasi domain
  masing-masing proyek Vercel; apex di-flatten oleh Cloudflare.
- `vercel.json` memakai `routes`: periksa filesystem dahulu, baru fallback
  404 per bagian/bahasa. `status` didukung di `routes`, bukan `rewrites`.
  Jangan memasukkan properti komentar `//` ke JSON konfigurasi Vercel.
- `npm test` memeriksa build dan regresi aturan fallback; `npm run
  test:responsif` memeriksa CSS dan ketersediaan halaman galat.

Uji interaksi form di Chromium (API di-mock, tidak mengirim email):

```sh
npx playwright install --with-deps chromium
npm run build
# Terminal lain: npm run preview -- --port 4321
BASE_URL=http://127.0.0.1:4321 npm run test:browser
```

Uji ini mencakup beranda dan kontak ID/EN: validasi, POST sukses, galat
layanan, jaringan putus, serta pemulihan tombol kirim. Impor fungsi yang
berjalan di browser harus berada di blok `<script>`, bukan frontmatter Astro.

### Pengaturan publik & permintaan paket

`src/data/settings.json` dikelola owner dari dashboard. Kontak sementara memakai
Gmail; WA kosong berarti kartu WA disembunyikan. Sosial hanya menampilkan akun
terverifikasi yang dicantumkan. Harga tiga paket mengikuti setting ID/EN.

Tombol paket membawa parameter `paket` ke /id/kontak atau /en/kontak. Form menjelaskan
bahwa stok, penawaran, pembayaran, dan aktivasi dikonfirmasi tim; bukan checkout.
Permintaan disimpan di inbox privat admin sebelum notifikasi email dikirim.

Runtime build kini Node.js 24 dan Astro 7.3.3. Plugin markdown tetap memakai
`@astrojs/markdown-remark` untuk mempertahankan pengolahan gambar dan kontak.
Pemeriksa responsif memahami output CSS media range (`width<=…`) dari compiler baru.


## Navigasi mobile & atmosfer beranda

- `Nav.astro`: modal `<dialog>` fullscreen di luar sticky header. Header/tombol tutup
  dan footer tetap terlihat; daftar menu punya scroll sendiri. Fokus terkurung di modal,
  Escape/tutup/link/resize desktop membuka kembali scroll halaman. Safe area + `100dvh`.
- `HeroAtmosphere.astro`: radial gradient + grid statis. Hanya transform/opacity yang
  dianimasikan; tanpa video/canvas/dependensi animasi. Mobile satu lapisan bergerak.
  Pause saat offscreen/tab tersembunyi/menu terbuka; reduced-motion dan save-data mematikan gerak.
- Ilustrasi WebP 480/800/lebar asli dipilih browser sesuai ukuran layar + DPR. Artwork
  bertema memakai lazy loading agar versi tema tersembunyi tidak ikut diunduh. Pada mobile,
  teks dan CTA beranda/Cloud PC tampil sebelum ilustrasi; form kontak sebelum info/ilustrasi.

Uji browser (serve `dist/` terlebih dahulu, `BASE_URL` bisa diganti):

```bash
npm run build
# Terminal lain: npm run preview -- --port 4321
BASE_URL=http://127.0.0.1:4321 npm run test:mobile
```

Suite Chromium memeriksa fullscreen, fokus, scroll, anchor, bahasa, desktop resize,
320–1000px + landscape, reduced motion, save-data, pause offscreen, serta gambar tema
tersembunyi tidak diunduh. Suite tidak mengirim email atau mengubah produksi.


## Form tenang & motion UI

- Semua `[hidden]` (kecuali `until-found`) dipastikan `display:none!important`.
  Ini mencegah `.alert`/`.f-msg` yang memakai flex menampilkan notif sebelum interaksi.
- `src/lib/form-kontak.ts` menyatukan alur kedua form: initial state bersih, untouched
  blur tidak memunculkan error, error inline setelah interaksi/submit, tanpa banner
  validasi duplikat. Satu status server saja; guard double submit dan `aria-busy`.
  Sukses hanya setelah respons API; gagal mempertahankan isian. Koreksi mengetik
  menghapus error lama. Dropdown kembali ke kondisi awal sesudah sukses.
- `src/lib/motion.ts` memakai Web Animations API bawaan untuk accordion 260ms yang
  bisa dibalik di tengah animasi. Menu punya entrance bertahap dan exit 160ms;
  link/resize tetap menutup langsung supaya anchor/scroll tidak terganggu.
- Reveal offscreen 480ms; konten tetap terlihat tanpa JS. Hover/press ringan;
  reduced-motion menonaktifkan gerak tambahan. Tidak ada dependensi baru.

Sesudah build + serve: `npm run test:browser` menguji **visibilitas yang dirender**
(bukan hanya properti hidden), ID/EN × kedua form × light/dark, initial/untouched,
validasi, pending, double-submit, success, 429, API/network error, dan first paint
non-JS. Semua request pengiriman dicegat mock. `npm run test:motion` memeriksa
ukuran antara, pembalikan/klik cepat, FAQ/menu, exit dan reduced motion.
