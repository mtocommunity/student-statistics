import { Button, buttonVariants } from "@/core/components/ui/button"
import type { VariantProps } from "class-variance-authority"

type ButtonWithoutVariantProps = Omit<
  React.ComponentProps<typeof Button>,
  keyof VariantProps<typeof buttonVariants>
>

interface LinkProps
  extends
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  buttonProps?: ButtonWithoutVariantProps
}

export function Link({
  variant = "link",
  size,
  buttonProps,
  ...props
}: LinkProps) {
  return (
    <Button
      variant={variant}
      size={size}
      {...buttonProps}
      render={<a {...props}></a>}
    />
  )
}
