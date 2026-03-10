import { authClient } from "@/auth/client/auth-client"
import { SignUp } from "@/auth/request/sign-up-request"
import { Button } from "@/core/components/ui/button"
import { ControlledInput } from "@/form/components/controlled/controlled-input"
import { ControlledPasswordInput } from "@/form/components/controlled/controlled-password-input"
import { zodResolver } from "@hookform/resolvers/zod"
import { navigate } from "astro:transitions/client"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { TbUser } from "react-icons/tb"
import { toast } from "sonner"

// Component
export function RegisterForm() {
  // Button
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  // Form
  const { control, handleSubmit } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(SignUp),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = handleSubmit(async (input) => {
    const { data: signUpData } = await authClient.signUp.email({
      email: input.email,
      name: input.name,
      password: input.password,
    })

    if (signUpData) {
      navigate("/")
      toast.success(`¡Bienvenido, ${signUpData.user.name}!`)
    }
  })

  return (
    <form className="grid w-full gap-3 text-sm" onSubmit={onSubmit}>
      <ControlledInput
        control={control}
        name="email"
        label="Email"
        inputProps={{
          placeholder: "yo@email.com",
          autoComplete: "email",
          autoFocus: true,
        }}
        icon={TbUser}
      />

      <ControlledInput
        control={control}
        name="name"
        label="Nombre"
        inputProps={{
          placeholder: "Nombre",
          autoComplete: "name",
        }}
      />

      <ControlledPasswordInput
        control={control}
        name="password"
        label="Contraseña"
        inputProps={{
          placeholder: "••••••••",
          autoComplete: "new-password",
        }}
      />

      <ControlledPasswordInput
        control={control}
        name="confirmPassword"
        label="Confirmar contraseña"
        inputProps={{
          placeholder: "••••••••",
          autoComplete: "new-password",
        }}
      />

      <Button
        ref={buttonRef}
        className="mt-2"
        style={{ viewTransitionName: "auth-button" }}
        type="submit"
      >
        Registrarme
      </Button>
    </form>
  )
}
