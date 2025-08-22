import type { ExamTable } from "@/exam/schema/exam-schema"
import { z } from "zod/v4"

// Schemas
export const excelFormatSchema = z
  .object({
    maxScorePerQuestion: z.array(z.coerce.number().min(0)),
    studentNames: z.array(z.string()),
    scores: z.array(
      z.array(z.coerce.number().min(0).max(100).nullable().catch(null))
    ),
  })
  .refine(
    (data) => {
      const { studentNames, scores } = data

      return studentNames.length === scores.length
    },
    {
      error:
        "La cantidad de estudiantes debe ser consistente con la cantidad de puntajes por pregunta",
      path: ["maxScorePerQuestion"],
    }
  )
  .refine(
    (data) => {
      const { maxScorePerQuestion, scores } = data

      return scores.every(
        (studentScores) => studentScores.length === maxScorePerQuestion.length
      )
    },
    {
      error:
        "La cantidad de preguntas debe ser consistente con la cantidad de puntajes",
      path: ["scores"],
    }
  )
  // Remove the first row if all the scores are undefined (headers)
  .transform((data) => {
    const firstScoreIsUndefined = data.scores[0]?.every(
      (score) => score === null
    )

    if (firstScoreIsUndefined) {
      data.studentNames.shift()
      data.scores.shift()
    }

    return data
  })
  .superRefine((data, ctx) => {
    const { maxScorePerQuestion, scores } = data

    scores.forEach((studentScores, studentIndex) =>
      studentScores.forEach((score, questionIndex) => {
        const maxScore = maxScorePerQuestion[questionIndex]!

        if (score !== null && score > maxScore)
          ctx.addIssue({
            code: "custom",
            message: `El puntaje del estudiante ${studentIndex + 1} en la pregunta ${questionIndex + 1} no puede ser mayor al puntaje máximo (${maxScore})`,
          })
      })
    )
  }) satisfies z.ZodType<ExamTable>
