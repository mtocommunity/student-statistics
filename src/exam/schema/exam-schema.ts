import { courseTable } from "@/course/schema/course-schema"
import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core"

// Constants
export const MIN_PASSING_SCORE = 11.5

// Tables
export const examTable = sqliteTable("exam", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text({ length: 50 }).notNull(),
  minPassingScore: real().notNull().default(MIN_PASSING_SCORE),
  courseId: int()
    .notNull()
    .references(() => courseTable.id, { onDelete: "cascade" }),
  lastUpdateAt: int({ mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
})
export type Exam = typeof examTable.$inferSelect
