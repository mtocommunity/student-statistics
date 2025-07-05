import { z } from "astro/zod";

export const loginSchema = z
  .object({
    code: z.string().regex(/^[C][0-9]{5}$/, {
      message: "El código debe comenzar con 'C' seguido de 5 dígitos",
    }),
    password: z.string().min(6),
  })
  .transform((data) => ({
    ...data,
    code: data.code.toUpperCase(),
  }));
export type LoginData = z.infer<typeof loginSchema>;
