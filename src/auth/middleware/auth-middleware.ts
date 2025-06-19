import { onProtectedRouteRequest } from "@/auth/middleware/private-route-middleware";
import { sequence } from "astro:middleware";

export const onAuthMiddleware = sequence(onProtectedRouteRequest);
