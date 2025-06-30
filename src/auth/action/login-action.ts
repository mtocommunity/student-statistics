import { Login } from "@/auth/schema/login-schema";
import { jwtSecretEncoded } from "@/config";
import { db } from "@/core/repository";
import logger from "@/logger";
import { UserPublic, UserTable } from "@/user/schema/user-schema";
import type { ZodIssue } from "astro/zod";
import { ActionInputError, defineAction } from "astro:actions";
import { eq } from "drizzle-orm";
import { EncryptJWT } from "jose";
import picocolors from "picocolors";

// Errors
const invalidCredentialsError: ZodIssue = {
  message: "Usuario o contraseña incorrectos.",
  code: "custom",
  path: ["code"],
};

// Action

export const loginAction = defineAction({
  input: Login,
  async handler({ code, password }, { clientAddress, cookies }) {
    logger.info(
      picocolors.blueBright(`<${clientAddress}>`),
      "Login triggered with input:",
      { code },
    );

    // Verify if the user exists
    const user = (
      await db.select().from(UserTable).where(eq(UserTable.code, code)).limit(1)
    )[0];
    logger.info(user);

    if (!user) {
      logger.warn(
        picocolors.yellowBright(`<${clientAddress}>`),
        "User not found:",
        { code },
      );

      throw new ActionInputError([invalidCredentialsError]);
    }

    // Check password
    const isPasswordValid = await Bun.password.verify(
      password,
      user.password,
      "bcrypt",
    );

    if (!isPasswordValid) {
      logger.warn(
        picocolors.yellowBright(`<${clientAddress}>`),
        "Invalid password:",
        { code },
      );
      throw new ActionInputError([invalidCredentialsError]);
    }

    // Generate jwt token
    const token = await new EncryptJWT({
      code: user.code,
      name: user.name,
      lastname: user.lastname,
    } satisfies UserPublic)
      .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
      .setIssuedAt()
      .setExpirationTime("1y")
      .encrypt(jwtSecretEncoded);

    // Add jwt to the cookies
    cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });

    logger.info(
      picocolors.greenBright(`<${clientAddress}>`),
      "Login successful:",
      { code },
    );

    return {
      message: "Inicio de sesión exitoso.",
    };
  },
});
