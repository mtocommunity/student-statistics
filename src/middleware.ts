import { onAuthMiddleware } from "@/auth/middleware/auth-middleware"
import { sequence } from "astro:middleware"

// Middlewares
export const onRequest = sequence(onAuthMiddleware)
