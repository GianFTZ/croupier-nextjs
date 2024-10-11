'use client'
import {
  Card, CardContent, CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { TrendingUp } from "lucide-react"

export default function Chart() {
  const chartData = [
    { month: "Janeiro", leads: 1860 },
    { month: "Fevereiro", leads: 3050  },
    { month: "Marco", leads: 2370  },
    { month: "Abril", leads: 730  },
    { month: "Maio", leads: 2090  },
    { month: "Junho", leads: 2140  },
  ]

  const chartConfig = {
    leads: {
      label: "leads",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig
  return (
    <>
      <CardHeader>
        <CardTitle>Grafico de leads</CardTitle>
        <CardDescription>Janeiro - Junho 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="px-8">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="leads"
              type="natural"
              stroke="var(--color-leads)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-leads)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Aumento de 5.3% esse mes! <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Mostrando o total de leads dos ultimos 6 meses
        </div>
      </CardFooter>
    </>
  )
}
