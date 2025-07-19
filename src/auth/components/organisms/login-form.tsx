import { authFormStyles } from "@/auth/components/organisms/styles/auth-form-styles"
import { loginSchema, type LoginData } from "@/auth/schema/login-schema"
import { Button } from "@/core/components/atoms/button"
import { cn } from "@/lib/tailwind"
import { ReactComponent as EyeOff } from "@assets/svg/lu-eye-off.svg"
import { ReactComponent as Eye } from "@assets/svg/lu-eye.svg"
import { ReactComponent as User } from "@assets/svg/lu-user.svg"
import { zodResolver } from "@hookform/resolvers/zod"
import { actions } from "astro:actions"
import { navigate } from "astro:transitions/client"
import { useRef, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

const { inputClassname, labelClassname, svgInputClassname } = authFormStyles

export function LoginForm() {
  // Password
  const [showPassword, setPassword] = useState(false)

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
                  autoComplete="current-password"
                  {...field}
                  {...(error && { "aria-invalid": true })}
                />

                <Eye
                  className={cn(
                    svgInputClassname,
                    "z-10 peer-[[type=password]]:hidden hover:cursor-pointer"
                  )}
                  onClick={() => setPassword((prev) => !prev)}
                />
                <EyeOff
                  className={cn(
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

      <Button
        ref={buttonRef}
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
