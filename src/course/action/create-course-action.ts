import { db } from "@/core/repository"
import { courseTable } from "@/course/schema/course-schema"
import { type CreateCourse } from "@/course/validation/course-validation"
import { semesterTable } from "@/semester/schema/semester-schema"
import { z } from "astro/zod"
import { defineAction } from "astro:actions"
import { sql } from "drizzle-orm"

// Action
export const createCourseAction = defineAction({
  input: z.object({
    name: z.string(),
    semesterId: z.number(),
  }) satisfies z.ZodType<CreateCourse>,
  async handler(input, ctx) {
    // Check if the user is the semester owner
    const [semester] = await db
      .select()
      .from(semesterTable)
      .where(
        sql`
          ${semesterTable.id} = ${input.semesterId}
          AND ${semesterTable.userCode} = ${ctx.locals.user.code}`
      )

    if (!semester)
      return {
        success: false,
        message: "No tienes permisos para crear un curso en este ciclo.",
      }

    // Create the course
    const [createdCourse] = await db
      .insert(courseTable)
      .values({
        name: input.name,
        semesterId: input.semesterId,
      })
      .returning()

    return {
      success: true,
      message: "¡Curso creado correctamente!",
      url: `/semesters/${input.semesterId}/courses/${createdCourse!.id}`,
    }
  },
})
