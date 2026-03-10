import { databaseUrl } from "@/core/configuration/app-configuration"
import * as semesterSchema from "@/semester/schema/semester-schema"
import { Database } from "bun:sqlite"
import { drizzle } from "drizzle-orm/bun-sqlite"

// Schema
export const schema = {
  ...semesterSchema,
}

// Database client
const sqlite = new Database(databaseUrl, { create: true })

export const db = drizzle({
  client: sqlite,
  casing: "snake_case",
  schema,
})
