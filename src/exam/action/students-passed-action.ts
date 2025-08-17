import { db } from "@/core/repository"
import { answerTable } from "@/exam/schema/answer-schema"
import { examTable } from "@/exam/schema/exam-schema"
import { questionTable } from "@/exam/schema/question-schema"
import { statisticsSchema } from "@/exam/schema/statistics-schema"
import logger from "@/logger"
import type { ZodIssue } from "astro/zod"
import { ActionInputError, defineAction } from "astro:actions"
import { eq } from "drizzle-orm"
import picocolors from "picocolors"

// Errors
const examNotFoundError: ZodIssue = {
  message: "Examen no encontrado.",
  code: "custom",
  path: ["exam"],
}

// Action
export const studentsPassedAction = defineAction({
  input: statisticsSchema,
  async handler({ examId }, { clientAddress }) {
    const exam = (
      await db.select().from(examTable).where(eq(examTable.id, examId)).limit(1)
    )[0]

    if (!exam) {
      logger.warn(
        picocolors.yellowBright(`<${clientAddress}>`),
        "Exam not found:",
        { examId }
      )

      throw new ActionInputError([examNotFoundError])
    }

    const questions = await db
      .select()
      .from(questionTable)
      .where(eq(questionTable.examId, examId))
      .leftJoin(answerTable, eq(questionTable.id, answerTable.questionId))

    const studentsScore = new Map<string, number>()

    questions.forEach((question) => {
      const actualScore =
        studentsScore.get(question.answer?.studentCode as string) ?? 0
      studentsScore.set(
        question.answer?.studentCode as string,
        actualScore + (question.answer?.score ?? 0)
      )
    })

    let studentsPassed = 0

    studentsScore.forEach((score) => {
      if (score >= exam.minPassingScore) {
        studentsPassed++
      }
    })

    return {
      studentsPassed,
      totalStudents: studentsScore.size,
    }
  },
})
