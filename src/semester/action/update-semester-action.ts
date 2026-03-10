import { db } from "@/core/database"
import { type UpdateSemester } from "@/semester/model/semester-model"
import { semesterTable } from "@/semester/schema/semester-schema"
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
        sql`${semesterTable.id} = ${input.id} AND ${semesterTable.userId} = ${ctx.locals.user.id}`
      )
      .returning()

    console.log(updatedSemester)

    return {
      success: true,
      message: "¡Ciclo actualizado correctamente!",
    }
  },
})
