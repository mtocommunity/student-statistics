import { authAction } from "@/auth/action/auth-actions"
import { courseAction } from "@/course/action/course-actions"
import { examAction } from "@/exam/action/exam-actions"
import { semesterAction } from "@/semester/action/semester-actions"

export const server = {
  auth: authAction,
  course: courseAction,
  semester: semesterAction,
  exam: examAction,
}
