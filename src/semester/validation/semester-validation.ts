import { semesterTable } from "@/semester/schema/semester-schema"
import { createInsertSchema, createUpdateSchema } from "drizzle-zod"
import z4 from "zod/v4"

export const createSemesterSchema = createInsertSchema(semesterTable).pick({
  name: true,
})
export type CreateSemester = z4.infer<typeof createSemesterSchema>

export const updateSemesterSchema = createUpdateSchema(semesterTable)
  .pick({
    id: true,
    name: true,
  })
  .required({
    id: true,
    name: true,
  })
export type UpdateSemester = z4.infer<typeof updateSemesterSchema>

export const deleteSemesterSchema = updateSemesterSchema.pick({ id: true })
export type DeleteSemester = z4.infer<typeof deleteSemesterSchema>
