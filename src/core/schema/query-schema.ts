import { z } from "astro/zod"

export const pageQuerySchema = z.coerce
  .number()
  .int()
  .min(1, {
    message: "El número de página debe ser un entero positivo",
  })
  .optional()
export type PageQuery = z.infer<typeof pageQuerySchema>

export const searchQuerySchema = z
  .string({ message: "El contenido debe ser una cadena de texto" })
  .optional()
export type SearchQuery = z.infer<typeof searchQuerySchema>

export const orderQuerySchema = z
  .enum(["asc", "desc"], {
    message: "El orden debe ser 'asc' o 'desc'",
  })
  .optional()
export type OrderQuery = z.infer<typeof orderQuerySchema>
