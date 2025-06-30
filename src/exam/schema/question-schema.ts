import { ExamTable } from "@/exam/schema/exam-schema";
import { int, sqliteTable } from "drizzle-orm/sqlite-core";

// Tables
export const QuestionTable = sqliteTable("question", {
  id: int().primaryKey({ autoIncrement: true }),
  nOrder: int().notNull(),
  maxScore: int().notNull(),
  examId: int()
    .notNull()
    .references(() => ExamTable.id, { onDelete: "cascade" }),
});
