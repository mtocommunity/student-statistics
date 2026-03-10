import { buttonVariants } from "@/core/components/ui/button"
import { Toggle } from "@/core/components/ui/toggle"
import type { OrderQuery } from "@/core/validation/query-validation"
import { useRef } from "react"
import { TbSortAscendingLetters, TbSortDescendingLetters } from "react-icons/tb"

// Component
interface HeaderQueryToggleProps {
  orderQuery?: OrderQuery
  orderTitle: string
}

export function HeaderQueryToggle({
  orderQuery,
  orderTitle,
}: HeaderQueryToggleProps) {
  // Input
  const inputRef = useRef<HTMLInputElement | null>(null)

  return (
    <Toggle
      title={orderTitle}
      pressed={orderQuery === "asc"}
      onPressedChange={() => {
        if (!inputRef.current) return

        inputRef.current.value = orderQuery === "asc" ? "desc" : "asc"
        inputRef.current.form?.requestSubmit()
      }}
      className={buttonVariants({ size: "icon", variant: "secondary" })}
    >
      <input ref={inputRef} type="hidden" name="order" value={orderQuery} />

      {orderQuery === "asc" ? (
        <TbSortAscendingLetters className="size-5" />
      ) : (
        <TbSortDescendingLetters className="size-5" />
      )}
    </Toggle>
  )
}
