/**
 * Konfigurasi bahasa situs.
 * Setiap rute berprefiks: /id/... dan /en/...
 * Akar (/) mengalihkan sesuai bahasa peramban.
 */
export const BAHASA = {
  id: { kode: 'id', label: 'Indonesia', pendek: 'ID', htmlLang: 'id-ID', ogLocale: 'id_ID', bendera: '🇮🇩' },
  en: { kode: 'en', label: 'English',   pendek: 'EN', htmlLang: 'en-US', ogLocale: 'en_US', bendera: '🇺🇸' },
} as const;

export type Lang = keyof typeof BAHASA;

export const SEMUA_LANG = Object.keys(BAHASA) as Lang[];
export const LANG_BAWAAN: Lang = 'id';

/** Ambil kode bahasa dari sebuah pathname. */
export function langDariPath(pathname: string): Lang {
  const seg = pathname.split('/').filter(Boolean)[0];
  return (SEMUA_LANG as string[]).includes(seg) ? (seg as Lang) : LANG_BAWAAN;
}

/** Buang prefiks bahasa dari pathname, sisakan rute murni tanpa slash depan. */
export function tanpaPrefiks(pathname: string): string {
  const bagian = pathname.split('/').filter(Boolean);
  if ((SEMUA_LANG as string[]).includes(bagian[0])) bagian.shift();
  return bagian.join('/');
}

/** Bangun URL berprefiks bahasa. rute('en', 'harga') -> '/en/harga/' */
export function rute(lang: Lang, jalur = ''): string {
  const bersih = jalur.replace(/^\/+|\/+$/g, '');
  if (!bersih) return `/${lang}/`;
  if (bersih.startsWith('#')) return `/${lang}/${bersih}`;
  return `/${lang}/${bersih}/`;
}

/** Untuk getStaticPaths pada halaman yang sama di semua bahasa. */
export function jalurBahasa() {
  return SEMUA_LANG.map((lang) => ({ params: { lang }, props: { lang } }));
}
