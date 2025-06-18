import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const User = sqliteTable("user", {
  code: text({ length: 6 }).primaryKey(),
  name: text({ length: 40 }).notNull(),
  lastname: text({ length: 40 }).notNull(),
  password: text({ length: 255 }).notNull(),
});
export type User = typeof User.$inferSelect;

export const SelectUser = createSelectSchema(User);
export const InsertUser = createInsertSchema(User);
export const UpdateUser = createInsertSchema(User);
