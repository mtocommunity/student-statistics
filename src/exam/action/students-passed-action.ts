import { db } from "@/core/database"
import { serverLog } from "@/core/log/server-logger"
import { examTable } from "@/exam/schema/exam-schema"
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
export const studentsPassedAction = defineAction({
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

    // TODO: Adapt to the new relationship
    // const questions = await db
    //   .select()
    //   .from(questionTable)
    //   .where(eq(questionTable.examId, examId))
    //   .leftJoin(answerTable, eq(questionTable.id, answerTable.questionId))

    // questions.forEach((question) => {
    //   const actualScore =
    //     studentsScore.get(question.answer?.studentCode as string) ?? 0
    //   studentsScore.set(
    //     question.answer?.studentCode as string,
    //     actualScore + (question.answer?.score ?? 0)
    //   )
    // })

    let studentsPassed = 0
    const studentsScore = new Map<string, number>()

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
