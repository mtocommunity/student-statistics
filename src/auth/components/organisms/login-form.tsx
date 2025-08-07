import { loginSchema, type LoginData } from "@/auth/schema/login-schema"
import { Button } from "@/core/components/atoms/button"
import { PasswordInput } from "@/form/components/molecules/password-input"
import { TextInput } from "@/form/components/molecules/text-input"
import { ReactComponent as User } from "@assets/svg/lu-user.svg"
import { zodResolver } from "@hookform/resolvers/zod"
import { actions } from "astro:actions"
import { navigate } from "astro:transitions/client"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

// Component
export function LoginForm() {
  // Button
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  // Form
  const { control, handleSubmit } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      code: "",
      password: "",
    },
  })

  const onSubmit = async (login: LoginData) => {
    buttonRef.current?.setAttribute("data-loading", "")

    const { error } = await actions.auth.login(login)

    if (error) {
      if (error.code === "INTERNAL_SERVER_ERROR")
        toast.error(
          "Ocurrió un error en el servidor. Por favor, intenta nuevamente más tarde."
        )
      else
        toast.error(
          "Por favor, verifica tus credenciales e intenta nuevamente."
        )
    } else navigate("/")

    buttonRef.current?.removeAttribute("data-loading")
  }

  return (
    <form
      className="flex w-full flex-col gap-3 text-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        control={control}
        name="code"
        label="Código"
        inputProps={{
          placeholder: "C12345",
          autoComplete: "username",
          autoFocus: true,
        }}
        icon={User}
      />

      <PasswordInput control={control} name="password" label="Contraseña" />

      <Button
        ref={buttonRef}
        className="mt-2"
        style={{ viewTransitionName: "auth-button" }}
        type="submit"
      >
        Ingresar
      </Button>

      <a className="block text-right text-xs" href="/forgot-password">
        ¿Olvidaste tu contraseña?
      </a>
    </form>
  )
}
