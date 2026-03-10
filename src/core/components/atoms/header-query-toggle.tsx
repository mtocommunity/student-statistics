import { buttonVariants } from "@/core/components/ui/button"
import { Toggle } from "@/core/components/ui/toggle"
import { $ } from "@/core/lib/dom-selector"
import type { OrderQuery } from "@/core/validation/query-validation"
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
  return (
    <Toggle
      title={orderTitle}
      pressed={orderQuery === "asc"}
      onPressedChange={() => {
        // Submit the form to apply the new order
        const $inputOrder = $<HTMLInputElement>("input[name='order']")

        if ($inputOrder) {
          $inputOrder.value = orderQuery === "asc" ? "desc" : "asc"
          $inputOrder.form?.requestSubmit()
        }
      }}
      className={buttonVariants({ size: "icon", variant: "secondary" })}
    >
      <input type="hidden" name="order" value={orderQuery} />

      {orderQuery === "asc" ? (
        <TbSortAscendingLetters className="size-5" />
      ) : (
        <TbSortDescendingLetters className="size-5" />
      )}
    </Toggle>
  )
}
