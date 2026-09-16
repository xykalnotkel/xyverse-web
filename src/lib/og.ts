/** Pembuat gambar Open Graph berbasis SVG murni — dipakai oleh /og/[...slug].svg */

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function bungkus(teks: string, maksKar: number, maksBaris: number) {
  const kata = teks.split(/\s+/).filter(Boolean);
  const baris: string[] = [];
  let kini = '';
  for (const k of kata) {
    if (!kini) kini = k;
    else if ((kini + ' ' + k).length <= maksKar) kini += ' ' + k;
    else {
      baris.push(kini);
      kini = k;
      if (baris.length === maksBaris) break;
    }
  }
  if (kini && baris.length < maksBaris) baris.push(kini);
  const terpakai = baris.join(' ').length;
  if (baris.length === maksBaris && terpakai < kata.join(' ').length) {
    baris[maksBaris - 1] = baris[maksBaris - 1].replace(/\s*\S{0,3}$/, '…');
  }
  return baris;
}

export function buatOG(judul: string, tag = '') {
  const j = (judul || 'Cloud PC, Apps & Software').trim().slice(0, 130);
  const t = tag.trim().slice(0, 28);

  const baris = bungkus(j, 26, 3);
  const ukuran = baris.length >= 3 ? 60 : baris.length === 2 ? 70 : 78;
  const tinggiBlok = (baris.length - 1) * (ukuran * 1.16);
  const mulaiY = 330 - tinggiBlok / 2 + ukuran * 0.34;
  const lebarTag = Math.max(88, t.length * 11.5 + 34);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" font-family="Segoe UI, Roboto, Helvetica, Arial, sans-serif">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0812"/><stop offset="55%" stop-color="#140f28"/><stop offset="100%" stop-color="#1d1040"/>
    </linearGradient>
    <radialGradient id="gl" cx="18%" cy="8%" r="68%">
      <stop offset="0%" stop-color="#8b5cf6" stop-opacity=".5"/><stop offset="100%" stop-color="#8b5cf6" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="gl2" cx="92%" cy="96%" r="55%">
      <stop offset="0%" stop-color="#a78bfa" stop-opacity=".34"/><stop offset="100%" stop-color="#a78bfa" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="wv" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#7c3aed" stop-opacity="0"/>
      <stop offset="50%" stop-color="#a78bfa" stop-opacity=".9"/>
      <stop offset="100%" stop-color="#7c3aed" stop-opacity="0"/>
    </linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0v48" fill="none" stroke="#8b5cf6" stroke-opacity=".07" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#gl)"/>
  <rect width="1200" height="630" fill="url(#gl2)"/>

  <path d="M0,470 C180,420 300,530 470,480 C640,430 760,540 930,485 C1060,443 1140,470 1200,478"
        fill="none" stroke="url(#wv)" stroke-width="2.4" opacity=".85"/>
  <path d="M0,506 C200,548 320,462 520,504 C720,546 840,460 1040,502 C1130,520 1170,508 1200,504"
        fill="none" stroke="url(#wv)" stroke-width="1.4" opacity=".5"/>

  <g transform="translate(80,70)">
    <rect width="54" height="54" rx="15" fill="#8b5cf6"/>
    <text x="27" y="37" font-size="26" font-weight="700" fill="#fff" text-anchor="middle">XY</text>
    <text x="72" y="25" font-size="20" font-weight="700" fill="#f2f0f8" letter-spacing="4.5">XYVERSE</text>
    <text x="73" y="46" font-size="14" fill="#a29ebb">Cloud PC · Apps · Software</text>
  </g>

  ${t ? `<g transform="translate(80,162)">
    <rect width="${lebarTag}" height="36" rx="10" fill="#8b5cf6" fill-opacity=".18" stroke="#8b5cf6" stroke-opacity=".45"/>
    <text x="${lebarTag / 2}" y="24" font-size="15" font-weight="600" fill="#c4b5fd" text-anchor="middle">${esc(t)}</text>
  </g>` : ''}

  <g fill="#ffffff" font-weight="700" letter-spacing="-1.8">
    ${baris.map((b, i) => `<text x="80" y="${(mulaiY + i * ukuran * 1.16).toFixed(1)}" font-size="${ukuran}">${esc(b)}</text>`).join('\n    ')}
  </g>

  <text x="80" y="562" font-size="21" fill="#a29ebb">xyverse.my.id</text>
  <g transform="translate(1046,528)">
    <circle r="30" cx="30" cy="30" fill="#8b5cf6" fill-opacity=".14" stroke="#8b5cf6" stroke-opacity=".4"/>
    <text x="30" y="38" font-size="21" font-weight="700" fill="#c4b5fd" text-anchor="middle">XY</text>
  </g>
</svg>`;
}
