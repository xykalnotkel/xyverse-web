/** API is intercepted before navigation: NEVER sends real emails, even on live BASE_URL.
 * Asserts rendered visibility, not just the hidden property (CSS can override it).
 */
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const base = process.env.BASE_URL || 'http://127.0.0.1:4321';
const browser = await chromium.launch();
try {
 for (const lang of ['id','en']) for (const path of [`/${lang}/`, `/${lang}/kontak/`]) for (const colorScheme of ['dark','light']) {
  const page = await browser.newPage({viewport:{width:390,height:844},colorScheme});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  let mode='ok', release, pending;
  const sent=[];
  await page.route('**/api/pesan',async route=>{
   const req=route.request();
   const headers={'access-control-allow-origin':base,'access-control-allow-methods':'POST, OPTIONS','access-control-allow-headers':'content-type'};
   if(req.method()==='OPTIONS')return route.fulfill({status:204,headers});
   assert.equal(req.method(),'POST');
   assert.equal(new URL(req.url()).origin,process.env.API_ORIGIN||'https://admin.xyverse.my.id');
   sent.push(req.postDataJSON());
   if(mode==='pending')await pending;
   if(mode==='network')return route.abort('failed');
   const ok=['ok','pending'].includes(mode);
   await route.fulfill({status:ok?200:mode==='rate'?429:502,headers,contentType:'application/json',body:JSON.stringify(ok?{ok:true}:{error:'Uji galat layanan'})});
  });
  await page.goto(base+path);
  const alerts=page.locator('#cf .alert:visible'), messages=page.locator('#cf [data-msg]:visible');
  assert.equal(await alerts.count(),0,'No success/error banners on initial render');
  assert.equal(await messages.count(),0,'No premature field errors');
  assert.equal(sent.length,0);
  await page.locator('#cf [name="nama"]').focus();await page.locator('#cf [name="email"]').focus();
  assert.equal(await messages.count(),0,'Untouched blank field must stay quiet on blur');
  await page.locator('#cf [name="email"]').fill('invalid');await page.locator('#cf [name="nama"]').focus();
  assert.equal(await messages.count(),1,'Only the edited invalid field gets a message');
  await page.locator('#cf [name="email"]').fill('valid@example.com');
  assert.equal(await messages.count(),0,'Corrected error clears while typing');
  await page.locator('#cf [name="email"]').fill('');
  await page.locator('#cf-kirim').click();
  assert.equal(await messages.count(),3);assert.equal(await alerts.count(),0,'No duplicate summary banner for inline validation');
  assert.equal(sent.length,0);
  for(const outcome of ['pending','error','rate','network']) {
   mode=outcome;
   if(mode==='pending')pending=new Promise(r=>{release=r;});
   await page.locator('#cf [name="nama"]').fill('Uji Form Xyverse');
   await page.locator('#cf [name="email"]').fill('uji@example.com');
   await page.locator('#cf [name="pesan"]').fill('Pengujian otomatis form kontak, tidak mengirim email nyata.');
   assert.equal(await alerts.count(),0,'Editing clears stale submission status');
   await page.locator('#cf-kirim').click();
   if(mode==='pending') {
    await page.waitForFunction(()=>document.querySelector('#cf').getAttribute('aria-busy')==='true');
    assert.equal(await page.locator('#cf-kirim').isDisabled(),true);
    assert.equal(await alerts.count(),0,'No success before the API replies');
    await page.locator('#cf').evaluate(f=>f.requestSubmit());
    release();
   }
   await page.waitForFunction(()=>!document.querySelector('#cf-kirim')?.disabled);
   const ok=outcome==='pending';
   assert.equal(await page.locator('#cf-ok').isVisible(),ok);
   assert.equal(await page.locator('#cf-err').isVisible(),!ok);
   assert.equal(await alerts.count(),1,'Exactly one submission status');
   assert.equal(await messages.count(),0);
   assert.equal(sent.at(-1).situs_web,'');
   assert.equal(sent.at(-1).nama,'Uji Form Xyverse');
   if(!ok)assert.equal(await page.locator('#cf [name="nama"]').inputValue(),'Uji Form Xyverse');
   else {
    assert.equal(await page.locator('#cf [name="nama"]').inputValue(),'');
    // Focus/blur after success must not produce red errors on reset blank fields.
    await page.locator('#cf [name="nama"]').focus();await page.locator('#cf [name="email"]').focus();
    assert.equal(await messages.count(),0);
   }
  }
  assert.equal(sent.length,4,'In-flight resubmission must not send a duplicate');
  assert.deepEqual(errors,[]);
  console.log(`OK ${path} ${colorScheme}: initial visibility, quiet blur, inline correction, pending/double-submit, success/error/429/network`);
  await page.close();
 }
 // With scripts disabled, CSS must still hide all form status messages at first render.
 const nojs=await browser.newPage({javaScriptEnabled:false});
 for(const path of ['/id/','/id/kontak/']) {
  await nojs.goto(base+path);
  assert.equal(await nojs.locator('#cf .alert:visible,#cf [data-msg]:visible').count(),0);
 }
 await nojs.close();console.log('OK no-JS first paint: no premature notifications');
} finally {await browser.close();}
