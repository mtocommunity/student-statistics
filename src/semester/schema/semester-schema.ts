import { userTable } from "@/auth/schema/auth-schema"
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core"

// Tables
export const semesterTable = sqliteTable("semester", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text({ length: 50 }).notNull(),
  userId: text()
    .notNull()
    .references(() => userTable.id),
  lastUpdateAt: int({ mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
})

export type Semester = typeof semesterTable.$inferSelect
