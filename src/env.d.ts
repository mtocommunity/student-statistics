/// <reference types="../.astro/types.d.ts" />
/// <reference types="vite-plugin-pwa/info" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-pwa/pwa-assets" />
/// <reference types="vite-plugin-pwa/vanillajs" />
/// <reference types="vite-plugin-svgr/client" />

import type {
  AuthSession,
  AuthUser,
} from "@/auth/configuration/auth-configuration"
import type { Logger } from "pino"

declare global {
  namespace App {
    interface Locals {
      // Auth
      user: AuthUser
      session: AuthSession

      // Logger
      log: Logger
    }
  }
}
