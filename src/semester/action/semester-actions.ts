import { db } from "@/core/repository"
import { semesterTable } from "@/semester/schema/semester-schema"
import { createSemesterSchema } from "@/semester/validation/semester-validation"
import { z } from "astro/zod"
import { defineAction } from "astro:actions"
import type z4 from "zod/v4"

export const semesterActions = {
  create: defineAction({
    input: z.object({ name: z.string() }) satisfies z.ZodType<
      z4.infer<typeof createSemesterSchema>
    >,
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
  }),
}
