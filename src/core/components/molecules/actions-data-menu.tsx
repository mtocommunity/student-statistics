import { Button } from "@/core/components/atoms/button"
import type {
  dataInfo,
  DataName,
} from "@/core/components/molecules/auxiliar/data-dialog-auxiliar"
import { DeleteDataDialog } from "@/core/components/molecules/delete-data-dialog"
import { EditDataDialog } from "@/core/components/molecules/edit-data-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu"
import { cn } from "@/lib/tailwind"
import { useState } from "react"
import { LuEllipsis, LuPen, LuTrash } from "react-icons/lu"
import type z4 from "zod/v4"

// Component
interface ActionsDataDialog {
  dataName: DataName
  data: z4.infer<(typeof dataInfo)[keyof typeof dataInfo]["schema"]["delete"]> &
    z4.infer<(typeof dataInfo)[keyof typeof dataInfo]["schema"]["update"]>
  buttonClassName?: Parameters<typeof cn>[0]
}

export function ActionsDataDialog({
  dataName,
  data,
  buttonClassName,
}: ActionsDataDialog) {
  // Open state for edit and delete dialogs
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className={cn("size-10 p-0", buttonClassName)}>
            <LuEllipsis className="mx-auto" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => setEditOpen(true)}>
            <LuPen /> Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onSelect={() => setDeleteOpen(true)}
          >
            <LuTrash className="text-destructive" /> Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditDataDialog
        dataName={dataName}
        editData={data}
        open={editOpen}
        setOpen={setEditOpen}
      />
      <DeleteDataDialog
        dataName={dataName}
        deleteData={data}
        open={deleteOpen}
        setOpen={setDeleteOpen}
      />
    </>
  )
}
