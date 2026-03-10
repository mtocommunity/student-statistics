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
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { LuPlus } from "react-icons/lu"
import { toast } from "sonner"
import type z4 from "zod/v4"

// Component
interface CreateDataDialogProps<TDataName extends DataName> {
  dataName: TDataName
  defaultValues?: z4.infer<(typeof dataInfo)[TDataName]["schema"]["create"]>
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
    action: { create: createAction },
    postSuccess,
  } = dataInfo[dataName]

  // Form handling
  const formRef = useRef<HTMLFormElement>(null)
  const closeDialogButtonRef = useRef<HTMLButtonElement>(null)
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(createSchema),
    defaultValues,
  })

  // Handle submit
  const onSubmit = async (input: z4.infer<typeof createSchema>) => {
    const { data, error } = await createAction(input)

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
    schema: createSchema,
    disabled: createDisabled,
    control,
    labels,
  })

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button>
            <span className="flex items-center justify-center gap-1">
              <LuPlus />

              <span className="max-sm:sr-only">Crear</span>
            </span>
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear nuevo {name}</DialogTitle>

          <DialogDescription>
            Completa el formulario para crear un nuevo {name}.
          </DialogDescription>
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
          <DialogClose
            render={<Button ref={closeDialogButtonRef}>Cancelar</Button>}
          />

          <Button onClick={() => formRef.current?.requestSubmit()}>
            Crear {name}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
