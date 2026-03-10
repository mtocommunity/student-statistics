import { defineConfig } from "drizzle-kit"

const { DATABASE_URL: databaseUrl } = process.env

export default defineConfig({
  schema: "./src/**/*-schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: databaseUrl!,
  },
  casing: "snake_case",
})
