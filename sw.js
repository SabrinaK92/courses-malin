const C='courses-v15',ZX='https://cdn.jsdelivr.net/npm/@zxing/library@0.21.3/umd/index.min.js';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(async c=>{await c.addAll(['./','index.html','manifest.webmanifest','icon.png']);try{await c.add(ZX)}catch(x){}}))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!='GET'||/openfoodfacts|openbeautyfacts|openproductsfacts|overpass/.test(u.hostname))return;
e.respondWith(fetch(e.request).then(x=>{const y=x.clone();caches.open(C).then(c=>c.put(e.request,y));return x}).catch(()=>caches.match(e.request)))});
