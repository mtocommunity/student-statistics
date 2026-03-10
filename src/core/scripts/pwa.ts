import { log } from "@/core/log/client-logger"
import { registerSW } from "virtual:pwa-register"

const _log = log.withTag("pwa")

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
                _log.info(`Cache ${cacheName} cleared`)
              })
          })
        })
    },
    onNeedRefresh() {
      _log.info("PWA application needs refresh")
    },
    onOfflineReady() {
      _log.info("PWA application ready to work offline")
    },
  })
})
