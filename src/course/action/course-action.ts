import { createCourseAction } from "@/course/action/create-course-action"
import { deleteCourseAction } from "@/course/action/delete-course-action"
import { updateCourseAction } from "@/course/action/update-course-action"

// Actions
export const courseAction = {
  create: createCourseAction,
  update: updateCourseAction,
  delete: deleteCourseAction,
}
