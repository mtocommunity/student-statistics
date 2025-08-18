import { onAuthMiddleware } from "@/auth/middleware/auth-middlewares"
import { sequence } from "astro:middleware"

// Middlewares
export const onRequest = sequence(onAuthMiddleware)
