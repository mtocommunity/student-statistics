import { tv, type VariantProps } from "tailwind-variants"

export const buttonVariants = tv({
  base: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive group shrink-0 cursor-pointer items-center justify-center gap-2 rounded px-4 py-2 text-center text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 disabled:brightness-90 data-[loading]:inline-flex data-[loading]:cursor-auto data-[loading]:gap-1.5 data-[loading]:opacity-75 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  variants: {
    variant: {
      solid: "",
      outline: "border",
      ghost: "",
      link: "p-0 hover:underline",
      tab: "rounded-full border-b-2 border-transparent hover:border-b-2",
    },
    colorSchema: {
      primary: "",
      secondary: "",
      success: "",
      danger: "",
      warning: "",
      info: "",
    },
  },
  compoundVariants: [
    // Solid variants
    {
      variant: "solid",
      colorSchema: "primary",
      class:
        "bg-primary-900 hover:bg-primary-800 focus:ring-primary-500 focus:ring-offset-primary-500 text-white focus:ring-2 focus:outline-none",
    },
    {
      variant: "solid",
      colorSchema: "secondary",
      class: "bg-secondary-500 hover:bg-secondary-600 text-white",
    },
    {
      variant: "solid",
      colorSchema: "success",
      class: "bg-green-500 text-white hover:bg-green-600",
    },
    {
      variant: "solid",
      colorSchema: "danger",
      class: "bg-red-500 text-white hover:bg-red-600",
    },
    {
      variant: "solid",
      colorSchema: "warning",
      class: "bg-amber-500 text-white hover:bg-amber-600",
    },
    {
      variant: "solid",
      colorSchema: "info",
      class: "bg-blue-500 text-white hover:bg-blue-600",
    },

    // Outline variants
    {
      variant: "outline",
      colorSchema: "primary",
      class: "border-primary-300 text-primary-700 hover:bg-primary-100",
    },
    {
      variant: "outline",
      colorSchema: "secondary",
      class: "border-secondary-300 text-secondary-700 hover:bg-secondary-100",
    },
    {
      variant: "outline",
      colorSchema: "success",
      class: "border-green-300 text-green-700 hover:bg-green-100",
    },
    {
      variant: "outline",
      colorSchema: "danger",
      class: "border-red-300 text-red-700 hover:bg-red-100",
    },
    {
      variant: "outline",
      colorSchema: "warning",
      class: "border-amber-300 text-amber-700 hover:bg-amber-100",
    },
    {
      variant: "outline",
      colorSchema: "info",
      class: "border-blue-300 text-blue-700 hover:bg-blue-100",
    },

    // Ghost variants
    {
      variant: "ghost",
      colorSchema: "primary",
      class: "text-primary-700 hover:bg-primary-200",
    },
    {
      variant: "ghost",
      colorSchema: "secondary",
      class: "text-secondary-700 hover:bg-secondary-200",
    },
    {
      variant: "ghost",
      colorSchema: "success",
      class: "text-green-700 hover:bg-green-200",
    },
    {
      variant: "ghost",
      colorSchema: "danger",
      class: "text-red-700 hover:bg-red-200",
    },
    {
      variant: "ghost",
      colorSchema: "warning",
      class: "text-amber-700 hover:bg-amber-200",
    },
    {
      variant: "ghost",
      colorSchema: "info",
      class: "text-blue-700 hover:bg-blue-200",
    },

    // Link variants
    {
      variant: "link",
      colorSchema: "primary",
      class: "text-primary-300 underline-offset-2",
    },
    {
      variant: "link",
      colorSchema: "secondary",
      class: "text-secondary-300 underline-offset-2",
    },
    {
      variant: "link",
      colorSchema: "success",
      class: "text-green-500 underline-offset-2",
    },
    {
      variant: "link",
      colorSchema: "danger",
      class: "text-red-500 underline-offset-2",
    },
    {
      variant: "link",
      colorSchema: "warning",
      class: "text-amber-500 underline-offset-2",
    },
    {
      variant: "link",
      colorSchema: "info",
      class: "text-blue-500 underline-offset-2",
    },

    // Tab variants
    {
      variant: "tab",
      colorSchema: "primary",
      class: "bg-primary-500 text-white",
    },
    {
      variant: "tab",
      colorSchema: "secondary",
      class: "bg-secondary-500 text-white",
    },
    {
      variant: "tab",
      colorSchema: "success",
      class: "bg-green-500 text-white",
    },
    {
      variant: "tab",
      colorSchema: "danger",
      class: "bg-red-500 text-white",
    },
    {
      variant: "tab",
      colorSchema: "warning",
      class: "bg-amber-500 text-white",
    },
    {
      variant: "tab",
      colorSchema: "info",
      class: "bg-blue-500 text-white",
    },
  ],
  defaultVariants: {
    variant: "solid",
    colorSchema: "primary",
  },
})

export type ButtonVariants = VariantProps<typeof buttonVariants>

export const spinnerVariants = tv({
  base: "size-0 transition-[width,height] duration-200 group-data-[loading]:size-[1em] group-data-[loading]:animate-spin",
  variants: {
    colorSchema: {
      primary: "text-primary-300",
      secondary: "text-secondary-300",
      success: "text-green-300",
      danger: "text-red-300",
      warning: "text-amber-300",
      info: "text-blue-300",
    },
  },
  defaultVariants: {
    colorSchema: "primary",
  },
})
