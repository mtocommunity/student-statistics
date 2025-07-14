import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      theme="dark"
      style={
        {
          fontFamily: "var(--font-inter)",
        } as React.CSSProperties
      }
      toastOptions={{
        style: {
          borderRadius: "var(--spacing)",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
