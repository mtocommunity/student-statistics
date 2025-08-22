import { int, sqliteTable, text } from "drizzle-orm/sqlite-core"

// Tables
export const studentTable = sqliteTable("student", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text({ length: 50 }).notNull(),
})
