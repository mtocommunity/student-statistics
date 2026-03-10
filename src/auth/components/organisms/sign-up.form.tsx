import { authClient } from "@/auth/client/auth-client"
import { SignUp } from "@/auth/request/sign-up-request"
import { Button } from "@/core/components/ui/button"
import { ControlledInput } from "@/form/components/controlled/controlled-input"
import { ControlledPasswordInput } from "@/form/components/controlled/controlled-password-input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { TbUser } from "react-icons/tb"

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

  const onSubmit = handleSubmit(async (data) => {
    await authClient.signUp.email({
      email: data.email,
      name: data.name,
      password: data.password,
    })
  })

  return (
    <form className="grid w-full gap-3 text-sm" onSubmit={onSubmit}>
      <ControlledInput
        control={control}
        name="email"
        label="Email"
        inputProps={{
          placeholder: "C12345",
          autoComplete: "username",
          autoFocus: true,
        }}
        icon={TbUser}
      />

      <ControlledInput
        control={control}
        name="name"
        label="Nombre"
        inputProps={{
          placeholder: "Luis",
          autoComplete: "name",
        }}
      />

      <ControlledPasswordInput
        control={control}
        name="password"
        label="Contraseña"
      />

      <ControlledPasswordInput
        control={control}
        name="confirmPassword"
        label="Confirmar contraseña"
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
