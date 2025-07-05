import { examTable } from "@/exam/schema/exam-schema";
import { int, sqliteTable } from "drizzle-orm/sqlite-core";

// Tables
export const questionTable = sqliteTable("question", {
  id: int().primaryKey({ autoIncrement: true }),
  nOrder: int().notNull(),
  maxScore: int().notNull(),
  examId: int()
    .notNull()
    .references(() => examTable.id, { onDelete: "cascade" }),
});
