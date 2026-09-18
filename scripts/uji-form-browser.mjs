/** Build first, serve dist, then run BASE_URL=http://127.0.0.1:4321 npm run test:browser.
 * Requires: npx playwright install chromium
 * API calls are intercepted; this test NEVER sends real email.
 */
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const base = process.env.BASE_URL || 'http://127.0.0.1:4321';
const browser = await chromium.launch({ headless: true });
try {
  for (const lang of ['id', 'en']) {
    for (const path of [`/${lang}/`, `/${lang}/kontak/`]) {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      let mode = 'ok';
      const sent = [];
      await page.route('**/api/pesan', async route => {
        const req = route.request();
        if (req.method() === 'OPTIONS') {
          await route.fulfill({ status: 204, headers: { 'access-control-allow-origin': base, 'access-control-allow-methods': 'POST, OPTIONS', 'access-control-allow-headers': 'content-type' } });
          return;
        }
        assert.equal(req.method(), 'POST');
        assert.equal(new URL(req.url()).origin, process.env.API_ORIGIN || 'https://admin.xyverse.my.id');
        sent.push(req.postDataJSON());
        if (mode === 'network') return route.abort('failed');
        await route.fulfill({ status: mode === 'ok' ? 200 : 502, contentType: 'application/json', headers: { 'access-control-allow-origin': base }, body: JSON.stringify(mode === 'ok' ? { ok: true } : { error: 'Uji galat layanan' }) });
      });
      await page.goto(base + path);
      await page.locator('#cf-kirim').click();
      await page.waitForFunction(() => document.querySelector('#cf-err')?.hidden === false);
      assert.equal(sent.length, 0, 'Invalid form must not submit');
      for (const outcome of ['ok', 'error', 'network']) {
        mode = outcome;
        await page.locator('#cf [name="nama"]').fill('Uji Form Xyverse');
        await page.locator('#cf [name="email"]').fill('uji@example.com');
        await page.locator('#cf [name="pesan"]').fill('Pengujian otomatis form kontak, tidak mengirim email nyata.');
        await page.locator('#cf-kirim').click();
        await page.waitForFunction(() => !document.querySelector('#cf-kirim')?.disabled);
        await page.waitForFunction(id => document.querySelector(id)?.hidden === false, outcome === 'ok' ? '#cf-ok' : '#cf-err');
        assert.equal(await page.locator('#cf-ok').evaluate(el => el.hidden), outcome !== 'ok');
        assert.equal(sent.at(-1).situs_web, '');
        assert.equal(sent.at(-1).nama, 'Uji Form Xyverse');
        if (outcome !== 'ok') assert.equal(await page.locator('#cf [name="nama"]').inputValue(), 'Uji Form Xyverse');
      }
      assert.equal(sent.length, 3);
      assert.deepEqual(errors, [], `${path} browser errors`);
      console.log(`OK ${path}: validation, successful POST, API error, network error, button reset`);
      await page.close();
    }
  }
} finally { await browser.close(); }
