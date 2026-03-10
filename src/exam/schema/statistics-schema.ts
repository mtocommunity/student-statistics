import { z } from "astro/zod"

export const Statistics = z.object({
  examId: z.number().int().positive(),
})
export type StatisticsData = z.infer<typeof Statistics>
