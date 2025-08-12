import { db } from "@/core/repository"
import { semesterTable } from "@/semester/schema/semester-schema"
import { type UpdateSemester } from "@/semester/validation/semester-validation"
import { z } from "astro/zod"
import { defineAction } from "astro:actions"
import { sql } from "drizzle-orm"

// Action
export const updateSemesterAction = defineAction({
  input: z.object({
    id: z.number(),
    name: z.string(),
  }) satisfies z.ZodType<UpdateSemester>,
  async handler(input, ctx) {
    const [updatedSemester] = await db
      .update(semesterTable)
      .set({
        name: input.name,
      })
      .where(
        sql`${semesterTable.id} = ${input.id} AND ${semesterTable.userCode} = ${ctx.locals.user.code}`
      )
      .returning()

    console.log(updatedSemester)

    return {
      success: true,
      message: "¡Ciclo actualizado correctamente!",
    }
  },
})
