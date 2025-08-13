import { db } from "@/core/repository"
import { courseTable } from "@/course/schema/course-schema"
import { type UpdateCourse } from "@/course/validation/course-validation"
import { semesterTable } from "@/semester/schema/semester-schema"
import { z } from "astro/zod"
import { defineAction } from "astro:actions"
import { count, sql } from "drizzle-orm"

// Action
export const updateCourseAction = defineAction({
  input: z.object({
    id: z.number(),
    name: z.string(),
    semesterId: z.number(),
  }) satisfies z.ZodType<UpdateCourse>,
  async handler(input, ctx) {
    // Check if the user is the semester owner
    const [hasSemesterCountQueryResult] = await db
      .select({ count: count() })
      .from(semesterTable)
      .where(
        sql`${semesterTable.id} = ${input.semesterId} AND ${semesterTable.userCode} = ${ctx.locals.user.code}`
      )
    const { count: hasSemesterCount } = hasSemesterCountQueryResult ?? {
      count: 0,
    }

    if (hasSemesterCount === 0)
      return {
        success: false,
        message: "No tienes permiso para actualizar este curso.",
      }

    // Update the course
    await db
      .update(courseTable)
      .set({
        name: input.name,
      })
      .where(sql`${courseTable.id} = ${input.id}`)

    return {
      success: true,
      message: "¡Curso actualizado correctamente!",
    }
  },
})
