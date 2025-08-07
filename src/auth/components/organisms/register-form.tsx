import {
  registerSchema,
  type RegisterData,
} from "@/auth/schema/register-schema"
import { Button } from "@/core/components/atoms/button"
import { PasswordInput } from "@/form/components/molecules/password-input"
import { TextInput } from "@/form/components/molecules/text-input"
import { ReactComponent as User } from "@assets/svg/lu-user.svg"
import { zodResolver } from "@hookform/resolvers/zod"
import { actions, isInputError } from "astro:actions"
import { navigate } from "astro:transitions/client"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

// Component
export function RegisterForm() {
  // Button
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  // Form
  const { control, handleSubmit, setError } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      code: "",
      name: "",
      lastname: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (register: RegisterData) => {
    buttonRef.current?.setAttribute("data-loading", "")

    const { error } = await actions.auth.register(register)

    if (!error) {
      buttonRef.current?.removeAttribute("data-loading")

      toast.success(`¡Bienvenido, ${register.name}!`)
      navigate("/")

      return
    }

    if (isInputError(error)) {
      type ErrorFields = keyof typeof error.fields
      const fields = Object.keys(error.fields) as ErrorFields[]

      for (const field of fields) {
        setError(field, {
          type: "validate",
          message: error.fields[field]![0],
        })
      }
    }

    buttonRef.current?.removeAttribute("data-loading")
  }

  return (
    <form
      className="grid w-full gap-3 text-sm"
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

      <TextInput
        control={control}
        name="name"
        label="Nombre"
        inputProps={{
          placeholder: "Luis",
          autoComplete: "name",
        }}
      />

      <TextInput
        control={control}
        name="lastname"
        label="Apellidos"
        inputProps={{
          placeholder: "Bazán",
          autoComplete: "name",
        }}
      />

      <PasswordInput control={control} name="password" label="Contraseña" />

      <PasswordInput
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
