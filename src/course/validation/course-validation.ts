import { courseTable } from "@/course/schema/course-schema"
import { createInsertSchema, createUpdateSchema } from "drizzle-zod"
import z from "zod"

// Validations
export const InsertCourse = createInsertSchema(courseTable, {
  name: (schema) =>
    schema.min(5, "El nombre del curso debe tener más de 4 caracteres"),
})
export type InsertCourse = z.infer<typeof InsertCourse>

export const UpdateCourse = createUpdateSchema(courseTable, {
  name: InsertCourse.shape.name,
}).required({
  id: true,
  semesterId: true,
})
export type UpdateCourse = z.infer<typeof UpdateCourse>

export const DeleteCourse = z.object({
  id: UpdateCourse.shape.id,
})
export type DeleteCourse = z.infer<typeof DeleteCourse>
