import { actions } from "astro:actions";
import { useEffect, useState } from "react";

export function StudentsPassed({
  type,
  exam,
}: {
  type: "pie" | "bar";
  exam: number;
}) {
  const [studentsPassed, setStudentsPassed] = useState<{
    studentsPassed: number;
    totalStudents: number;
  } | null>(null);

  useEffect(() => {
    (async () => {
      const res = await actions.exam.studentsPassed({
        examId: exam,
      });
      if (res.data) {
        setStudentsPassed(res.data);
      }
    })();
  }, []);

  if (studentsPassed === null) {
    return <div>Loading...</div>;
  }

  switch (type) {
    case "pie":
      return <div>a</div>;
    case "bar":
      return <div>StudentsPassedBar</div>;
  }
}
