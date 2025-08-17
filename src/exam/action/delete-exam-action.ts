import { db } from "@/core/repository"
import { courseTable } from "@/course/schema/course-schema"
import { examTable } from "@/exam/schema/exam-schema"
import { type DeleteExam } from "@/exam/validation/exam-validation"
import { semesterTable } from "@/semester/schema/semester-schema"
import { z } from "astro/zod"
import { defineAction } from "astro:actions"
import { count, sql } from "drizzle-orm"

// Action
export const deleteExamAction = defineAction({
  input: z.object({ id: z.number() }) satisfies z.ZodType<DeleteExam>,
  async handler(input, ctx) {
    // Check if the user is the exam owner
    const [hasExamCountQueryResult] = await db
      .select({ count: count() })
      .from(examTable)
      .innerJoin(courseTable, sql`${courseTable.id} = ${examTable.courseId}`)
      .innerJoin(
        semesterTable,
        sql`${semesterTable.id} = ${courseTable.semesterId}`
      )
      .where(
        sql`${examTable.id} = ${input.id}
            AND ${semesterTable.userCode} = ${ctx.locals.user.code}`
      )
    const { count: hasExamCount } = hasExamCountQueryResult ?? {
      count: 0,
    }

    if (hasExamCount === 0)
      return {
        success: false,
        message: "No tienes permiso para eliminar este examen.",
      }

    // Remove the exam
    await db.delete(examTable).where(sql`${examTable.id} = ${input.id}`)

    return {
      success: true,
      message: "¡Curso eliminado correctamente!",
    }
  },
})
