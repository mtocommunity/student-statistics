import { authClient } from "@/auth/client/auth-client"
import { SignIn } from "@/auth/request/sign-in-request"
import { Button } from "@/core/components/ui/button"
import { ControlledInput } from "@/form/components/controlled/controlled-input"
import { ControlledPasswordInput } from "@/form/components/controlled/controlled-password-input"
import { zodResolver } from "@hookform/resolvers/zod"
import { navigate } from "astro:transitions/client"
import { useForm } from "react-hook-form"

// Component
export function LoginForm() {
  // Form
  const { control, handleSubmit } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(SignIn),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    await authClient.signIn.email(data)

    navigate("/")
  })

  return (
    <form className="flex w-full flex-col gap-3 text-sm" onSubmit={onSubmit}>
      <ControlledInput
        control={control}
        name="email"
        label="Correo electrónico"
        inputProps={{
          placeholder: "yo@ejemplo.com",
          autoComplete: "email",
          autoFocus: true,
        }}
      />

      <ControlledPasswordInput
        control={control}
        name="password"
        label="Contraseña"
      />

      <Button
        type="submit"
        className="mt-2"
        style={{ viewTransitionName: "auth-button" }}
      >
        Ingresar
      </Button>

      <a className="block text-right text-xs" href="/forgot-password">
        ¿Olvidaste tu contraseña?
      </a>
    </form>
  )
}
