import { privateRoutes } from "@/core/configuration/app-configuration"
import { defineMiddleware } from "astro:middleware"

// Middleware
export const onProtectedRouteRequest = defineMiddleware(
  async (context, next) => {
    if (context.isPrerendered) return next()

    // Context
    const { request, url, cookies } = context

    // Url
    const referer = request.headers.get("Referer")
    const pathname =
      url.pathname.startsWith("/_") && referer
        ? new URL(referer).pathname
        : url.pathname

    // Redirect to login if not authenticated
    const isPrivateRoute = privateRoutes.some((route) => pathname.match(route))

    if (!isPrivateRoute) return next()

    // Check for token in cookies or Authorization header
    const token =
      cookies.get("token")?.value ||
      request.headers.get("Authorization")?.replace("Bearer ", "")

    if (!token) return context.redirect("/login", 302)

    return next()
  }
)
