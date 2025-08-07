import { createSemesterSchema } from "@/semester/validation/semester-validation"
import { navigate } from "astro/virtual-modules/transitions-router.js"
import { actions, type SafeResult } from "astro:actions"
import { toast } from "sonner"
import type z4 from "zod/v4"
import type { core, ZodObject } from "zod/v4"

// Data names
export type DataName = "semester"

// Data info
interface CreateDataInfo<
  Shape extends core.$ZodShape = core.$ZodShape,
  T extends z4.infer<ZodObject<Shape>> = z4.infer<ZodObject<Shape>>,
> {
  name: string
  schema: ZodObject<Shape>
  labels?: {
    [key in keyof Shape]?: string
  }
  action: (input: T) => Promise<
    SafeResult<
      T,
      {
        success: boolean
        message: string
        url?: string
      }
    >
  >
  postSuccess: (data: {
    success: boolean
    message: string
    url?: string
  }) => void
}

// Function for type safety
function defineDataInfo<Shape extends core.$ZodShape>(
  info: CreateDataInfo<Shape>
): CreateDataInfo<Shape> {
  return info
}

export const createDataInfo: Record<DataName, CreateDataInfo> = {
  semester: defineDataInfo({
    name: "ciclo",
    schema: createSemesterSchema,
    labels: {
      name: "Nombre",
    },
    action: actions.semester.create,
    postSuccess: (data) => {
      toast.success(data.message)
      if (data.url) navigate(data.url)
    },
  }) as unknown as CreateDataInfo,
}
