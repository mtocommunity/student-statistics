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
import { controlledInputFactory } from "@/form/components/input-factory"
import { zodResolver } from "@hookform/resolvers/zod"
import { navigate } from "astro:transitions/client"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type z4 from "zod/v4"

// Component
interface EditDataDialogProps {
  dataName: DataName
  editData: z4.infer<
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
    action: { update: updateAction },
    postSuccess,
  } = dataInfo[dataName]

  // Form handling
  const formRef = useRef<HTMLFormElement>(null)
  const closeDialogButtonRef = useRef<HTMLButtonElement>(null)
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(updateSchema),
    defaultValues: editData,
  })

  // Handle submit
  const onSubmit = async (input: z4.infer<typeof updateSchema>) => {
    const { data, error } = await updateAction(input)

    if (error) {
      console.error("Error creating data:", error)
      toast.error("Ha ocurrido un error. Por favor, inténtalo de nuevo.")
      return
    }

    reset()
    closeDialogButtonRef.current?.click()
    postSuccess(data)
    navigate(new URL(window.location.href).toString())
  }

  // Generate inputs
  const inputs = controlledInputFactory({
    schema: updateSchema,
    disabled: updateDisabled,
    control,
    labels,
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar {name}</DialogTitle>

          <DialogDescription>Edita el registro de {name}.</DialogDescription>
        </DialogHeader>

        <form
          ref={formRef}
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          {inputs}
          <button type="submit" className="hidden" />
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button ref={closeDialogButtonRef}>Cancelar</Button>
          </DialogClose>

          <Button onClick={() => formRef.current?.requestSubmit()}>
            Editar {name}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
