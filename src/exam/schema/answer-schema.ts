import { questionTable } from "@/exam/schema/question-schema";
import { userTable } from "@/user/schema/user-schema";
import {
  foreignKey,
  int,
  primaryKey,
  real,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

// Tables
export const answerTable = sqliteTable(
  "answer",
  {
    studentCode: text({ length: 6 }).notNull(),
    questionId: int().notNull(),
    score: real().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.studentCode, table.questionId] }),
    foreignKey({
      columns: [table.studentCode, table.questionId],
      foreignColumns: [userTable.code, questionTable.id],
    }).onDelete("cascade"),
  ],
);
