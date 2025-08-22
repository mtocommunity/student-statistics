import { questionTable } from "@/exam/schema/question-schema"
import { studentTable } from "@/student/schema/student-schema"
import {
  foreignKey,
  int,
  primaryKey,
  real,
  sqliteTable,
} from "drizzle-orm/sqlite-core"

// Tables
export const answerTable = sqliteTable(
  "answer",
  {
    studentId: int().notNull(),
    questionId: int().notNull(),
    score: real(),
  },
  (table) => [
    primaryKey({ columns: [table.studentId, table.questionId] }),
    foreignKey({
      columns: [table.studentId, table.questionId],
      foreignColumns: [studentTable.id, questionTable.id],
    }).onDelete("cascade"),
  ]
)
