import { defineMiddleware, sequence } from "astro:middleware";

const onProtectedRoute = defineMiddleware(async (context, next) => {
  return next();
});

export const onAuthMiddleware = sequence(onProtectedRoute);
