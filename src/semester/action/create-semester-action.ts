import { db } from "@/core/repository"
import { semesterTable } from "@/semester/schema/semester-schema"
import { type CreateSemester } from "@/semester/validation/semester-validation"
import { z } from "astro/zod"
import { defineAction } from "astro:actions"

// Action
export const createSemesterAction = defineAction({
  input: z.object({ name: z.string() }) satisfies z.ZodType<CreateSemester>,
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
      url: `/semesters/${createdSemester!.id}`,
    }
  },
})
