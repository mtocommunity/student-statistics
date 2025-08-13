import { semesterTable } from "@/semester/schema/semester-schema"
import { createInsertSchema, createUpdateSchema } from "drizzle-zod"
import z4 from "zod/v4"

export const createSemesterSchema = createInsertSchema(semesterTable)
  .pick({
    name: true,
  })
  .refine(
    (schema) => {
      schema.name = schema.name.trim()

      return schema.name.length > 4
    },
    {
      error: "El nombre del ciclo debe tener más de 4 caracteres",
      path: ["name"],
    }
  )
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
  .refine(
    (schema) => {
      schema.name = schema.name.trim()

      return schema.name.length > 4
    },
    {
      error: "El nombre del ciclo debe tener más de 4 caracteres",
      path: ["name"],
    }
  )
export type UpdateSemester = z4.infer<typeof updateSemesterSchema>

export const deleteSemesterSchema = updateSemesterSchema.pick({ id: true })
export type DeleteSemester = z4.infer<typeof deleteSemesterSchema>
