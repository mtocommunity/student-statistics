import type { AuthError } from "@/auth/configuration/auth-configuration"
import { createAuthClient } from "better-auth/client"

// Client
export const authClient = createAuthClient()

export const isAuthError = (error: unknown): error is AuthError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string" &&
    "message" in error &&
    typeof error.message === "string"
  )
}
