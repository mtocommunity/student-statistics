/// <reference types="../.astro/types.d.ts" />
/// <reference types="vite-plugin-pwa/info" />
/// <reference types="vite-plugin-pwa/pwa-assets" />
/// <reference types="vite-plugin-pwa/vanillajs" />

import type { UserPublic } from "@/user/validation/user-validation"

declare global {
  namespace App {
    interface Locals {
      user: UserPublic
    }
  }
}
