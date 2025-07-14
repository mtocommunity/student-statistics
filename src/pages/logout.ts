import type { APIRoute } from "astro"

export const GET: APIRoute = async ({ cookies }) => {
  // Removes any authentication token from the cookies
  cookies.delete("token", {
    path: "/",
  })

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/login",
    },
  })
}
