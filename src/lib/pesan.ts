/**
 * Form kontak situs → API admin.
 *
 * Sebelumnya kedua form memakai `action="mailto:"`. Itu membuka aplikasi
 * email pengguna: di ponsel sering tidak ada yang terdaftar, di webmail
 * tidak jalan sama sekali, dan gagalnya tanpa pesan. kontak.astro bahkan
 * menampilkan "✓ Terima kasih! Aplikasi email lu akan terbuka" setelah
 * jeda buatan 420 ms — jadi pesannya berbunyi sukses padahal tidak ada
 * jaminan apa pun yang terkirim.
 *
 * Sekarang form mengirim ke `POST /api/pesan` di API admin, yang meneruskan
 * ke Resend. Endpoint-nya publik dan dijaga di sisi server (honeypot, batas
 * laju per IP, batas panjang bidang) — lihat xyverse-admin/server/surat.js.
 */

const ASAL =
  import.meta.env.PUBLIC_API_URL ??
  (import.meta.env.DEV ? 'http://127.0.0.1:4500' : 'https://admin.xyverse.my.id');

export const URL_PESAN = `${ASAL.replace(/\/$/, '')}/api/pesan`;

/**
 * Nama kolom honeypot. Harus SAMA dengan yang dibaca server.
 *
 * Kolomnya ada di HTML dan bisa diisi — yang membuatnya tidak terlihat oleh
 * manusia adalah CSS (bukan `type="hidden"`, yang justru dihindari sebagian
 * bot). Manusia tidak pernah mengisinya; bot yang mengisi semua input akan
 * mengisinya, dan server membuang pesan itu diam-diam.
 */
export const HONEYPOT = 'situs_web';

export type HasilKirim =
  | { ok: true }
  | { ok: false; galat: string; status?: number };

/**
 * Kirim isi form. Tidak pernah melempar — kegagalan jaringan dikembalikan
 * sebagai nilai supaya pemanggil bisa menampilkannya sebagai keadaan galat,
 * bukan membuat halaman error.
 */
export async function kirimPesan(isi: Record<string, unknown>): Promise<HasilKirim> {
  try {
    const jawab = await fetch(URL_PESAN, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(isi),
    });

    if (jawab.status === 429) {
      return { ok: false, galat: 'terlaluSering', status: 429 };
    }

    const data = await jawab.json().catch(() => ({}));

    if (!jawab.ok) {
      // Pesan dari server sudah dalam bahasa yang dibaca pengguna.
      return { ok: false, galat: data?.error || 'gagal', status: jawab.status };
    }
    return { ok: true };
  } catch {
    // Jaringan putus, DNS gagal, endpoint belum di-deploy — semuanya ke sini.
    return { ok: false, galat: 'jaringan' };
  }
}

/** Kumpulkan nilai form jadi objek siap kirim, termasuk honeypot. */
export function isiForm(form: HTMLFormElement): Record<string, unknown> {
  const d = new FormData(form);
  const keluar: Record<string, unknown> = {};
  d.forEach((nilai, kunci) => {
    if (typeof nilai === 'string') keluar[kunci] = nilai;
  });
  return keluar;
}
