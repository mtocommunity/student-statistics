import { registerSW } from "virtual:pwa-register";

window.addEventListener("load", () => {
  registerSW({
    immediate: true,
    onRegisteredSW() {
      if (location.pathname === "/login")
        caches.keys().then((cacheNames) => {
          cacheNames.forEach((cacheName) => {
            if (
              cacheName.startsWith("offline-private-pages-cache") ||
              cacheName.startsWith("static-resources")
            )
              caches.delete(cacheName).then(() => {
                console.info(`Cache ${cacheName} cleared`);
              });
          });
        });
    },
    onNeedRefresh() {
      console.info("PWA application needs refresh");
    },
    onOfflineReady() {
      console.info("PWA application ready to work offline");
    },
  });
});
