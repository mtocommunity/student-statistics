import { authAction } from "@/auth/action/auth-action"
import { courseActions } from "@/course/action/course-action"
import { examAction } from "@/exam/action/exam-action"
import { semesterActions } from "@/semester/action/semester-action"

export const server = {
  auth: authAction,
  course: courseActions,
  semester: semesterActions,
  exam: examAction,
}
