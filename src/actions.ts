import { authAction } from "@/auth/action/auth-action"
import { courseAction } from "@/course/action/course-action"
import { examAction } from "@/exam/action/exam-action"
import { semesterAction } from "@/semester/action/semester-action"

export const server = {
  auth: authAction,
  course: courseAction,
  semester: semesterAction,
  exam: examAction,
}
