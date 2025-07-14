import { registerSchema } from "@/auth/schema/register-schema"
import { jwtSecretEncoded } from "@/config"
import { db } from "@/core/repository"
import logger from "@/logger"
import { userTable, type UserPublic } from "@/user/schema/user-schema"
import type { ZodIssue } from "astro/zod"
import { ActionError, ActionInputError, defineAction } from "astro:actions"
import { SQLiteError } from "bun:sqlite"
import { EncryptJWT } from "jose"
import picocolors from "picocolors"

// Errors
const codeAlreadyExistsError: ZodIssue = {
  code: "custom",
  message: "El código ya está en uso.",
  path: ["code"],
}
const passwordMismatchError: ZodIssue = {
  code: "custom",
  message: "Las contraseñas no coinciden.",
  path: ["confirmPassword"],
}

// Action
export const registerAction = defineAction({
  input: registerSchema,
  async handler(
    { code, name, lastname, password, confirmPassword },
    { clientAddress, cookies }
  ) {
    logger.info(
      picocolors.blueBright(`<${clientAddress}>`),
      "Register action triggered with input:",
      { code, name, lastname, password }
    )

    // Save to the database
    if (password !== confirmPassword)
      throw new ActionInputError([passwordMismatchError])

    try {
      const insertedUser = (
        await db
          .insert(userTable)
          .values({
            code,
            name,
            lastname,
            password: await Bun.password.hash(password, "bcrypt"),
          })
          .returning()
      )[0]!

      logger.info(
        picocolors.greenBright(`<${clientAddress}>`),
        "User registered successfully:",
        {
          code: insertedUser.code,
          name: insertedUser.name,
          lastname: insertedUser.lastname,
        }
      )

      // Login the user
      const token = await new EncryptJWT({
        code: insertedUser.code,
        name: insertedUser.name,
        lastname: insertedUser.lastname,
      } as UserPublic)
        .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
        .setIssuedAt()
        .setExpirationTime("1y")
        .encrypt(jwtSecretEncoded)

      // Add jwt to the cookies
      cookies.set("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 365, // 1 year
      })

      logger.info(
        picocolors.greenBright(`<${clientAddress}>`),
        "JWT token generated and set in cookies."
      )

      return {
        message: "Usuario registrado exitosamente.",
      }
    } catch (error) {
      if (error instanceof SQLiteError) {
        if (error.code === "SQLITE_CONSTRAINT_PRIMARYKEY")
          throw new ActionInputError([codeAlreadyExistsError])
      }

      logger.error(
        picocolors.redBright(`<${clientAddress}>`),
        "Error during registration:",
        error
      )

      throw new ActionError({
        message:
          "Error al registrar el usuario. Por favor, intenta nuevamente.",
        code: "INTERNAL_SERVER_ERROR",
      })
    }
  },
})
