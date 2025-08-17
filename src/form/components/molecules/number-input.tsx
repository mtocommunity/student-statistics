import {
  inputBaseClassName,
  labelBaseClassName,
  svgInputBaseClassName,
} from "@/form/components/molecules/styles/input-styles"
import {
  NumberInputUncontrolled,
  type NumberInputUncontrolledProps,
} from "@/form/components/uncontrolled/molecules/number-input-uncontrolled"
import { cn } from "@/lib/tailwind"
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

// Component
interface NumberInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  label: React.ReactNode
  inputProps?: NumberInputUncontrolledProps
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>
  labelTextProps?: React.HTMLAttributes<HTMLSpanElement>
  errorLabelProps?: React.HTMLAttributes<HTMLSpanElement>
  icon?: React.FunctionComponent<{ className?: string }>
}

export function NumberInput<
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
  icon: Icon,
  ...props
}: NumberInputProps<TFieldValues, TName>) {
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
              <NumberInputUncontrolled
                id={name}
                className={cn(inputBaseClassName, inputClassName)}
                {...field}
                onChange={undefined}
                onValueChange={(value) => field.onChange(value)}
                {...(error && { "aria-invalid": true })}
                {...inputProps}
              />

              {Icon && <Icon className={cn(svgInputBaseClassName, "peer")} />}
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
