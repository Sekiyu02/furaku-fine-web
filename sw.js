// Service Worker - 富楽ファイン
const CACHE_NAME = 'furaku-fine-v1';
const OFFLINE_URL = '/offline.html';

// キャッシュするファイル
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/recruitment.html',
  '/medical.html',
  '/video.html',
  '/knowledge.html',
  '/privacy.html',
  '/voice.html',
  '/offline.html',
  '/assets/css/index.css',
  '/assets/css/recruitment.css',
  '/assets/css/medical.css',
  '/assets/css/video.css',
  '/assets/css/knowledge.css',
  '/assets/css/voice.css',
  '/assets/js/index.js',
  '/assets/js/microcms.js',
  '/assets/images/logo-jp.svg',
  '/assets/images/logo-tagu.svg',
  '/assets/images/ogp.jpg'
];

// インストール時にキャッシュ
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// アクティベート時に古いキャッシュを削除
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        );
      })
      .then(() => self.clients.claim())
  );
});

// フェッチ時のキャッシュ戦略
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 同一オリジンのリクエストのみ処理
  if (url.origin !== location.origin) {
    return;
  }

  // ナビゲーションリクエスト（HTMLページ）
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // 成功したらキャッシュを更新
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // オフライン時はキャッシュから返す
          return caches.match(request)
            .then((cachedResponse) => {
              return cachedResponse || caches.match(OFFLINE_URL);
            });
        })
    );
    return;
  }

  // その他のリソース（CSS, JS, 画像など）
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // キャッシュがあればそれを返し、バックグラウンドで更新
        if (cachedResponse) {
          // Stale-While-Revalidate
          fetch(request)
            .then((response) => {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, response);
              });
            })
            .catch(() => {});
          return cachedResponse;
        }

        // キャッシュがなければフェッチ
        return fetch(request)
          .then((response) => {
            // 成功したらキャッシュに追加
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
            return response;
          });
      })
  );
});
