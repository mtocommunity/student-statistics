import { Button } from "@/core/components/ui/button"
import { Input } from "@/core/components/ui/input"
import { InputGroupInput } from "@/core/components/ui/input-group"
import { cn } from "@/core/lib/tailwind"
import {
  NumberField,
  type NumberFieldGroupProps,
  type NumberFieldRootProps,
} from "@base-ui/react/number-field"
import { TbMinus, TbPlus } from "react-icons/tb"

export interface NumberInputProps extends NumberFieldRootProps {
  groupProps?: NumberFieldGroupProps
  decrementProps?: React.ComponentProps<typeof NumberField.Decrement>
  incrementProps?: React.ComponentProps<typeof NumberField.Increment>
  inputProps?: React.ComponentProps<typeof NumberField.Input> &
    React.ComponentProps<typeof Input>
}

export function NumberInput({
  groupProps,
  decrementProps,
  incrementProps,
  inputProps,
  className,
  disabled,
  ...props
}: NumberInputProps) {
  return (
    <NumberField.Root
      disabled={disabled}
      {...props}
      className={cn("flex-1", className)}
    >
      <NumberField.Group
        {...groupProps}
        className={cn(groupProps?.className, "flex")}
      >
        <NumberField.Decrement
          {...decrementProps}
          render={({ className, ...props }) => (
            <Button
              size="icon"
              className={cn("border-x-0", className)}
              {...props}
            >
              <TbMinus />
            </Button>
          )}
        />
        <NumberField.Input
          {...inputProps}
          render={({ className, ...props }) => (
            <InputGroupInput className={cn(className)} {...props} />
          )}
        />
        <NumberField.Increment
          {...incrementProps}
          render={({ className, ...props }) => (
            <Button
              size="icon"
              className={cn("border-x-0", className)}
              {...props}
            >
              <TbPlus />
            </Button>
          )}
        />
      </NumberField.Group>
    </NumberField.Root>
  )
}
