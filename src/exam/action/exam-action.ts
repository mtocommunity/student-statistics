import { scorePerQuestionAction } from "@/exam/action/score-per-question-action"
import { studentsPassedAction } from "@/exam/action/students-passed-action"

export const examAction = {
  scorePerQuestion: scorePerQuestionAction,
  studentsPassed: studentsPassedAction,
}
