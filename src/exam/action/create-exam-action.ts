import { db } from "@/core/repository"
import { courseTable } from "@/course/schema/course-schema"
import { examTable } from "@/exam/schema/exam-schema"
import type { CreateExam } from "@/exam/validation/exam-validation"
import { semesterTable } from "@/semester/schema/semester-schema"
import { z } from "astro/zod"
import { defineAction } from "astro:actions"
import { sql } from "drizzle-orm"

// Action
export const createExamAction = defineAction({
  input: z.object({
    name: z.string(),
    courseId: z.number(),
    minPassingScore: z.number().min(1).optional(),
  }) satisfies z.ZodType<CreateExam>,
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

    // Create the exam
    const [createdExam] = await db
      .insert(examTable)
      .values({
        name: input.name,
        courseId: input.courseId,
        minPassingScore: input.minPassingScore,
      })
      .returning()

    return {
      success: true,
      message: "¡Examen creado correctamente!",
      url: `/semesters/${semesterId}/courses/${input.courseId}/exams/${createdExam!.id}`,
    }
  },
})
