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
    lang: z.enum(['id', 'en']).default('id'),
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
    status: z.string().default('Selesai'),
    unggulan: z.boolean().default(false),
    draft: z.boolean().default(false),
    lang: z.enum(['id', 'en']).default('id'),
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
    lang: z.enum(['id', 'en']).default('id'),
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    desc: z.string(),
    diperbarui: z.string(),
    ringkas: z.string().optional(),
    lang: z.enum(['id', 'en']).default('id'),
  }),
});

export const collections = { blog, proyek, berita, legal };
