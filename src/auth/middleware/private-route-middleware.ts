import { auth } from "@/auth/configuration/auth-configuration"
import { privateRoutes } from "@/core/configuration/app-configuration"
import { defineMiddleware } from "astro:middleware"

// Middleware
export const onProtectedRouteRequest = defineMiddleware(
  async (context, next) => {
    if (context.isPrerendered) return next()

    // Context
    const { request, url } = context

    // Url
    const referer = request.headers.get("Referer")
    const pathname =
      url.pathname.startsWith("/_") && referer
        ? new URL(referer).pathname
        : url.pathname

    // Redirect to login if not authenticated
    const isPrivateRoute = privateRoutes.some((route) => pathname.match(route))

    if (!isPrivateRoute) return next()

    // Check for session
    const currentAuth = await auth.api.getSession({
      headers: context.request.headers,
    })

    if (!currentAuth) return context.redirect("/login", 302)

    // Add user and session to context locals
    const { user, session } = currentAuth

    context.locals.user = user
    context.locals.session = session

    return next()
  }
)
