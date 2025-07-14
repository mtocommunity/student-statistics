import { loginAction } from "@/auth/action/login-action"
import { registerAction } from "@/auth/action/register-action"

export const authAction = {
  login: loginAction,
  register: registerAction,
}
