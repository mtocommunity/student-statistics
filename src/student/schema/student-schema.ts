import { courseTable } from "@/course/schema/course-schema"
import {
  foreignKey,
  int,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core"

// Tables
export const studentTable = sqliteTable("student", {
  id: int().primaryKey({ autoIncrement: true }),
  firstName: text({ length: 50 }).notNull(),
  lastName: text({ length: 50 }).notNull(),
  code: text({ length: 9 }).notNull(),
})

export const studentCourseTable = sqliteTable(
  "student_course",
  {
    studentId: int().notNull(),
    courseId: int().notNull(),
  },
  (t) => [
    primaryKey({ columns: [t.studentId, t.courseId] }),
    foreignKey({
      columns: [t.studentId, t.courseId],
      foreignColumns: [studentTable.id, courseTable.id],
    }).onDelete("cascade"),
  ]
)
