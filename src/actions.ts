import { authAction } from "@/auth/action/auth-action"
import { examAction } from "@/exam/action/exam-actions"
import { semesterActions } from "@/semester/action/semester-action"

export const server = {
  auth: authAction,
  semester: semesterActions,
  exam: examAction,
}
