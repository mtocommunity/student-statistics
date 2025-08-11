import { Button } from "@/core/components/atoms/button"
import type { DataName } from "@/core/components/molecules/auxiliar/create-data-dialog-auxiliar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu"
import { cn } from "@/lib/tailwind"
import { LuEllipsis, LuPen, LuTrash } from "react-icons/lu"

// Component
interface ActionsDataDialog {
  dataName: DataName
  buttonClassName?: Parameters<typeof cn>[0]
}

export function ActionsDataDialog({ buttonClassName }: ActionsDataDialog) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={cn("size-10 p-0", buttonClassName)}>
          <LuEllipsis className="mx-auto" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem>
          <LuPen /> Editar
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive">
          <LuTrash className="text-destructive" /> Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
