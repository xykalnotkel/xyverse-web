import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SEMUA_LANG, rute, type Lang } from '../i18n/config';
import { slugKonten, filterLang } from '../i18n/data';

/**
 * Indeks pencarian — dibangun saat build, dicari di peramban.
 *
 * Situs ini 86 halaman statis tanpa backend, jadi pilihan realistisnya dua:
 * layanan pencarian pihak ketiga (menambah permintaan jaringan, biaya, dan
 * pihak yang melihat kueri pengguna), atau indeks JSON yang diunduh sekali
 * lalu dicari secara lokal. Yang kedua dipilih: seluruh korpus ini — judul,
 * deskripsi, kategori, dan tag — cukup kecil untuk sekali unduh, dan
 * hasilnya tetap jalan saat jaringan buruk.
 *
 * Yang SENGAJA tidak disertakan: isi penuh artikel. Itu akan membuat berkas
 * ini ratusan KB dan keuntungan akurasinya kecil untuk penelusuran judul.
 *
 * Bentuk: { id: [ {u,j,d,t,k,g} ], en: [ … ] } — kunci pendek karena berkas
 * ini diunduh di setiap halaman yang membuka kotak pencarian.
 */

export function getStaticPaths() {
  return [{ params: {} }];
}

const JENIS: Record<string, Record<Lang, string>> = {
  blog: { id: 'Blog', en: 'Blog' },
  berita: { id: 'Berita', en: 'News' },
  proyek: { id: 'Proyek', en: 'Project' },
  legal: { id: 'Legal', en: 'Legal' },
};

export const GET: APIRoute = async () => {
  const keluar: Record<string, unknown[]> = {};

  for (const lang of SEMUA_LANG) {
    const baris: unknown[] = [];
    const koleksi = await Promise.all([
      getCollection('blog', filterLang(lang)),
      getCollection('berita', filterLang(lang)),
      getCollection('proyek', filterLang(lang)),
      getCollection('legal', filterLang(lang)),
    ]);
    const nama = ['blog', 'berita', 'proyek', 'legal'] as const;

    nama.forEach((col, i) => {
      for (const p of koleksi[i]) {
        baris.push({
          u: rute(lang, `${col}/${slugKonten(p.id)}`),
          j: p.data.title,
          d: p.data.desc,
          t: JENIS[col][lang],
          // Kategori/layanan + tag digabung jadi satu daftar kata kunci.
          k: [
            (p.data as any).kategori,
            (p.data as any).tag,
            (p.data as any).layanan,
            ...((p.data as any).tags || []),
          ].filter(Boolean),
          g: (p.data as any).gambar || null,
          w: (p.data as any).date ? new Date((p.data as any).date).toISOString().slice(0, 10) : null,
        });
      }
    });

    keluar[lang] = baris.sort((a: any, b: any) => String(b.w).localeCompare(String(a.w)));
  }

  return new Response(JSON.stringify(keluar), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
};
