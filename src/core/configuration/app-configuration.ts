import z from "zod"
import packageJson from "../../../package.json"

// Package json
export const { name: apiName } = packageJson

// Environment
type KeyEnv = { [K in keyof Bun.Env]: unknown }

export const {
  PORT: port,
  NODE_ENV: nodeEnv,
  DATABASE_URL: databaseUrl,
} = (
  z.object({
    // App
    PORT: z.coerce.number().min(1).max(65535).default(3000),

    // Environment
    NODE_ENV: z
      .enum(["development", "production", "staging", "test"])
      .default("development"),

    // Database
    DATABASE_URL: z.coerce.string().min(1),

    // Better auth
    BETTER_AUTH_SECRET: z.string().min(1),
  }) satisfies z.ZodType<KeyEnv>
).parse(process.env)

// Stage
export const isProd = nodeEnv === "production"
export const isStaging = nodeEnv === "staging"
export const isDev = nodeEnv === "development"

// Routes
export const privateRoutes: RegExp[] = [/^\/$/, /^\/semesters/]
