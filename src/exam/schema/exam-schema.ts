import { courseTable } from "@/course/schema/course-schema";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Constants
export const MIN_PASSING_SCORE = 12;

// Tables
export const examTable = sqliteTable("exam", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text({ length: 50 }).notNull(),
  minPassingScore: int().notNull().default(MIN_PASSING_SCORE),
  courseId: int()
    .notNull()
    .references(() => courseTable.id, { onDelete: "cascade" }),
});
