import { Button } from "@/core/components/atoms/button"
import { Toggle } from "@/core/components/ui/toggle"
import { type OrderQuery } from "@/core/schema/query-schema"
import { $ } from "@/lib/dom-selector"
import { useEffect } from "react"
import { LuArrowDown01, LuSearch } from "react-icons/lu"

// Component
interface HeaderQueryProps {
  q?: string
  orderQuery?: OrderQuery
}

export function HeaderQuery({ q, orderQuery = "desc" }: HeaderQueryProps) {
  // Set focus on input when component mounts
  const hasQuery = q !== undefined && q !== ""

  useEffect(() => {
    const input = $<HTMLInputElement>('input[name="q"]')

    if (input && hasQuery) {
      input.focus()
      input.setSelectionRange(input.value.length, input.value.length)
    }
  }, [q, hasQuery])

  // Order
  const orderTitle = `Ordenar de manera ${orderQuery === "asc" ? "descendente" : "ascendente"}`

  return (
    <header className="flex w-full">
      <form
        id="search-form"
        method="get"
        className="flex flex-1 items-center justify-end gap-2"
      >
        <input
          type="text"
          className="w-full max-w-60 min-w-24 py-2 text-sm"
          name="q"
          placeholder="Buscar..."
          autoComplete="off"
          {...(hasQuery && {
            defaultValue: q,
            autoFocus: true,
          })}
        />
        <Button title="Buscar" type="submit" className="h-full px-3">
          <LuSearch />
        </Button>

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
      </form>
    </header>
  )
}
