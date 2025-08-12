import { Button } from "@/core/components/atoms/button"
import {
  dataInfo,
  type DataName,
} from "@/core/components/molecules/auxiliar/data-dialog-auxiliar"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/core/components/ui/dialog"
import { navigate } from "astro:transitions/client"
import { toast } from "sonner"
import type z4 from "zod/v4"

// Component
interface DeleteDataDialogProps {
  dataName: DataName
  deleteData: z4.infer<
    (typeof dataInfo)[keyof typeof dataInfo]["schema"]["delete"]
  >
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function DeleteDataDialog({
  dataName,
  deleteData,
  open,
  setOpen,
}: DeleteDataDialogProps) {
  // Data info
  const {
    name,
    action: { delete: deleteAction },
  } = dataInfo[dataName]

  // Delete handler
  const deleteHandler = async () => {
    const { data, error } = await deleteAction(deleteData)

    if (error) {
      console.error(`Error deleting ${name}:`, error)
      toast.error(error.message)
      return
    }

    toast.success(data.message)
    navigate(new URL(window.location.href).toString())
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            ¿Está seguro(a) de que desea eliminar este {name}?
          </DialogTitle>

          <DialogDescription>
            Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button colorSchema="danger" onClick={deleteHandler}>
            Eliminar
          </Button>
          <DialogClose asChild>
            <Button>Cancelar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
