// Service Worker registration and management utilities

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);

export function register() {
  if ('serviceWorker' in navigator) {
    // Only register in production or if explicitly enabled in development
    if (process.env.NODE_ENV === 'production' || window.location.search.includes('sw=true')) {
      window.addEventListener('load', () => {
        const swUrl = '/sw.js';

        if (isLocalhost) {
          // This is running on localhost. Let's check if a service worker still exists or not.
          checkValidServiceWorker(swUrl);

          // Add some additional logging to localhost, pointing developers to the
          // service worker/PWA documentation.
          navigator.serviceWorker.ready.then(() => {
            console.log(
              'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://cra.link/PWA'
            );
          });
        } else {
          // Is not localhost. Just register service worker
          registerValidSW(swUrl);
        }
      });
    }
  }
}

function registerValidSW(swUrl) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      console.log('SW registered: ', registration);
      
      // Handle updates
      registration.addEventListener('updatefound', () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        
        installingWorker.addEventListener('statechange', () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log(
                'New content is available and will be used when all ' +
                'tabs for this page are closed.'
              );
              
              // Show update available notification
              showUpdateAvailableNotification();
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.');
              
              // Show offline ready notification
              showOfflineReadyNotification();
            }
          }
        });
      });
    })
    .catch((error) => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then((response) => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}

// Update service worker
export function updateServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      if (registration.waiting) {
        // Tell the waiting service worker to skip waiting
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        
        // Reload to apply the update
        window.location.reload();
      }
    });
  }
}

// Cache specific URLs for better performance
export function cacheUrls(urls) {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'CACHE_URLS',
      urls: urls
    });
  }
}

// Preload critical routes
export function preloadCriticalRoutes() {
  const criticalUrls = [
    '/builder',
    '/templates',
    '/about',
    '/contact'
  ];
  
  cacheUrls(criticalUrls);
}

// Show update available notification
function showUpdateAvailableNotification() {
  // Create a simple notification
  if (window.confirm('A new version is available. Would you like to update?')) {
    updateServiceWorker();
  }
}

// Show offline ready notification
function showOfflineReadyNotification() {
  console.log('App is ready for offline use');
  
  // You could show a toast notification here
  // For example, using the existing toast system:
  if (window.toast) {
    window.toast.success('App is ready for offline use');
  }
}

// Check if app is running offline
export function isOffline() {
  return !navigator.onLine;
}

// Listen for online/offline events
export function setupOfflineListeners() {
  window.addEventListener('online', () => {
    console.log('App is back online');
    if (window.toast) {
      window.toast.success('Connection restored');
    }
  });

  window.addEventListener('offline', () => {
    console.log('App is offline');
    if (window.toast) {
      window.toast.info('App is running offline');
    }
  });
}

// Get cache size for debugging
export async function getCacheSize() {
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    let totalSize = 0;
    
    for (const name of cacheNames) {
      const cache = await caches.open(name);
      const keys = await cache.keys();
      console.log(`Cache ${name}: ${keys.length} items`);
      totalSize += keys.length;
    }
    
    console.log(`Total cached items: ${totalSize}`);
    return totalSize;
  }
  
  return 0;
}

// Clear all caches (for debugging)
export async function clearAllCaches() {
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map(name => caches.delete(name)));
    console.log('All caches cleared');
  }
}
