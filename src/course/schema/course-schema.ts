import { semesterTable } from "@/semester/schema/semester-schema";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Tables
export const courseTable = sqliteTable("course", {
  id: int().primaryKey(),
  name: text({ length: 50 }).notNull(),
  semesterId: int()
    .notNull()
    .references(() => semesterTable.id, { onDelete: "cascade" }),
  lastUpdateAt: int({ mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
});
