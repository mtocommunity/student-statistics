import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/core/components/ui/chart"
import { actions } from "astro:actions"
import { useEffect, useState } from "react"
import { Bar, BarChart, Pie, PieChart, XAxis, YAxis } from "recharts"

export function QuestionsScores({
  type,
  exam,
}: {
  type: "pie" | "bar"
  exam: number
}) {
  const [questions, setQuestions] = useState<
    { questionId: number; scores: number[]; nOrder: number }[] | null
  >(null)

  useEffect(() => {
    ;(async () => {
      const res = await actions.exam.scorePerQuestion({
        examId: exam,
      })
      console.log(res.data?.questions)
      if (res.data?.questions) {
        setQuestions(res.data.questions)
      }
    })()
  }, [])

  if (questions === null) {
    return <div>Loading...</div>
  }

  switch (type) {
    case "pie":
      return (
        <div>
          <ChartContainer
            config={{
              amount: {
                label: "Puntuación media",
              },
            }}
            className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie
                data={questions.map((q) => ({
                  text: `Pregunta ${q.nOrder} `,
                  amount:
                    q.scores.reduce((acc, score) => acc + score) /
                      q.scores.length || 0,
                  fill: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
                }))}
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
                label: "Puntuación media",
              },
            }}
            className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
          >
            <BarChart
              data={questions.map((q) => ({
                text: `Pregunta ${q.nOrder} `,
                amount:
                  q.scores.reduce((acc, score) => acc + score) /
                    q.scores.length || 0,
                fill: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
              }))}
            >
              <ChartTooltip content={<ChartTooltipContent />} />
              <XAxis dataKey="text" />
              <YAxis />
              <Bar dataKey="amount" />
            </BarChart>
          </ChartContainer>
        </div>
      )
  }
}
