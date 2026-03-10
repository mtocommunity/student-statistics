import { db } from "@/core/database"
import { serverLog } from "@/core/log/server-logger"
import { answerTable } from "@/exam/schema/answer-schema"
import { examTable } from "@/exam/schema/exam-schema"
import { questionTable } from "@/exam/schema/question-schema"
import { Statistics } from "@/exam/schema/statistics-schema"
import { ActionError, defineAction } from "astro:actions"
import { eq } from "drizzle-orm"

// Errors
const examNotFoundInputError = {
  type: "AstroActionInputError",
  issues: [
    {
      message: "Examen no encontrado.",
      code: "custom",
      path: ["exam"],
    },
  ],
}

// Action
export const scorePerQuestionAction = defineAction({
  input: Statistics,
  async handler({ examId }) {
    const exam = (
      await db.select().from(examTable).where(eq(examTable.id, examId)).limit(1)
    )[0]

    if (!exam) {
      serverLog.warn("Exam not found: %s", examId)

      throw ActionError.fromJson({
        type: "AstroActionInputError",
        issues: examNotFoundInputError,
      })
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
