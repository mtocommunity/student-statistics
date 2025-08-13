import { courseTable } from "@/course/schema/course-schema"
import { createInsertSchema, createUpdateSchema } from "drizzle-zod"
import z4 from "zod/v4"

export const createCourseSchema = createInsertSchema(courseTable)
  .pick({
    semesterId: true,
    name: true,
  })
  .refine(
    (schema) => {
      schema.name = schema.name.trim()

      return schema.name.length > 4
    },
    {
      error: "El nombre del curso debe tener más de 4 caracteres",
      path: ["name"],
    }
  )
export type CreateCourse = z4.infer<typeof createCourseSchema>

export const updateCourseSchema = createUpdateSchema(courseTable)
  .pick({
    id: true,
    semesterId: true,
    name: true,
  })
  .required({
    id: true,
    semesterId: true,
    name: true,
  })
  .refine(
    (schema) => {
      schema.name = schema.name.trim()

      return schema.name.length > 4
    },
    {
      error: "El nombre del curso debe tener más de 4 caracteres",
      path: ["name"],
    }
  )
export type UpdateCourse = z4.infer<typeof updateCourseSchema>

export const deleteCourseSchema = updateCourseSchema.pick({ id: true })
export type DeleteCourse = z4.infer<typeof deleteCourseSchema>
