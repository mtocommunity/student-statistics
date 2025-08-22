import { userTable } from "@/user/schema/user-schema"
import { createSelectSchema } from "drizzle-zod"
import type { z } from "zod/v4"

// Validations
export const selectUserSchema = createSelectSchema(userTable)

export const userPublicSchema = selectUserSchema.pick({
  code: true,
  name: true,
  lastname: true,
})
export type UserPublic = z.infer<typeof userPublicSchema>
