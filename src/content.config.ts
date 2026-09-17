import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Field yang sama untuk setiap koleksi konten.
 *
 * `gambar` adalah sampul: jalur relatif seperti `/media/20260917-ab12-foto.webp`
 * yang diunggah dari dashboard. `og` memaksa gambar Open Graph sendiri bila
 * sampulnya tidak layak jadi pratinjau. `diperbarui` memisahkan waktu terbit
 * dari waktu suntingan terakhir — tanpa ini JSON-LD harus mengaku
 * `dateModified` sama dengan `datePublished` selamanya.
 */
const fieldBersama = {
  title: z.string(),
  desc: z.string(),
  date: z.coerce.date(),
  diperbarui: z.coerce.date().optional(),
  gambar: z.string().optional(),
  og: z.string().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  lang: z.enum(['id', 'en']).default('id'),
};

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    ...fieldBersama,
    kategori: z.string().default('Umum'),
    penulis: z.string().default('Tim Xyverse'),
    baca: z.number().default(5),
    unggulan: z.boolean().default(false),
  }),
});

const proyek = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/proyek' }),
  schema: z.object({
    ...fieldBersama,
    klien: z.string(),
    layanan: z.string(),
    stack: z.array(z.string()).default([]),
    status: z.string().default('Selesai'),
    unggulan: z.boolean().default(false),
  }),
});

const berita = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/berita' }),
  schema: z.object({
    ...fieldBersama,
    tag: z.string().default('Pengumuman'),
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    desc: z.string(),
    // `diperbarui` di legal adalah teks tampilan ("17 September 2026"), bukan
    // tanggal — sengaja tidak ikut fieldBersama.
    diperbarui: z.string(),
    ringkas: z.string().optional(),
    lang: z.enum(['id', 'en']).default('id'),
  }),
});

export const collections = { blog, proyek, berita, legal };
