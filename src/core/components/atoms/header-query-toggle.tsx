import { Toggle } from "@/core/components/ui/toggle"
import type { OrderQuery } from "@/core/validation/query-validation"
import { $ } from "@/lib/dom-selector"
import { LuArrowDown01 } from "react-icons/lu"

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
    >
      <input type="hidden" name="order" value={orderQuery} />
      <LuArrowDown01 />
    </Toggle>
  )
}
