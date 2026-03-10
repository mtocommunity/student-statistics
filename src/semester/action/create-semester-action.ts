import { db } from "@/core/database"
import { type InsertSemester } from "@/semester/model/semester-model"
import { semesterTable } from "@/semester/schema/semester-schema"
import { z } from "astro/zod"
import { defineAction } from "astro:actions"

// Action
export const createSemesterAction = defineAction({
  input: z.object({ name: z.string() }) satisfies z.ZodType<InsertSemester>,
  async handler(input, ctx) {
    const [createdSemester] = await db
      .insert(semesterTable)
      .values({
        name: input.name,
        userCode: ctx.locals.user.code,
      })
      .returning()

    return {
      success: true,
      message: "¡Ciclo creado correctamente!",
      url: `/semesters/${createdSemester!.id}/courses`,
    }
  },
})
