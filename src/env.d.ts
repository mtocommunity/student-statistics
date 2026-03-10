/// <reference types="../.astro/types.d.ts" />
/// <reference types="vite-plugin-pwa/info" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-pwa/pwa-assets" />
/// <reference types="vite-plugin-pwa/vanillajs" />
/// <reference types="vite-plugin-svgr/client" />

import type { UserPublic } from "@/user/model/user-model"
import type { Logger } from "pino"

declare global {
  namespace App {
    interface Locals {
      // User
      user: UserPublic

      // Logger
      log: Logger
    }
  }
}
