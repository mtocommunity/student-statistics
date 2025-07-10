import { authAction } from "@/auth/action/auth-action";
import { semesterActions } from "@/semester/action/semester-actions";

export const server = {
  auth: authAction,
  semester: semesterActions,
};
