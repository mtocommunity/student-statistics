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
  DialogTrigger,
} from "@/core/components/ui/dialog"
import { controlledInputFactory } from "@/form/components/controlled-input-factory"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { TbPlus } from "react-icons/tb"
import { toast } from "sonner"
import type z from "zod"

// Component
interface CreateDataDialogProps<TDataName extends DataName> {
  dataName: TDataName
  defaultValues?: z.infer<(typeof dataInfo)[TDataName]["schema"]["create"]>
}

export function CreateDataDialog<TDataName extends DataName>({
  dataName,
  defaultValues,
}: CreateDataDialogProps<TDataName>) {
  // Data info
  const {
    name,
    schema: { create: createSchema },
    disabled: { create: createDisabled } = {},
    labels,
    hidden,
    action: { create: createAction },
    postSuccess,
  } = dataInfo[dataName]

  // Dialog
  const [open, setOpen] = useState(false)

  // Form handling
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(createSchema),
    defaultValues,
  })

  // Handle submit
  const onSubmit = handleSubmit(async (input: z.infer<typeof createSchema>) => {
    const { data, error } = await createAction(input)

    if (error) {
      console.error("Error creating data:", error)
      toast.error("Ha ocurrido un error. Por favor, inténtalo de nuevo.")
      return
    }

    reset()
    setOpen(false)
    postSuccess(data)
  })

  // Generate inputs
  const inputs = controlledInputFactory({
    schema: createSchema,
    disabled: createDisabled,
    control,
    labels,
    hidden,
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button>
            <TbPlus />

            <span className="max-sm:sr-only">Crear</span>
          </Button>
        }
      />

      <DialogContent
        render={
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle>Crear nuevo {name}</DialogTitle>

              <DialogDescription>
                Completa el formulario para crear un nuevo {name}.
              </DialogDescription>
            </DialogHeader>

            {inputs}

            <DialogFooter>
              <DialogClose
                render={<Button variant="secondary">Cancelar</Button>}
              />

              <Button type="submit">Crear {name}</Button>
            </DialogFooter>
          </form>
        }
      />
    </Dialog>
  )
}
