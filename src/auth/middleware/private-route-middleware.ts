import { jwtSecretEncoded, privateRoutes } from "@/config";
import logger from "@/logger";
import { userPublicSchema, type UserPublic } from "@/user/schema/user-schema";
import { defineMiddleware } from "astro:middleware";
import { jwtDecrypt } from "jose";
import picocolors from "picocolors";

// Middleware
export const onProtectedRouteRequest = defineMiddleware(
  async (context, next) => {
    if (context.isPrerendered) return next();

    // Context
    const { request, url, cookies, locals, clientAddress } = context;

    // Url
    const referer = request.headers.get("Referer");
    const pathname =
      url.pathname.startsWith("/_") && referer
        ? new URL(referer).pathname
        : url.pathname;

    // Redirect to login if not authenticated
    const isPrivateRoute = privateRoutes.some((route) => pathname.match(route));

    if (!isPrivateRoute) return next();

    // Check for token in cookies or Authorization header
    const token =
      cookies.get("token")?.value ||
      request.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) return context.redirect("/login", 307);

    // Verify token
    try {
      const { payload } = await jwtDecrypt<UserPublic>(token, jwtSecretEncoded);
      const { success, data, error } =
        await userPublicSchema.safeParseAsync(payload);

      if (!success || !data) {
        logger.error(
          picocolors.yellowBright(`<${clientAddress}>`),
          "JWT payload validation failed:",
          error,
        );

        return context.redirect("/login", 307);
      }

      locals.user = data;

      return next();
    } catch (error) {
      logger.error(
        picocolors.yellowBright(`<${clientAddress}>`),
        "JWT verification failed:",
        error,
      );

      // Removes token
      cookies.delete("token", { path: "/" });

      return context.redirect("/login", 307);
    }
  },
);
