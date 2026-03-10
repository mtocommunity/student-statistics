import { int, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { userTable } from "../../user/schema/user-schema"

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
})

export type Semester = typeof semesterTable.$inferSelect
