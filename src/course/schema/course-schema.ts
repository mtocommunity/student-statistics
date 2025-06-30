import { SemesterTable } from "@/course/schema/semester-schema";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Tables
export const CourseTable = sqliteTable("course", {
  id: int().primaryKey(),
  name: text({ length: 50 }).notNull(),
  semesterId: int()
    .notNull()
    .references(() => SemesterTable.id, { onDelete: "cascade" }),
});
