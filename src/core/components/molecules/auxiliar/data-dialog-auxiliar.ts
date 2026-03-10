import {
  DeleteCourse,
  InsertCourse,
  UpdateCourse,
} from "@/course/validation/course-validation"
import { createExamWrapperService } from "@/exam/service/create-exam-wrapper-service"
import {
  DeleteExam,
  InsertExamWithExcel,
  UpdateExam,
} from "@/exam/validation/exam-validation"
import {
  DeleteSemester,
  InsertSemester,
  UpdateSemester,
} from "@/semester/model/semester-model"
import { navigate } from "astro/virtual-modules/transitions-router.js"
import { actions, type SafeResult } from "astro:actions"
import { toast } from "sonner"
import type { core, ZodObject } from "zod"
import z from "zod"

// Data names
export type DataName = "semester" | "course" | "exam"

// Data info
interface DataInfo<
  TCreateShape extends core.$ZodShape = core.$ZodShape,
  TUpdateShape extends core.$ZodShape = core.$ZodShape,
  TDeleteShape extends core.$ZodShape = core.$ZodShape,
  TCreateObject extends z.infer<ZodObject<TCreateShape>> = z.infer<
    ZodObject<TCreateShape>
  >,
  TUpdateObject extends z.infer<ZodObject<TUpdateShape>> = z.infer<
    ZodObject<TUpdateShape>
  >,
  TDeleteObject extends z.infer<ZodObject<TDeleteShape>> = z.infer<
    ZodObject<TDeleteShape>
  >,
> {
  name: string
  schema: {
    create: ZodObject<TCreateShape>
    update: ZodObject<TUpdateShape>
    delete: ZodObject<TDeleteShape>
  }
  disabled?: {
    create?: {
      [key in keyof TCreateShape]?: boolean
    }
    update?: {
      [key in keyof TUpdateShape]?: boolean
    }
  }
  labels?: {
    [key in keyof (TCreateShape & TUpdateShape)]?: string
  }
  hidden?: (keyof (TCreateShape & TUpdateShape))[]
  action: {
    create: (input: TCreateObject) => Promise<
      SafeResult<
        TCreateObject,
        {
          success: boolean
          message: string
          url?: string
        }
      >
    >
    update: (input: TUpdateObject) => Promise<
      SafeResult<
        TUpdateObject,
        {
          success: boolean
          message: string
        }
      >
    >
    delete: (input: TDeleteObject) => Promise<
      SafeResult<
        TDeleteObject,
        {
          success: boolean
          message: string
        }
      >
    >
  }
  postSuccess: (data: {
    success: boolean
    message: string
    url?: string
  }) => void
}

// Function for type safety
function defineDataInfo<
  TCreateShape extends core.$ZodShape,
  TUpdateShape extends core.$ZodShape,
  TDeleteShape extends core.$ZodShape,
>(
  info: DataInfo<TCreateShape, TUpdateShape, TDeleteShape>
): DataInfo<TCreateShape, TUpdateShape, TDeleteShape> {
  return info
}

// Data info
export const dataInfo: Record<DataName, DataInfo> = {
  semester: defineDataInfo({
    name: "ciclo",
    schema: {
      create: InsertSemester,
      update: UpdateSemester,
      delete: DeleteSemester,
    },
    labels: {
      id: "ID",
      name: "Nombre",
    },
    action: {
      create: actions.semester.create,
      update: actions.semester.update,
      delete: actions.semester.delete,
    },
    hidden: ["id"],
    postSuccess: (data) => {
      toast.success(data.message)
      if (data.url) navigate(data.url)
    },
  }) as unknown as DataInfo,

  course: defineDataInfo({
    name: "curso",
    schema: {
      create: InsertCourse,
      update: UpdateCourse,
      delete: DeleteCourse,
    },
    hidden: ["id", "semesterId"],
    labels: {
      id: "ID",
      name: "Nombre",
      semesterId: "ID del Ciclo",
    },
    action: {
      create: actions.course.create,
      update: actions.course.update,
      delete: actions.course.delete,
    },
    postSuccess: (data) => {
      toast.success(data.message)
      if (data.url) navigate(data.url)
    },
  }) as unknown as DataInfo,

  exam: defineDataInfo({
    name: "examen",
    schema: {
      create: InsertExamWithExcel,
      update: UpdateExam,
      delete: DeleteExam,
    },
    hidden: ["id", "courseId"],
    labels: {
      id: "ID",
      name: "Nombre",
      courseId: "ID del Curso",
      minPassingScore: "Puntuación mínima",
      file: "Excel",
    },
    action: {
      create: async (input) => await createExamWrapperService(input),
      update: actions.exam.update,
      delete: actions.exam.delete,
    },
    postSuccess: (data) => {
      toast.success(data.message)
      if (data.url) navigate(data.url)
    },
  }) as unknown as DataInfo,
}
