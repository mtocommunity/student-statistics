import { userTable } from "@/user/schema/user-schema"
import { createSelectSchema } from "drizzle-zod"
import type z from "zod"

// Validations
export const User = createSelectSchema(userTable)

export const UserPublic = User.pick({
  code: true,
  name: true,
})
export type UserPublic = z.infer<typeof UserPublic>
