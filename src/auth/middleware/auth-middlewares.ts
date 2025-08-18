import { onProtectedRouteRequest } from "@/auth/middleware/private-route-middleware"
import { sequence } from "astro:middleware"

// Middlewares
export const onAuthMiddleware = sequence(onProtectedRouteRequest)
