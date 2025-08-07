import {
  inputBaseClassName,
  labelBaseClassName,
  svgInputBaseClassName,
} from "@/form/components/molecules/styles/input-styles"
import { cn } from "@/lib/tailwind"
import { ReactComponent as EyeOff } from "@assets/svg/lu-eye-off.svg"
import { ReactComponent as Eye } from "@assets/svg/lu-eye.svg"
import { useState } from "react"
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

// Component
interface PasswordInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  label: React.ReactNode
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>
  labelTextProps?: React.HTMLAttributes<HTMLSpanElement>
  errorLabelProps?: React.HTMLAttributes<HTMLSpanElement>
}

export function PasswordInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  inputProps: { className: inputClassName, ...inputProps } = {},
  labelProps: { className: labelClassName, ...labelProps } = {},
  labelTextProps,
  errorLabelProps: { className: errorLabelClassName, ...errorLabelProps } = {},
  ...props
}: PasswordInputProps<TFieldValues, TName>) {
  // Password visible
  const [showPassword, setPassword] = useState(false)

  return (
    <label
      htmlFor={name}
      className={cn(labelBaseClassName, labelClassName)}
      {...labelProps}
    >
      <span {...labelTextProps}>{label}</span>

      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <>
            <div className="relative">
              <input
                id={name}
                type={showPassword ? "text" : "password"}
                className={inputBaseClassName}
                placeholder="••••••••"
                autoComplete="current-password"
                {...field}
                {...(error && { "aria-invalid": true })}
                {...inputProps}
              />

              <Eye
                className={cn(
                  svgInputBaseClassName,
                  "z-10 peer-[[type=password]]:hidden hover:cursor-pointer"
                )}
                onClick={() => setPassword((prev) => !prev)}
              />
              <EyeOff
                className={cn(
                  svgInputBaseClassName,
                  "z-10 peer-[[type=text]]:hidden hover:cursor-pointer"
                )}
                onClick={() => setPassword((prev) => !prev)}
              />
            </div>

            {error && (
              <span
                className={cn("text-xs text-red-400", errorLabelClassName)}
                {...errorLabelProps}
              >
                {error.message}
              </span>
            )}
          </>
        )}
        {...props}
      />
    </label>
  )
}
