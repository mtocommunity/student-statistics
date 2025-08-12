import { createSemesterAction } from "@/semester/action/create-semester-action"
import { deleteSemesterAction } from "@/semester/action/delete-semester-action"
import { updateSemesterAction } from "@/semester/action/update-semester-action"

// Action
export const semesterActions = {
  create: createSemesterAction,
  update: updateSemesterAction,
  delete: deleteSemesterAction,
}
