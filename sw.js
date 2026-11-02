const C='wdipi-v42',F=['./','./index.html','./manifest.json','./icon.svg','./icon-180.png','./icon-192.png','./icon-512.png','./privacy.html'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>Promise.all(F.map(u=>fetch(u,{cache:'no-store'}).then(r=>r.ok&&c.put(u,r)).catch(()=>{})))))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET')return;const u=new URL(q.url);if(u.origin!==location.origin)return;
 const fresh=q.mode==='navigate'||/\/(index\.html|sw\.js|version\.json)?$/.test(u.pathname)||u.pathname.endsWith('.json');
 const net=fresh?fetch(q.mode==='navigate'?u.pathname:q,{cache:'no-store'}):fetch(q);
 e.respondWith(net.then(r=>{if(r&&r.ok&&!u.pathname.endsWith('version.json')){const c=r.clone();caches.open(C).then(x=>x.put(q.mode==='navigate'?'./index.html':q,c))}return r}).catch(()=>caches.match(q,{ignoreSearch:true}).then(r=>r||(q.mode==='navigate'?caches.match('./index.html'):r))))});
