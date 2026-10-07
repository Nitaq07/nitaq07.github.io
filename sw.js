// عامل الخدمة: يحفظ واجهة التطبيق فقط (الأيقونات وشاشة البدء)
// أما محتوى المنصة نفسه فيُحمَّل دائمًا من Apps Script، لذلك تظهر تحديثاتك فورًا.
const CACHE = "upload-platform-v2";
const SHELL = ["./", "index.html", "manifest.json",
  "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png",
  "icons/apple-touch-icon.png", "icons/favicon-32.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return; // لا نتدخل في طلبات Google
  // الشبكة أولًا، ثم النسخة المحفوظة عند انقطاع الاتصال
  e.respondWith(
    fetch(e.request)
      .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res; })
      .catch(() => caches.match(e.request))
  );
});
