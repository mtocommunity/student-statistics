import {
  createCourseSchema,
  deleteCourseSchema,
  updateCourseSchema,
} from "@/course/validation/course-validation"
import { createExamWrapperService } from "@/exam/service/create-exam-wrapper-service"
import {
  createExamWithExcelSchema,
  deleteExamSchema,
  updateExamSchema,
} from "@/exam/validation/exam-validation"
import {
  createSemesterSchema,
  deleteSemesterSchema,
  updateSemesterSchema,
} from "@/semester/validation/semester-validation"
import { navigate } from "astro/virtual-modules/transitions-router.js"
import { actions, type SafeResult } from "astro:actions"
import { toast } from "sonner"
import type { core, ZodObject } from "zod/v4"
import z4 from "zod/v4"

// Data names
export type DataName = "semester" | "course" | "exam"

// Data info
interface DataInfo<
  TCreateShape extends core.$ZodShape = core.$ZodShape,
  TUpdateShape extends core.$ZodShape = core.$ZodShape,
  TDeleteShape extends core.$ZodShape = core.$ZodShape,
  TCreateObject extends z4.infer<ZodObject<TCreateShape>> = z4.infer<
    ZodObject<TCreateShape>
  >,
  TUpdateObject extends z4.infer<ZodObject<TUpdateShape>> = z4.infer<
    ZodObject<TUpdateShape>
  >,
  TDeleteObject extends z4.infer<ZodObject<TDeleteShape>> = z4.infer<
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
      create: createSemesterSchema,
      update: updateSemesterSchema,
      delete: deleteSemesterSchema,
    },
    disabled: {
      update: {
        id: true,
      },
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
    postSuccess: (data) => {
      toast.success(data.message)
      if (data.url) navigate(data.url)
    },
  }) as unknown as DataInfo,

  course: defineDataInfo({
    name: "curso",
    schema: {
      create: createCourseSchema,
      update: updateCourseSchema,
      delete: deleteCourseSchema,
    },
    disabled: {
      create: {
        semesterId: true,
      },
      update: {
        id: true,
        semesterId: true,
      },
    },
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
      create: createExamWithExcelSchema,
      update: updateExamSchema,
      delete: deleteExamSchema,
    },
    disabled: {
      create: {
        courseId: true,
      },
      update: {
        id: true,
        courseId: true,
      },
    },
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
