import z from "zod"

// Schemas
export const SignUp = z
  .object({
    email: z
      .email({ error: "El correo electrónico no es válido" }),
    name: z.string().trim().min(2, {
      error: "El nombre debe tener al menos 2 caracteres",
    }),
    lastname: z.string().trim().min(2, {
      error: "El apellido debe tener al menos 2 caracteres",
    }),
    password: z.string().min(6, {
      error: "La contraseña debe tener al menos 6 caracteres",
    }),
    confirmPassword: z.string().min(6, {
      error:
        "La confirmación de la contraseña debe tener al menos 6 caracteres",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  })
export type SignUp = z.infer<typeof SignUp>
