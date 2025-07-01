import logger from "@/logger";
import { registerSW } from "virtual:pwa-register";

window.addEventListener("load", () => {
  registerSW({
    immediate: true,
    onRegisteredSW() {
      if (location.pathname === "/login" || location.pathname === "/register")
        caches.keys().then((cacheNames) => {
          cacheNames.forEach((cacheName) => {
            if (
              cacheName.startsWith("offline-private-pages-cache") ||
              cacheName.startsWith("static-resources")
            )
              caches.delete(cacheName).then(() => {
                logger.info(`Cache ${cacheName} cleared`);
              });
          });
        });
    },
    onNeedRefresh() {
      logger.info("PWA application needs refresh");
    },
    onOfflineReady() {
      logger.info("PWA application ready to work offline");
    },
  });
});
