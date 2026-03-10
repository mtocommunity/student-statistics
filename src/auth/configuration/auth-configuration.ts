import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { isDev } from "../../core/configuration/app-configuration"
import { db, schema } from "../../core/database"
import { serverLog } from "../../core/log/server-logger"

// Logger
const authLogger = serverLog.child({ module: "auth" })

// Auth configuration
export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "sqlite", schema, debugLogs: true }),
  logger: {
    log(level, message, ...args) {
      authLogger[level](message, ...args)
    },
    ...(isDev ? { level: "debug" } : {}),
  },
  emailAndPassword: {
    enabled: true,
    maxPasswordLength: 60,
  },
  telemetry: {
    enabled: false,
  },
  advanced: {
    cookiePrefix: "student-statistics",
    database: {
      generateId: () => Bun.randomUUIDv7(),
    },
  },
  experimental: { joins: true },
})

// Types
export type Auth = typeof auth.$Infer.Session
export type AuthUser = typeof auth.$Infer.Session.user
export type AuthSession = typeof auth.$Infer.Session.session
export type AuthErrorCode = keyof typeof auth.$ERROR_CODES

// Error
export interface AuthError {
  readonly code: AuthErrorCode | (string & {})
  readonly message: string
}
