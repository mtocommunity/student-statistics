import { Login } from "@/auth/schema/login-schema";
import { defineAction } from "astro:actions";

export const loginAction = defineAction({
  input: Login,
  async handler(login) {
    console.log("Login action triggered with input:", login);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  },
});
