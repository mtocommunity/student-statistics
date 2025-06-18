import { onAuthMiddleware } from "@/auth/middleware/auth-middleware";
import { sequence } from "astro:middleware";

export const onRequest = sequence(onAuthMiddleware);
