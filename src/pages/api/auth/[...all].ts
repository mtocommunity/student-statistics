import { auth } from "@/auth/configuration/auth-configuration"
import type { APIRoute } from "astro"

// API route
export const ALL: APIRoute = async (ctx) => await auth.handler(ctx.request)
