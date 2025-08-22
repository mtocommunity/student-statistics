import { examTable } from "@/exam/schema/exam-schema"
import { createInsertSchema, createUpdateSchema } from "drizzle-zod"
import z4 from "zod/v4"

// Validations
export let createExamSchema = createInsertSchema(examTable).pick({
  courseId: true,
  name: true,
  minPassingScore: true,
})
createExamSchema = createExamSchema.extend({
  minPassingScore: createExamSchema.shape.minPassingScore
    .unwrap()
    .min(0)
    .optional(),
}) // Make min passing score greater than or equal to 0
export type CreateExam = z4.infer<typeof createExamSchema>

export const createExamWithExcelSchema = createExamSchema
  .extend({
    file: z4
      .file()
      .refine((file) => file.size < 5 * 1024 * 1024, {
        message: "El archivo debe ser menor de 5MB",
      })
      .refine(
        (file) =>
          file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        {
          message: "El archivo debe ser un Excel (o equivalente)",
        }
      ),
  })
  .refine(
    (schema) => {
      schema.name = schema.name.trim()

      return schema.name.length > 3
    },
    {
      error: "El nombre del examen debe tener más de 3 caracteres",
      path: ["name"],
    }
  )
export type CreateExamenWithExcel = z4.infer<typeof createExamWithExcelSchema>

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
  .refine(
    (schema) =>
      schema.minPassingScore !== undefined ? schema.minPassingScore > 1 : true,
    {
      message: "La puntuación mínima debe ser mayor que 1",
      path: ["minPassingScore"],
    }
  )
export type UpdateExam = z4.infer<typeof updateExamSchema>

export const deleteExamSchema = updateExamSchema.pick({
  id: true,
})
export type DeleteExam = z4.infer<typeof deleteExamSchema>
