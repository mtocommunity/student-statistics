import { semesterTable } from "@/semester/schema/semester-schema"
import { createInsertSchema, createUpdateSchema } from "drizzle-zod"
import type z from "zod"

// Validations
export const InsertSemester = createInsertSchema(semesterTable, {
  name: (schema) =>
    schema.min(4, "El nombre del ciclo debe tener más de 4 caracteres"),
}).pick({
  name: true,
})
export type InsertSemester = z.infer<typeof InsertSemester>

export const UpdateSemester = createUpdateSchema(semesterTable, {
  name: InsertSemester.shape.name,
})
  .pick({
    id: true,
    name: true,
  })
  .required({
    id: true,
    name: true,
  })
export type UpdateSemester = z.infer<typeof UpdateSemester>

export const DeleteSemester = UpdateSemester.pick({ id: true })
export type DeleteSemester = z.infer<typeof DeleteSemester>
