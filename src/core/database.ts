import * as authSchema from "@/auth/schema/auth-schema"
import { databaseUrl } from "@/core/configuration/app-configuration"
import * as courseSchema from "@/course/schema/course-schema"
import * as answerSchema from "@/exam/schema/answer-schema"
import * as examSchema from "@/exam/schema/exam-schema"
import * as questionSchema from "@/exam/schema/question-schema"
import * as semesterSchema from "@/semester/schema/semester-schema"
import * as studentSchema from "@/student/schema/student-schema"
import { Database } from "bun:sqlite"
import { drizzle } from "drizzle-orm/bun-sqlite"

// Database client
const sqlite = new Database(databaseUrl, { create: true })

// All schemas
const allSchemas = {
  ...authSchema,
  ...semesterSchema,
  ...courseSchema,
  ...answerSchema,
  ...questionSchema,
  ...studentSchema,
  ...examSchema,
}

// Schema
type Schemas = typeof allSchemas
type StripTableSuffix<S extends string> = S extends `${infer R}Table` ? R : S

type DatabaseSchema = {
  [K in keyof Schemas as StripTableSuffix<K>]: Schemas[K]
}

// Helper to strip "Table" suffix at runtime
const stripTableSuffix = (schemas: Record<string, unknown>) => {
  const result: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(schemas)) {
    const newKey = key.endsWith("Table") ? key.slice(0, -5) : key
    result[newKey] = value
  }
  return result
}

export const schema = stripTableSuffix(allSchemas) as DatabaseSchema

export const db = drizzle({
  client: sqlite,
  casing: "snake_case",
  schema,
})
