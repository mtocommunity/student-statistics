import { authFormStyles } from "@/auth/components/organisms/styles/auth-form-styles"
import {
  registerSchema,
  type RegisterData,
} from "@/auth/schema/register-schema"
import { Button } from "@/core/components/atoms/button"
import { cn } from "@/lib/tailwind"
import { ReactComponent as EyeOff } from "@assets/svg/lu-eye-off.svg"
import { ReactComponent as Eye } from "@assets/svg/lu-eye.svg"
import { ReactComponent as User } from "@assets/svg/lu-user.svg"
import { zodResolver } from "@hookform/resolvers/zod"
import { actions, isInputError } from "astro:actions"
import { navigate } from "astro:transitions/client"
import { useRef, useState } from "preact/hooks"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

// Styles
const { inputClassname, labelClassname, svgInputClassname } = authFormStyles

// Component
export function RegisterForm() {
  // Password
  const [showPassword, setPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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
      <label htmlFor="code" className={labelClassname}>
        Código
        <Controller
          control={control}
          name="code"
          render={({ field, fieldState: { error } }) => (
            <>
              <div className="relative">
                <input
                  id="code"
                  type="text"
                  placeholder="C12345"
                  className={inputClassname}
                  autoComplete="username"
                  autoFocus
                  {...field}
                  {...(error && { "aria-invalid": true })}
                />

                <User className={cn(svgInputClassname, "peer")} />
              </div>

              {error && (
                <span className="text-xs text-red-400">{error.message}</span>
              )}
            </>
          )}
        />
      </label>

      <label htmlFor="name" className={labelClassname}>
        Nombre
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState: { error } }) => (
            <>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  placeholder="Luis"
                  className={inputClassname}
                  autoComplete="name"
                  {...field}
                  {...(error && { "aria-invalid": true })}
                />
              </div>

              {error && (
                <span className="text-xs text-red-400">{error.message}</span>
              )}
            </>
          )}
        />
      </label>

      <label htmlFor="lastname" className={labelClassname}>
        Apellidos
        <Controller
          control={control}
          name="lastname"
          render={({ field, fieldState: { error } }) => (
            <>
              <div className="relative">
                <input
                  id="lastname"
                  type="text"
                  placeholder="Bazán"
                  className={inputClassname}
                  autoComplete="name"
                  {...field}
                  {...(error && { "aria-invalid": true })}
                />
              </div>

              {error && (
                <span className="text-xs text-red-400">{error.message}</span>
              )}
            </>
          )}
        />
      </label>

      <label htmlFor="password" className={labelClassname}>
        Contraseña
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState: { error } }) => (
            <>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className={inputClassname}
                  placeholder="••••••••"
                  {...field}
                  {...(error && { "aria-invalid": true })}
                />

                <Eye
                  class={cn(
                    svgInputClassname,
                    "z-10 peer-[[type=password]]:hidden hover:cursor-pointer"
                  )}
                  onClick={() => setPassword((prev) => !prev)}
                />
                <EyeOff
                  class={cn(
                    svgInputClassname,
                    "z-10 peer-[[type=text]]:hidden hover:cursor-pointer"
                  )}
                  onClick={() => setPassword((prev) => !prev)}
                />
              </div>

              {error && (
                <span className="text-xs text-red-400">{error.message}</span>
              )}
            </>
          )}
        />
      </label>

      <label htmlFor="confirmPassword" className={labelClassname}>
        Confirmar contraseña
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field, fieldState: { error } }) => (
            <>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className={inputClassname}
                  placeholder="••••••••"
                  {...field}
                  {...(error && { "aria-invalid": true })}
                />

                <Eye
                  class={cn(
                    svgInputClassname,
                    "z-10 peer-[[type=password]]:hidden hover:cursor-pointer"
                  )}
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                />
                <EyeOff
                  class={cn(
                    svgInputClassname,
                    "z-10 peer-[[type=text]]:hidden hover:cursor-pointer"
                  )}
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                />
              </div>

              {error && (
                <span className="text-xs text-red-400">{error.message}</span>
              )}
            </>
          )}
        />
      </label>

      <Button
        ref={buttonRef}
        className="mt-2"
        style={{ viewTransitionName: "auth-button" }}
      >
        Registrarme
      </Button>
    </form>
  )
}
