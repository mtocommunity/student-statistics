import { z } from "astro/zod"

export const loginSchema = z.object({
  code: z
    .string()
    .transform((value) => value.trim().toUpperCase())
    .refine((value) => /^[C][0-9]{5}$/.test(value), {
      message: "El código debe comenzar con 'C' seguido de 5 dígitos",
    }),
  password: z.string().min(6),
})
export type LoginData = z.infer<typeof loginSchema>
