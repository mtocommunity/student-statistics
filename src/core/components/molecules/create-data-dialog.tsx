import { Button } from "@/core/components/atoms/button"
import {
  createDataInfo,
  type DataName,
} from "@/core/components/molecules/auxiliar/create-data-dialog-auxiliar"
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
import { controlledInputFactory } from "@/form/components/input-factory"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { LuPlus } from "react-icons/lu"
import { toast } from "sonner"
import type z4 from "zod/v4"

// Component
interface CreateDataDialogProps {
  dataName: DataName
}

export function CreateDataDialog({ dataName }: CreateDataDialogProps) {
  // Data info
  const {
    name,
    schema: newDataSchema,
    labels,
    action,
    postSuccess,
  } = createDataInfo[dataName]

  // Form handling
  const formRef = useRef<HTMLFormElement>(null)
  const closeDialogButtonRef = useRef<HTMLButtonElement>(null)
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(newDataSchema),
  })

  // Handle submit
  const onSubmit = async (input: z4.infer<typeof newDataSchema>) => {
    const { data, error } = await action(input)

    if (error) {
      console.error("Error creating data:", error)
      toast.error("Ha ocurrido un error. Por favor, inténtalo de nuevo.")
      return
    }

    reset()
    closeDialogButtonRef.current?.click()
    postSuccess(data)
  }

  // Generate inputs
  const inputs = controlledInputFactory({
    schema: newDataSchema,
    control,
    labels,
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <span className="flex items-center justify-center gap-1">
            <LuPlus />

            <span className="max-sm:sr-only">Crear</span>
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear nuevo {name}</DialogTitle>

          <DialogDescription>
            Completa el formulario para crear un nuevo {name}.
          </DialogDescription>
        </DialogHeader>

        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          {inputs}
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button ref={closeDialogButtonRef}>Cancelar</Button>
          </DialogClose>

          <Button onClick={() => formRef.current?.requestSubmit()}>
            Crear {name}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
