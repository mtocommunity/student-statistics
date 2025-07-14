import { z } from "astro/zod"

// Schemas
export const registerSchema = z
  .object({
    code: z
      .string()
      .transform((value) => value.trim().toUpperCase())
      .refine((value) => /^[C][0-9]{5}$/.test(value), {
        message: "El código debe comenzar con 'C' seguido de 5 dígitos",
      }),
    name: z.string().min(2, {
      message: "El nombre debe tener al menos 2 caracteres",
    }),
    lastname: z.string().min(2, {
      message: "El apellido debe tener al menos 2 caracteres",
    }),
    password: z.string().min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
    confirmPassword: z.string().min(6, {
      message:
        "La confirmación de la contraseña debe tener al menos 6 caracteres",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  })
  .transform((data) => ({
    ...data,
    name: data.name.trim(),
    lastname: data.lastname.trim(),
  }))
export type RegisterData = z.infer<typeof registerSchema>
