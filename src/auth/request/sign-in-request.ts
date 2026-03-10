import z from "zod"

// Schema
export const SignIn = z.object({
  email: z.email({ error: "Correo electrónico inválido" }),
  password: z
    .string()
    .min(6, { error: "La contraseña debe de tener más de 6 dígitos" }),
})
