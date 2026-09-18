/** Regression checks for our deliberately small Vercel routing configuration.
 * Run after build. Live deployment tests remain necessary for platform behavior.
 */
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const c = JSON.parse(readFileSync('vercel.json', 'utf8'));
assert.deepEqual(Object.keys(c).sort(), ['$schema', 'routes']);
assert.deepEqual(c.routes[0], { handle: 'filesystem' });
const fallbacks = c.routes.slice(1);
for (const r of fallbacks) {
  assert.deepEqual(Object.keys(r).sort(), ['dest', 'src', 'status']);
  assert.equal(r.status, 404);
  new RegExp(`^${r.src}$`);
}
function fallback(url) {
  const r = fallbacks.find(r => new RegExp(`^${r.src}$`).test(url));
  assert.ok(r, `No fallback: ${url}`);
  const dest = url.replace(new RegExp(`^${r.src}$`), r.dest);
  assert.ok(existsSync(`dist${dest}`), `Missing fallback file: ${dest}`);
  return dest;
}
for (const lang of ['id', 'en']) {
  for (const section of ['blog', 'berita', 'proyek', 'legal', 'aplikasi']) {
    assert.equal(fallback(`/${lang}/${section}/uji-tidak-ada`), `/${lang}/${section}/tidak-ada/index.html`);
  }
  assert.equal(fallback(`/${lang}/uji-tidak-ada`), `/${lang}/tidak-ada/index.html`);
}
assert.equal(fallback('/uji-tidak-ada'), '/404.html');
const root = readFileSync('dist/index.html', 'utf8');
const canonical = root.match(/rel="canonical"[^>]*href="([^"]+)"/);
assert.ok(canonical, 'Canonical root missing');
const origin = new URL(canonical[1]).origin;
assert.ok(readFileSync('dist/robots.txt', 'utf8').includes(`Sitemap: ${origin}/sitemap-index.xml`));
const security = readFileSync('dist/.well-known/security.txt', 'utf8');
assert.ok(security.includes(`Canonical: ${origin}/.well-known/security.txt`));
assert.ok(security.includes(`Policy: ${origin}/id/legal/keamanan`));
assert.ok(existsSync('dist/id/legal/keamanan/index.html'));
console.log('Vercel: filesystem-first, 13 fallback destinations, metadata origin all OK.');
