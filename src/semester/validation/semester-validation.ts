import { semesterTable } from "@/semester/schema/semester-schema"
import { createInsertSchema } from "drizzle-zod"
import type { z } from "zod/v4"

export const createSemesterSchema = createInsertSchema(semesterTable).pick({
  name: true,
})
export type CreateSemester = z.infer<typeof createSemesterSchema>
