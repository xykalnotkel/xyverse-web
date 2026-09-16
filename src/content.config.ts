import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    desc: z.string(),
    date: z.coerce.date(),
    kategori: z.string().default('Umum'),
    penulis: z.string().default('Tim Xyverse'),
    baca: z.number().default(5),
    unggulan: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const proyek = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/proyek' }),
  schema: z.object({
    title: z.string(),
    desc: z.string(),
    date: z.coerce.date(),
    klien: z.string(),
    layanan: z.string(),
    stack: z.array(z.string()).default([]),
    status: z.enum(['Selesai', 'Berjalan', 'Maintenance']).default('Selesai'),
    unggulan: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const berita = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/berita' }),
  schema: z.object({
    title: z.string(),
    desc: z.string(),
    date: z.coerce.date(),
    tag: z.string().default('Pengumuman'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, proyek, berita };
