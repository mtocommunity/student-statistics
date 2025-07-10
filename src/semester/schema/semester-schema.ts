import { userTable } from "@/user/schema/user-schema";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Tables
export const semesterTable = sqliteTable("semester", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text({ length: 50 }).notNull(),
  userCode: text({ length: 6 })
    .notNull()
    .references(() => userTable.code),
  lastUpdateAt: int({ mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
});
