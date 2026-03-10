import { Field, FieldError, FieldLabel } from "@/core/components/ui/field"
import { Input } from "@/core/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/core/components/ui/input-group"
import type { ClassNameProp } from "@/core/kit/component-kit"
import { cn } from "@/core/lib/tailwind"
import { useRef, useState } from "react"
import {
  Controller,
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form"
import type z from "zod"

// Component
interface ControlledInlineFileInputProps<
  TIconProps extends ClassNameProp = ClassNameProp,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> extends UseControllerProps<TFieldValues, TName, TTransformedValues> {
  label?: React.ReactNode
  schema?: z.ZodFile
  inputProps?: React.ComponentProps<typeof Input>
  labelProps?: React.ComponentProps<typeof FieldLabel>
  errorProps?: React.ComponentProps<typeof FieldError>
  icon?: React.FunctionComponent<TIconProps>
  iconProps?: TIconProps
}

export function ControlledInlineFileInput<
  TIconProps extends ClassNameProp = ClassNameProp,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  schema,
  label,
  inputProps: { className: inputClassName, ...inputProps } = {},
  labelProps: { className: labelClassName, ...labelProps } = {},
  errorProps,
  icon: Icon,
  iconProps = {} as TIconProps,
  ...props
}: ControlledInlineFileInputProps<TIconProps, TFieldValues, TName>) {
  // Draggin state
  const [isDragging, setIsDragging] = useState(false)

  // Input
  const inputRef = useRef<HTMLInputElement | null>(null)

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          onDragEnter={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={(e) => {
            e.preventDefault()
            setIsDragging(false)
          }}
          onDrop={(e) => {
            e.preventDefault()
            setIsDragging(false)
            const files = e.dataTransfer?.files
            if (!files) return
            if (!inputProps.multiple) field.onChange(files[0])
            else field.onChange(files)

            if (inputRef.current) {
              inputRef.current.files = files
            }
          }}
          data-dragging={isDragging}
        >
          <FieldLabel
            htmlFor={name}
            className={cn(labelClassName)}
            {...labelProps}
          >
            {label}
          </FieldLabel>

          <InputGroup className="group-data-[dragging=true]/field:border-dashed group-data-[dragging=true]/field:file:border-dashed">
            <InputGroupInput
              id={name}
              type="file"
              accept={schema?._zod.bag.mime?.join(", ")}
              className={cn(
                "text-muted-foreground file:border-input file:text-foreground aria-invalid:file:text-destructive aria-invalid:text-destructive aria-invalid:file:border-r-destructive p-0 pr-3 italic group-data-[dragging=true]/field:border-dashed file:mr-3 file:h-full file:border-0 file:border-r file:border-solid file:bg-transparent file:px-3 file:text-xs file:font-medium file:not-italic group-data-[dragging=true]/field:file:border-dashed",
                inputClassName
              )}
              aria-invalid={fieldState.invalid}
              {...inputProps}
              name={field.name}
              onBlur={field.onBlur}
              ref={(instance) => {
                field.ref(instance)
                inputRef.current = instance
              }}
              onChange={(e) => {
                if (!inputProps.multiple) field.onChange(e.target.files?.[0])
                else field.onChange(e.target.files)
              }}
            />

            {Icon && (
              <InputGroupAddon align="inline-end">
                <Icon {...iconProps} />
              </InputGroupAddon>
            )}
          </InputGroup>

          {fieldState.invalid && (
            <FieldError {...errorProps} errors={[fieldState.error]} />
          )}
        </Field>
      )}
      {...props}
    />
  )
}
