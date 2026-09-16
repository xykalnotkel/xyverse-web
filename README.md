# Xyverse — Situs Resmi

Situs perusahaan Xyverse: sewa Cloud PC, produksi aplikasi & software, dan tools digital.
Dibangun dengan **Astro 5** (static output), tanpa framework UI tambahan.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # hasil ke dist/
npm run preview
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

Menambah halaman baru? Daftarkan slug-nya di `getStaticPaths()` pada
`src/pages/og/[...slug].svg.ts`. Konten koleksi terdaftar otomatis.

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
