import { z } from "astro/zod"

export const PageQuery = z.coerce
  .number()
  .int()
  .min(1, {
    message: "El número de página debe ser un entero positivo",
  })
  .optional()
export type PageQuery = z.infer<typeof PageQuery>

export const SearchQuery = z
  .string({ message: "El contenido debe ser una cadena de texto" })
  .optional()
export type SearchQuery = z.infer<typeof SearchQuery>

export const OrderQuery = z
  .enum(["asc", "desc"], {
    message: "El orden debe ser 'asc' o 'desc'",
  })
  .optional()
export type OrderQuery = z.infer<typeof OrderQuery>
