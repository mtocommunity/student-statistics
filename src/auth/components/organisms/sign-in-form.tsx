import { authClient } from "@/auth/client/auth-client"
import type { AuthErrorCode } from "@/auth/configuration/auth-configuration"
import { SignIn } from "@/auth/request/sign-in-request"
import { Button } from "@/core/components/ui/button"
import { ControlledInput } from "@/form/components/controlled/controlled-input"
import { ControlledPasswordInput } from "@/form/components/controlled/controlled-password-input"
import { zodResolver } from "@hookform/resolvers/zod"
import { navigate } from "astro:transitions/client"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

// Component
export function LoginForm() {
  // Form
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(SignIn),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = handleSubmit(async (input) => {
    const { data: signInData, error } = await authClient.signIn.email({
      email: input.email,
      password: input.password,
    })

    if (signInData) {
      navigate("/")
      toast.success(`¡Bienvenido de nuevo, ${signInData.user.name}!`)
    }

    if (error) {
      switch (error.code as AuthErrorCode) {
        case "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL":
          toast.error(
            "El usuario ya existe. Por favor, utiliza otro correo electrónico."
          )
          break

        default: {
          toast.error(
            "Error al iniciar sesión. Por favor, verifica tus credenciales e intenta nuevamente."
          )
        }
      }
    }
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
        inputProps={{
          placeholder: "••••••••",
          autoComplete: "current-password",
        }}
      />

      <Button
        type="submit"
        className="mt-2"
        style={{ viewTransitionName: "auth-button" }}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
      </Button>

      <a className="block text-right text-xs" href="/forgot-password">
        ¿Olvidaste tu contraseña?
      </a>
    </form>
  )
}
