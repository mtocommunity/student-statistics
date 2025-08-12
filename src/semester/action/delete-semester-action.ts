import { db } from "@/core/repository"
import { semesterTable } from "@/semester/schema/semester-schema"
import { type DeleteSemester } from "@/semester/validation/semester-validation"
import { z } from "astro/zod"
import { defineAction } from "astro:actions"
import { sql } from "drizzle-orm"

// Action
export const deleteSemesterAction = defineAction({
  input: z.object({ id: z.number() }) satisfies z.ZodType<DeleteSemester>,
  async handler(input, ctx) {
    // Verify if the user is owner of the semester
    const [semesterToDelete] = await db
      .select()
      .from(semesterTable)
      .where(
        sql`${semesterTable.id} = ${input.id} AND ${semesterTable.userCode} = ${ctx.locals.user.code}`
      )

    if (!semesterToDelete)
      return {
        success: false,
        message: "¡Ciclo no encontrado o no autorizado!",
      }

    // Remove the semester
    await db.delete(semesterTable).where(sql`${semesterTable.id} = ${input.id}`)

    return {
      success: true,
      message: "¡Ciclo eliminado correctamente!",
    }
  },
})
