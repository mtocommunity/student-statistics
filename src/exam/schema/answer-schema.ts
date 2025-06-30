import { QuestionTable } from "@/exam/schema/question-schema";
import { UserTable } from "@/user/schema/user-schema";
import {
  foreignKey,
  int,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

// Tables
export const AnswerTable = sqliteTable(
  "answer",
  {
    studentCode: text({ length: 6 }).notNull(),
    questionId: int().notNull(),
    score: int().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.studentCode, table.questionId] }),
    foreignKey({
      columns: [table.studentCode, table.questionId],
      foreignColumns: [UserTable.code, QuestionTable.id],
    }).onDelete("cascade"),
  ],
);
