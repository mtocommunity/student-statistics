import { z } from "astro/zod";

export const Login = z.object({
  code: z.string().regex(/^[C][0-9]{5}$/, {
    message: "El código debe comenzar con 'C' seguido de 5 dígitos",
  }),
  password: z.string().min(6),
});
export type Login = z.infer<typeof Login>;
