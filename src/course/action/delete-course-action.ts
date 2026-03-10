import { db } from "@/core/database"
import { courseTable } from "@/course/schema/course-schema"
import { DeleteCourse } from "@/course/validation/course-validation"
import { semesterTable } from "@/semester/schema/semester-schema"
import { z } from "astro/zod"
import { defineAction } from "astro:actions"
import { count, sql } from "drizzle-orm"

// Action
export const deleteCourseAction = defineAction({
  input: z.object({ id: z.number() }) satisfies z.ZodType<DeleteCourse>,
  async handler(input, ctx) {
    // Check if the user is the course owner
    const [hasCourseCountQueryResult] = await db
      .select({ count: count() })
      .from(courseTable)
      .leftJoin(
        semesterTable,
        sql`${semesterTable.id} = ${courseTable.semesterId}`
      )
      .where(
        sql`
          ${courseTable.id} = ${input.id} AND
          ${semesterTable.userId} = ${ctx.locals.user.id}`
      )
    const { count: hasCourseCount } = hasCourseCountQueryResult ?? {
      count: 0,
    }

    if (hasCourseCount === 0)
      return {
        success: false,
        message: "No tienes permisos para eliminar este curso.",
      }

    // Remove the course
    await db.delete(courseTable).where(sql`${courseTable.id} = ${input.id}`)

    return {
      success: true,
      message: "¡Curso eliminado correctamente!",
    }
  },
})
