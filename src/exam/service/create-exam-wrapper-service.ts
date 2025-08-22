import { studentScoreService } from "@/exam/service/student-score-service"
import type { CreateExamenWithExcel } from "@/exam/validation/exam-validation"
import { actions } from "astro:actions"

// Wrapper for the service and action
export async function createExamWrapperService(
  input: CreateExamenWithExcel
): Promise<ReturnType<typeof actions.exam.create>> {
  try {
    // Process the service
    const examTable = await studentScoreService.process(input.file)

    return actions.exam.create({
      courseId: input.courseId,
      name: input.name,
      minPassingScore: input.minPassingScore,
      examTable,
    })
  } catch (error) {
    // Show the error message
    if (
      error instanceof Error &&
      "message" in error &&
      typeof error.message === "string"
    ) {
      return new Promise((resolve) =>
        resolve({
          data: {
            success: false,
            message: error.message,
          },
          error: undefined,
        })
      )
    }

    // Show default message
    return new Promise((resolve) =>
      resolve({
        data: {
          success: false,
          message: "Parece que ha ocurrido un error inesperado",
        },
        error: undefined,
      })
    )
  }
}
