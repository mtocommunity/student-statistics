import {
  buttonVariants,
  spinnerVariants,
  type ButtonVariants,
} from "@/core/components/atoms/styles/button-style";
import { cn } from "@/lib/tailwind";
import { ReactComponent as Spinner } from "@assets/svg/spinner.svg";
import { forwardRef } from "preact/compat";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariants;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, colorSchema, variant, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ colorSchema, variant }), className)}
        {...props}
      >
        <Spinner class={spinnerVariants({ colorSchema })} />

        {children}
      </button>
    );
  },
);
