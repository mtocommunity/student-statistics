import { auth } from "@/auth/configuration/auth-configuration"
import type { APIRoute } from "astro"

export const GET: APIRoute = async ({ request: { headers } }) => {
  // Removes any authentication
  await auth.api.signOut({ headers })

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/login",
    },
  })
}
