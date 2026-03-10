import { examTable } from "@/exam/schema/exam-schema"
import { createInsertSchema, createUpdateSchema } from "drizzle-zod"
import z from "zod"

// Validations
export let InsertExam = createInsertSchema(examTable, {
  name: (schema) =>
    schema.trim().min(3, {
      message: "El nombre del examen debe tener más de 3 caracteres",
    }),
}).pick({
  courseId: true,
  name: true,
  minPassingScore: true,
})
InsertExam = InsertExam.extend({
  minPassingScore: InsertExam.shape.minPassingScore.unwrap().min(0).optional(),
}) // Make min passing score greater than or equal to 0
export type InsertExam = z.infer<typeof InsertExam>

export const InsertExamWithExcel = InsertExam.extend({
  file: z
    .file()
    .mime(
      ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
      {
        error: "El archivo debe ser un Excel (o equivalente)",
      }
    )
    .max(5 * 1024 * 1024, {
      error: "El archivo debe ser menor de 5MB",
    }),
})
export type InsertExamenWithExcel = z.infer<typeof InsertExamWithExcel>

export const UpdateExam = createUpdateSchema(examTable)
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
export type UpdateExam = z.infer<typeof UpdateExam>

export const DeleteExam = UpdateExam.pick({
  id: true,
})
export type DeleteExam = z.infer<typeof DeleteExam>
