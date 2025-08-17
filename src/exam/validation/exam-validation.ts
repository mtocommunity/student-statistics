import { examTable } from "@/exam/schema/exam-schema"
import { createInsertSchema, createUpdateSchema } from "drizzle-zod"
import type z4 from "zod/v4"

export const createExamSchema = createInsertSchema(examTable)
  .pick({
    courseId: true,
    name: true,
    minPassingScore: true,
  })
  .refine(
    (schema) => {
      schema.name = schema.name.trim()

      return schema.name.length > 4
    },
    {
      error: "El nombre del examen debe tener más de 4 caracteres",
      path: ["name"],
    }
  )
export type CreateExam = z4.infer<typeof createExamSchema>

export const updateExamSchema = createUpdateSchema(examTable)
  .pick({
    id: true,
    courseId: true,
    name: true,
    minPassingScore: true,
  })
  .required({
    id: true,
    courseId: true,
    name: true,
    minPassingScore: true,
  })
  .refine(
    (schema) => {
      schema.name = schema.name.trim()

      return schema.name.length > 4
    },
    {
      error: "El nombre del examen debe tener más de 4 caracteres",
      path: ["name"],
    }
  )
export type UpdateExam = z4.infer<typeof updateExamSchema>

export const deleteExamSchema = updateExamSchema.pick({
  id: true,
})
export type DeleteExam = z4.infer<typeof deleteExamSchema>
