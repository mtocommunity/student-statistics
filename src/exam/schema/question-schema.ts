import { examTable } from "@/exam/schema/exam-schema";
import { int, real, sqliteTable } from "drizzle-orm/sqlite-core";

// Tables
export const questionTable = sqliteTable("question", {
  id: int().primaryKey({ autoIncrement: true }),
  nOrder: int().notNull(),
  maxScore: real().notNull(),
  examId: int()
    .notNull()
    .references(() => examTable.id, { onDelete: "cascade" }),
});
