/// <reference types="astro/client" />
/// <reference types="vite-plugin-pwa/info" />
/// <reference types="vite-plugin-pwa/pwa-assets" />
/// <reference types="vite-plugin-pwa/vanillajs" />

import type { UserPublic } from "@/user/schema/user-schema";

declare global {
  namespace App {
    interface Locals {
      user: UserPublic;
    }
  }

  interface ImportMetaEnv {
    readonly DATABASE_URL: string;
    readonly JWT_SECRET: string;
  }
}
