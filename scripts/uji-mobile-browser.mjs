/** Real Chromium checks for fullscreen navigation, motion preferences and mobile art.
 * Serve dist/ first. No external API calls or real contact submissions.
 */
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const base=process.env.BASE_URL||'http://127.0.0.1:4321';
const browser=await chromium.launch();
try {
 for(const [width,height] of [[320,740],[360,800],[390,844],[480,800],[640,900],[760,900],[1000,900],[844,390]]){
  const page=await browser.newPage({viewport:{width,height},hasTouch:true});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/id/');
  await page.waitForFunction(()=>document.querySelector('[data-hero-atmosphere]')?.dataset.running==='true');
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`Home overflow ${width}`);
  // Scroll first to prove closing the modal restores the original page position.
  await page.evaluate(()=>window.scrollTo({top:320,behavior:'instant'}));
  const oldY=await page.evaluate(()=>scrollY);
  // Coordinate tap reflects a user gesture; Locator.click may scroll a sticky ancestor to its static position.
  const burgerBox=await page.locator('#burger').boundingBox();
  await page.mouse.click(burgerBox.x+burgerBox.width/2,burgerBox.y+burgerBox.height/2);
  await page.waitForFunction(()=>document.querySelector('#mob')?.open && document.activeElement?.id==='mob-close');
  await page.locator('#mob').evaluate(el=>Promise.all(el.getAnimations().map(a=>a.finished.catch(()=>{}))));
  const metrics=await page.locator('#mob').evaluate(el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,innerWidth,innerHeight,modal:el.matches(':modal'),parent:el.parentElement.tagName};});
  assert.equal(metrics.modal,true);assert.equal(metrics.parent,'BODY');assert.ok(Math.abs(metrics.x)<1&&Math.abs(metrics.y)<1);assert.ok(Math.abs(metrics.w-width)<1&&Math.abs(metrics.h-height)<1,JSON.stringify(metrics));
  assert.equal(await page.locator('#burger').getAttribute('aria-expanded'),'true');
  assert.equal(await page.locator('[data-hero-atmosphere]').getAttribute('data-running'),'false');
  assert.equal(await page.evaluate(()=>getComputedStyle(document.body).position),'fixed');
  await page.keyboard.press('Shift+Tab');assert.equal(await page.locator('#mob .brand').evaluate(el=>el===document.activeElement),true);
  await page.keyboard.press('Shift+Tab');assert.equal(await page.locator('.mob-cta').evaluate(el=>el===document.activeElement),true);
  await page.keyboard.press('Tab');assert.equal(await page.locator('#mob .brand').evaluate(el=>el===document.activeElement),true);
  await page.locator('#mob summary').first().click();await page.waitForFunction(()=>document.querySelector('#mob details').open);
  await page.locator('#mob summary').nth(1).click();await page.waitForFunction(()=>[...document.querySelectorAll('#mob details')].filter(x=>x.open).length===1);
  const before=await page.locator('html').getAttribute('data-theme');await page.locator('.mob-theme').click();assert.notEqual(await page.locator('html').getAttribute('data-theme'),before);
  await page.keyboard.press('Escape');await page.waitForFunction(()=>!document.querySelector('#mob').open);
  assert.ok(Math.abs(await page.evaluate(()=>scrollY)-oldY)<2,`Scroll not restored ${width}`);
  assert.equal(await page.locator('#burger').evaluate(el=>el===document.activeElement),true);
  assert.notEqual(await page.evaluate(()=>getComputedStyle(document.body).position),'fixed');
  await page.locator('#burger').click();await page.locator('#mob-close').click();await page.waitForFunction(()=>!document.querySelector('#mob').open);
  await page.locator('#burger').click();await page.locator('#mob .mlink[href^="/id/harga"]').click();await page.waitForURL(/\/id\/harga\/?$/);
  assert.equal(await page.locator('#mob').evaluate(el=>el.open),false);assert.notEqual(await page.evaluate(()=>getComputedStyle(document.body).position),'fixed');
  assert.deepEqual(errors,[],`JS errors at ${width}`);
  console.log(`OK ${width}x${height}: fullscreen, focus trap, scroll lock/restore, Escape, close, theme, navigation`);
  await page.close();
 }
 const p=await browser.newPage({viewport:{width:390,height:844}});
 await p.goto(base+'/en/');await p.locator('#burger').click();await p.getByRole('heading',{name:'Where to next?'}).waitFor();
 await p.setViewportSize({width:1440,height:900});await p.waitForFunction(()=>!document.querySelector('#mob').open);assert.notEqual(await p.evaluate(()=>getComputedStyle(document.body).position),'fixed');
 await p.locator('.trig').first().hover();await p.waitForFunction(()=>document.querySelector('.trig').getAttribute('aria-expanded')==='true');await p.keyboard.press('Escape');assert.equal(await p.locator('.trig').first().getAttribute('aria-expanded'),'false');
 console.log('OK English labels, resize cleanup and desktop dropdown');await p.close();
 const anchor=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await anchor.goto(base+'/id/');await anchor.locator('#burger').click();await anchor.locator('#mob summary').nth(1).click();await anchor.locator('#mob a[href$="#layanan"]').first().click();await anchor.waitForURL(/#layanan$/);
 assert.equal(await anchor.locator('#mob').evaluate(el=>el.open),false);assert.notEqual(await anchor.evaluate(()=>getComputedStyle(document.body).position),'fixed');
 await anchor.waitForFunction(()=>Math.abs(document.querySelector('#layanan').getBoundingClientRect().y)<150);
 await anchor.locator('#burger').click();await anchor.locator('#mob [data-setlang="en"]').click();await anchor.waitForURL(/\/en\/?$/);assert.equal(await anchor.evaluate(()=>localStorage.getItem('xy-lang')),'en');
 await anchor.close();console.log('OK same-page anchor after unlock and language navigation');
 for(const lang of ['id','en'])for(const slug of ['','cloud-pc/','aplikasi/','kontak/'])for(const width of [320,390,768]){
   const view=await browser.newPage({viewport:{width,height:844}});await view.goto(`${base}/${lang}/${slug}`);
   assert.ok(await view.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`Overflow ${lang}/${slug}@${width}`);await view.close();
 }
 console.log('OK actual layout: both languages × 4 pages × 3 mobile widths');
 const reduced=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});await reduced.goto(base+'/id/');
 assert.equal(await reduced.locator('.aurora').first().evaluate(el=>getComputedStyle(el).animationName),'none');await reduced.locator('#burger').click();assert.equal(await reduced.locator('#mob').evaluate(el=>getComputedStyle(el).animationName),'none');await reduced.close();
 const save=await browser.newPage({viewport:{width:390,height:844}});await save.addInitScript(()=>Object.defineProperty(navigator,'connection',{value:{saveData:true}}));await save.goto(base+'/id/');assert.equal(await save.locator('[data-hero-atmosphere]').getAttribute('data-running'),'false');await save.close();
 const art=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1,colorScheme:'dark'});const requests=[];art.on('request',r=>requests.push(r.url()));await art.goto(base+'/id/');await art.locator('.hero-art img.d').scrollIntoViewIfNeeded();await art.waitForFunction(()=>document.querySelector('.hero-art img.d').complete);
 assert.ok((await art.locator('.hero-art img.d').evaluate(el=>el.currentSrc)).includes('-sm.webp'));
 assert.equal(requests.filter(u=>/illus-light.*webp/.test(u)).length,0,'Hidden light artwork must not load');
 await art.evaluate(()=>window.scrollTo({top:document.body.scrollHeight,behavior:'instant'}));await art.waitForFunction(()=>document.querySelector('[data-hero-atmosphere]').dataset.running==='false');
 console.log('OK reduced motion, save-data, offscreen pause and single-theme mobile image');await art.close();
} finally {await browser.close();}
