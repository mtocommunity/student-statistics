import { databaseUrl } from "@/config"
import * as semesterSchema from "@/semester/schema/semester-schema"
import { Database } from "bun:sqlite"
import { drizzle } from "drizzle-orm/bun-sqlite"

// Schema
const schema = {
  ...semesterSchema,
}

// Database client
const sqlite = new Database(databaseUrl)

export const db = drizzle({
  client: sqlite,
  casing: "snake_case",
  schema,
})
