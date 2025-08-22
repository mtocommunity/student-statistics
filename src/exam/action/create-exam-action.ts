import { db } from "@/core/repository"
import { courseTable } from "@/course/schema/course-schema"
import { answerTable } from "@/exam/schema/answer-schema"
import { examTable, type Exam } from "@/exam/schema/exam-schema"
import { questionTable } from "@/exam/schema/question-schema"
import { semesterTable } from "@/semester/schema/semester-schema"
import { studentTable } from "@/student/schema/student-schema"
import { z } from "astro/zod"
import { defineAction } from "astro:actions"
import { sql } from "drizzle-orm"

// Action
export const createExamAction = defineAction({
  input: z.object({
    name: z.string(),
    courseId: z.number(),
    minPassingScore: z.number().min(1).optional(),
    examTable: z.object({
      maxScorePerQuestion: z.array(z.coerce.number().min(0)),
      studentNames: z.array(z.string()),
      scores: z.array(
        z.array(z.coerce.number().min(0).max(100).nullable().catch(null))
      ),
    }),
  }),
  async handler(input, ctx) {
    // Check if the user is the course owner
    const [semesterIdQueryResult] = await db
      .select({ semesterId: courseTable.semesterId })
      .from(courseTable)
      .leftJoin(
        semesterTable,
        sql`${courseTable.semesterId} = ${semesterTable.id}`
      )
      .where(
        sql`${courseTable.id} = ${input.courseId}
            AND ${semesterTable.userCode} = ${ctx.locals.user.code}`
      )
    const { semesterId } = semesterIdQueryResult ?? {}

    if (!semesterId)
      return {
        success: false,
        message: "No tienes permisos para crear un examen en este curso.",
      }

    // TODO: Rollback doesn't work as expected
    const createdExamId = await db.transaction(async (tx) => {
      // Create the exam
      const createdExam = (
        await tx
          .insert(examTable)
          .values({
            name: input.name,
            courseId: input.courseId,
            minPassingScore: input.minPassingScore,
          })
          .returning()
      )[0] as Exam

      // Create the question and student batches
      const questionsToInsert = input.examTable.maxScorePerQuestion.map(
        (maxScore, index) => ({
          nOrder: index,
          maxScore,
          examId: createdExam.id,
        })
      )
      const studentsToInsert = input.examTable.studentNames.map(
        (studentName) => ({
          name: studentName,
        })
      )

      // Insert them in batch
      const [createdQuestions, createdStudents] = await Promise.all([
        tx.insert(questionTable).values(questionsToInsert).returning(),
        tx.insert(studentTable).values(studentsToInsert).returning(),
      ])

      // Create the answers batch and insert it
      console.log({ xd: input.examTable.scores })
      const answersToInsert = createdQuestions.flatMap(
        (question, questionIndex) =>
          createdStudents.map((student, studentIndex) => ({
            questionId: question.id,
            studentId: student.id,
            score: input.examTable.scores[studentIndex]![questionIndex]!,
          }))
      )

      await tx.insert(answerTable).values(answersToInsert)

      return createdExam!.id
    })

    return {
      success: true,
      message: "¡Examen creado correctamente!",
      url: `/semesters/${semesterId}/courses/${input.courseId}/exams/${createdExamId}`,
    }
  },
})
