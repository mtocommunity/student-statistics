import { createExamAction } from "@/exam/action/create-exam-action"
import { deleteExamAction } from "@/exam/action/delete-exam-action"
import { scorePerQuestionAction } from "@/exam/action/score-per-question-action"
import { studentsPassedAction } from "@/exam/action/students-passed-action"
import { updateExamAction } from "@/exam/action/update-exam-action"

// Actions
export const examAction = {
  scorePerQuestion: scorePerQuestionAction,
  studentsPassed: studentsPassedAction,
  create: createExamAction,
  update: updateExamAction,
  delete: deleteExamAction,
}
