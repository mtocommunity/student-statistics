import { createSemesterAction } from "@/semester/action/create-semester-action"
import { deleteSemesterAction } from "@/semester/action/delete-semester-action"
import { updateSemesterAction } from "@/semester/action/update-semester-action"

// Actions
export const semesterAction = {
  create: createSemesterAction,
  update: updateSemesterAction,
  delete: deleteSemesterAction,
}
