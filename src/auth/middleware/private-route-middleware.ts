import { defineMiddleware } from "astro:middleware";

export const onProtectedRouteRequest = defineMiddleware(async (_, next) => {
  return next();
});
