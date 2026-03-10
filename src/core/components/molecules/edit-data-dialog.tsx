import {
  dataInfo,
  type DataName,
} from "@/core/components/molecules/auxiliar/data-dialog-auxiliar"
import { Button } from "@/core/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/core/components/ui/dialog"
import { controlledInputFactory } from "@/form/components/controlled-input-factory"
import { zodResolver } from "@hookform/resolvers/zod"
import { navigate } from "astro:transitions/client"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type z from "zod/v4"

// Component
interface EditDataDialogProps {
  dataName: DataName
  editData: z.infer<
    (typeof dataInfo)[keyof typeof dataInfo]["schema"]["update"]
  >
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function EditDataDialog({
  dataName,
  editData,
  open,
  setOpen,
}: EditDataDialogProps) {
  // Data info
  const {
    name,
    schema: { update: updateSchema },
    disabled: { update: updateDisabled } = {},
    labels,
    hidden,
    action: { update: updateAction },
    postSuccess,
  } = dataInfo[dataName]

  // Form handling
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(updateSchema),
    defaultValues: editData,
  })

  // Handle submit
  const onSubmit = handleSubmit(async (input: z.infer<typeof updateSchema>) => {
    const { data, error } = await updateAction(input)

    if (error) {
      console.error("Error creating data:", error)
      toast.error("Ha ocurrido un error. Por favor, inténtalo de nuevo.")
      return
    }

    reset()
    setOpen(false)
    postSuccess(data)
    navigate(new URL(window.location.href).toString())
  })

  // Generate inputs
  const inputs = controlledInputFactory({
    schema: updateSchema,
    disabled: updateDisabled,
    control,
    labels,
    hidden,
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        render={
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle>Editar {name}</DialogTitle>

              <DialogDescription>
                Edita el registro de {name}.
              </DialogDescription>
            </DialogHeader>

            {inputs}

            <DialogFooter>
              <DialogClose
                render={<Button variant="secondary">Cancelar</Button>}
              />

              <Button type="submit">Editar {name}</Button>
            </DialogFooter>
          </form>
        }
      />
    </Dialog>
  )
}
