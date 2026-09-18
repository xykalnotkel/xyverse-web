import {chromium} from 'playwright';
import assert from 'node:assert/strict';
const base=process.env.BASE_URL||'http://127.0.0.1:4321';
const browser=await chromium.launch();
try{
 const p=await browser.newPage({viewport:{width:390,height:844}});
 const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(base+'/id/');await p.locator('#burger').click();
 await p.locator('#mob').evaluate(el=>Promise.all(el.getAnimations({subtree:true}).map(a=>a.finished.catch(()=>{}))));
 const group=p.locator('#mob details').first();
 const result=await group.evaluate(el=>{
  const summary=el.querySelector('summary'), closed=el.getBoundingClientRect().height;
  summary.click();
  let a=el.getAnimations().find(a=>a.effect.getKeyframes().some(k=>'height' in k));
  if(!a)return {animated:false};
  const frames=a.effect.getKeyframes();a.currentTime=100;
  const middle=el.getBoundingClientRect().height;
  summary.click();
  const reverse=el.getBoundingClientRect().height;
  a=el.getAnimations().find(a=>a.effect.getKeyframes().some(k=>'height' in k));
  return {animated:!!a,closed,middle,reverse,full:parseFloat(frames.at(-1).height)};
 });
 assert.equal(result.animated,true);assert.ok(result.middle>result.closed&&result.middle<result.full,JSON.stringify(result));
 assert.ok(Math.abs(result.middle-result.reverse)<2,'Reversing should start at the current height, not jump');
 await p.waitForFunction(()=>!document.querySelector('#mob details').open);
 assert.equal(await group.evaluate(el=>el.style.height),'');
 // Repeated requests do not leave stale inline height or multiple opened groups.
 await group.evaluate(el=>{for(let i=0;i<9;i++)el.querySelector('summary').click();});
 await p.waitForFunction(()=>document.querySelector('#mob details').open&&!document.querySelector('#mob details').style.height);
 await p.locator('#mob summary').nth(1).click();
 await p.waitForFunction(()=>[...document.querySelectorAll('#mob details')].filter(el=>el.open).length===1);
 const closing=await p.locator('#mob-close').evaluate(el=>{
  el.click();const dialog=document.querySelector('#mob');return {open:dialog.open,animated:dialog.getAnimations().some(a=>a.playState==='running')};
 });
 assert.deepEqual(closing,{open:true,animated:true});await p.waitForFunction(()=>!document.querySelector('#mob').open);
 assert.notEqual(await p.evaluate(()=>getComputedStyle(document.body).position),'fixed');
 const faq=p.locator('.faqs details').first();await faq.scrollIntoViewIfNeeded();
 await faq.locator('summary').click();await faq.evaluate(el=>Promise.all(el.getAnimations().map(a=>a.finished.catch(()=>{}))));assert.equal(await faq.evaluate(el=>el.open),true);
 await faq.locator('summary').click();await p.waitForFunction(()=>!document.querySelector('.faqs details').open);
 await p.emulateMedia({reducedMotion:'reduce'});await p.locator('#burger').click();
 const reduced=await group.evaluate(el=>{if(el.open)el.querySelector('summary').click();el.querySelector('summary').click();return {open:el.open,heightAnimations:el.getAnimations().filter(a=>a.effect.getKeyframes().some(k=>'height' in k)).length};});
 assert.deepEqual(reduced,{open:true,heightAnimations:0});
 await p.locator('#mob-close').evaluate(el=>el.click());assert.equal(await p.locator('#mob').evaluate(el=>el.open),false);
 await p.emulateMedia({reducedMotion:'no-preference'});
 await p.goto(base+'/id/kontak/');await p.evaluate(()=>document.fonts.ready);
 const submit=p.locator('#cf-kirim');await submit.scrollIntoViewIfNeeded();const box=await submit.boundingBox();
 await p.mouse.move(box.x+box.width/2,box.y+box.height-.5);
 const jitter=await submit.evaluate(async el=>{
   const ys=[];for(let i=0;i<60;i++){await new Promise(requestAnimationFrame);ys.push(el.getBoundingClientRect().top);}
   return Math.max(...ys)-Math.min(...ys);
 });
 assert.ok(jitter<.1,`Hover hit area must not oscillate at the edge: ${jitter}px`);
 assert.deepEqual(errors,[]);await p.close();
 console.log('OK smooth intermediate heights, rapid reversal, repeated toggles, exclusive accordion, animated modal exit, FAQ, reduced motion');
}finally{await browser.close();}
