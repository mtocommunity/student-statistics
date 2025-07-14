import { z } from "astro/zod"

export const statisticsSchema = z.object({
  examId: z.number().int().positive(),
})
export type StatisticsData = z.infer<typeof statisticsSchema>
