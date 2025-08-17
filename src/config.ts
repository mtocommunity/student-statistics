// Site
export const site = "https://student-statistics.martindotpy.dev"

// Environment
export const {
  DEV: isDev,
  DATABASE_URL: databaseUrl,
  JWT_SECRET: jwtSecret,
} = import.meta.env

// Private routes
export const privateRoutes: RegExp[] = [/^\/$/, /^\/semesters/]

// JWT
export const jwtSecretEncoded = new TextEncoder().encode(jwtSecret)
