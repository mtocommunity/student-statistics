import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/core/components/ui/chart"
import { actions } from "astro:actions"
import { useEffect, useState } from "react"
import { Bar, BarChart, Pie, PieChart, XAxis, YAxis } from "recharts"

export function StudentsPassed({
  type,
  exam,
}: {
  type: "pie" | "bar"
  exam: number
}) {
  const [studentsPassed, setStudentsPassed] = useState<{
    studentsPassed: number
    totalStudents: number
  } | null>(null)

  useEffect(() => {
    ;(async () => {
      const res = await actions.exam.studentsPassed({
        examId: exam,
      })
      if (res.data) {
        setStudentsPassed(res.data)
      }
    })()
  }, [])

  if (studentsPassed === null) {
    return <div>Loading...</div>
  }

  switch (type) {
    case "pie":
      return (
        <div>
          <ChartContainer
            config={{
              amount: {
                label: "Estudiantes",
              },
            }}
            className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie
                data={[
                  {
                    text: "Aprobados",
                    amount: studentsPassed.studentsPassed,
                    fill: "#2ec4b6",
                  },
                  {
                    text: "Desaprobados",
                    amount:
                      studentsPassed.totalStudents -
                      studentsPassed.studentsPassed,
                    fill: "#e71d36",
                  },
                ]}
                dataKey="amount"
                label
                nameKey="text"
              />
            </PieChart>
          </ChartContainer>
        </div>
      )
    case "bar":
      return (
        <div>
          <ChartContainer
            config={{
              amount: {
                label: "Cantidad",
              },
            }}
            className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
          >
            <BarChart
              data={[
                {
                  text: "Aprobados",
                  amount: studentsPassed.studentsPassed,
                  fill: "#2ec4b6",
                },
                {
                  text: "Desaprobados",
                  amount:
                    studentsPassed.totalStudents -
                    studentsPassed.studentsPassed,
                  fill: "#e71d36",
                },
              ]}
            >
              <ChartTooltip content={<ChartTooltipContent />} />
              <XAxis dataKey="text" />
              <YAxis allowDecimals={false} />
              <Bar dataKey="amount" />
            </BarChart>
          </ChartContainer>
        </div>
      )
  }
}
