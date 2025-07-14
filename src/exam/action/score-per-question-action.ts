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

export const scorePerQuestionAction = defineAction({
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

    const data = await db
      .select()
      .from(questionTable)
      .where(eq(questionTable.examId, examId))
      .leftJoin(answerTable, eq(questionTable.id, answerTable.questionId))

    const questionsScore = new Map<number, number[]>()

    data.forEach((row) => {
      const actualScore = questionsScore.get(row.question.id) ?? []
      if (`${row.answer?.score}` === "NULL") actualScore.push(0)
      else actualScore.push(row.answer?.score ?? 0)
      questionsScore.set(row.question.id, actualScore)
    })

    return {
      questions: questionsScore
        .entries()
        .map(([questionId, scores], i) => ({
          questionId,
          scores,
          nOrder: i + 1,
        }))
        .toArray(),
    }
  },
})
