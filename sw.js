const CACHE='courses-v25';
const FILES=['./','index.html','manifest.webmanifest','icon.png'];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==CACHE).map(n=>caches.delete(n)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  e.respondWith(
    fetch(r).then(res=>{
      const copie=res.clone();
      caches.open(CACHE).then(c=>c.put(r,copie));
      return res;
    }).catch(()=>caches.match(r).then(m=>m||caches.match('index.html')))
  );
});
