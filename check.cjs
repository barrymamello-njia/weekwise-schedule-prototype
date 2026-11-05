const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const path=require('node:path'),root=__dirname;
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const js=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const hash=crypto.createHash('sha256').update(js).digest('base64');
assert(html.includes("script-src 'sha256-"+hash+"'"));
assert(html.includes("connect-src 'none'"));assert(html.includes("form-action 'none'"));
assert(!/<script\b[^>]*\bsrc\s*=|\bon(?:click|error|load)\s*=|\b(?:fetch|XMLHttpRequest|WebSocket|sendBeacon)\s*\(/i.test(html));
assert(!/<(?:iframe|form|object|embed)\b/i.test(html));
assert(fs.existsSync(path.join(root,'.nojekyll')));

function boot(seed={},blocked=false){
  const stored=new Map(Object.entries(seed)),nodes=new Map(),events={};let writes=0,prints=0;
  function element(tag='div'){
    const subs=new Map();return {tagName:tag,children:[],dataset:{},attributes:{},listeners:{},style:{setProperty(){}},classList:{add(){},remove(){}},hidden:false,value:'',textContent:'',innerHTML:'',disabled:false,isConnected:true,
      append(...children){this.children.push(...children)},replaceChildren(...children){this.children=[...children];this.innerHTML='';},setAttribute(k,v){this.attributes[k]=v},removeAttribute(k){delete this.attributes[k]},addEventListener(k,v){this.listeners[k]=v},contains(){return false},focus(){},scrollIntoView(){},remove(){},click(){},closest(){return this},
      querySelector(q){if(!subs.has(q))subs.set(q,element());return subs.get(q)},querySelectorAll(q){return q==='button'||q==='.schedule-option'?this.children.filter(c=>c.tagName==='button'):[]},get lastElementChild(){return this.children.at(-1)||this.querySelector(':last-child')},get firstElementChild(){return this.children[0]||element()}};
  }
  function get(q){if(!nodes.has(q))nodes.set(q,element());return nodes.get(q)}
  const loc={hash:'#home'},document={body:element('body'),activeElement:null,querySelector:get,querySelectorAll(q){if(q==='main > section')return ['home','details'].map(id=>Object.assign(get('#'+id),{id}));return [];},createElement:element,addEventListener(){}};
  const localStorage={getItem(k){if(blocked)throw Error('blocked');return stored.get(k)||null},setItem(k,v){if(blocked)throw Error('blocked');writes++;stored.set(k,v)},removeItem(k){if(blocked)throw Error('blocked');stored.delete(k)}};
  const ctx={document,localStorage,location:loc,history:{replaceState(a,b,hash){loc.hash=hash}},window:{scrollTo(){},addEventListener(k,v){events[k]=v},print(){prints++}},Blob,URL:{createObjectURL(){return 'blob:example'},revokeObjectURL(){}},setTimeout(){}};
  vm.createContext(ctx);
  vm.runInContext(js+`\nglobalThis.test={state:()=>state,remember:()=>rememberChoices,setProfile(){state.majorId='cs';state.degrees.cs='bs';state.selections.cs=['cs1','writing','visual','philosophy','calculus'];majorChosenThisVisit=true;profileConfirmed=true;refreshModel();renderHome();renderSchedule();},saveState,storeCurrentPlan,advisorReport,resetDemoData};`,ctx);
  return {ctx,t:ctx.test,get,stored,writes:()=>writes,prints:()=>prints,events};
}
const key='weekwise-fordham-v2',a=boot({'unrelated-app':'keep'});
assert.equal(a.writes(),0);assert.equal(a.t.remember(),false);
a.t.setProfile();a.t.storeCurrentPlan('A');a.get('#advisor-notes').listeners.input({target:{value:'Sample <img src=x onerror=alert(1)> question'}});
assert.equal(a.writes(),0);assert(a.t.state().savedPlans.A);assert(!a.stored.has(key));
assert.equal(boot().t.state().savedPlans.A,null);
a.get('#remember-choices').listeners.change({target:{checked:true}});assert(a.writes()>0);assert(a.stored.has(key));
const b=boot(Object.fromEntries(a.stored));assert(b.t.remember());assert(b.t.state().savedPlans.A);assert(b.t.state().savedPlans.A.notes.includes('<img'));
const report=b.t.advisorReport('A',b.t.state().savedPlans.A);assert(!report.includes('<img'));assert(report.includes('&lt;img'));assert(report.includes('CISC 1610'));assert(report.includes('fictional'));
a.get('#remember-choices').listeners.change({target:{checked:false}});assert(!a.stored.has(key));assert(a.t.state().savedPlans.A);assert.equal(a.stored.get('unrelated-app'),'keep');
b.get('#clear-demo-data').listeners.click();assert(!b.get('#erase-confirm').hidden);b.get('#cancel-erase').listeners.click();assert(b.t.state().savedPlans.A);
b.get('#clear-demo-data').listeners.click();b.get('#confirm-erase').listeners.click();assert.equal(b.t.state().savedPlans.A,null);assert.equal(b.t.state().majorId,null);assert.equal(b.t.remember(),false);assert(!b.stored.has(key));assert.equal(b.stored.get('unrelated-app'),'keep');assert.equal(b.get('#advisor-notes').value,'');assert.equal(b.get('#remember-choices').checked,false);
const c=boot({},true);c.t.setProfile();c.t.storeCurrentPlan('A');c.get('#remember-choices').listeners.change({target:{checked:true}});assert(c.get('#privacy-status').textContent.includes('blocked'));c.get('#confirm-erase').listeners.click();assert.equal(c.t.state().savedPlans.A,null);assert(c.get('#privacy-status').textContent.includes('blocked deletion'));
console.log('PASS: full application startup; temporary-by-default behavior; opt-in save/reload; opt-out; confirmed erase/cancel; unrelated storage preserved; denied-storage recovery; escaped advisor notes; linked-lab export; exact script CSP hash; outbound-call restrictions; GitHub Pages marker and embedded security policy.');
