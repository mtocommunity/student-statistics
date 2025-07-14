import { sqliteTable, text } from "drizzle-orm/sqlite-core"
import { createSelectSchema } from "drizzle-zod"
import type { z } from "zod/v4"

// Tables
export const userTable = sqliteTable("user", {
  code: text({ length: 6 }).primaryKey(),
  name: text({ length: 40 }).notNull(),
  lastname: text({ length: 40 }).notNull(),
  password: text({ length: 255 }).notNull(),
})

// Schemas
export const selectUserSchema = createSelectSchema(userTable)

export const userPublicSchema = selectUserSchema.pick({
  code: true,
  name: true,
  lastname: true,
})
export type UserPublic = z.infer<typeof userPublicSchema>
