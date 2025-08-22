import { sqliteTable, text } from "drizzle-orm/sqlite-core"

// Tables
export const userTable = sqliteTable("user", {
  code: text({ length: 6 }).primaryKey(),
  name: text({ length: 40 }).notNull(),
  lastname: text({ length: 40 }).notNull(),
  password: text({ length: 255 }).notNull(),
})
