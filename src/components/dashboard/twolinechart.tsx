"use client"

import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { Epochs: "1", accuracy1: 0.750, accuracy2: 0.780 },
  { Epochs: "2", accuracy1: 0.800, accuracy2: 0.820 },
  { Epochs: "3", accuracy1: 0.815, accuracy2: 0.835 },
  { Epochs: "4", accuracy1: 0.850, accuracy2: 0.855 },
  { Epochs: "5", accuracy1: 0.870, accuracy2: 0.880 },
  { Epochs: "6", accuracy1: 0.880, accuracy2: 0.887 },
  { Epochs: "7", accuracy1: 0.890, accuracy2: 0.898 },
  { Epochs: "8", accuracy1: 0.900, accuracy2: 0.910 },
  { Epochs: "9", accuracy1: 0.915, accuracy2: 0.921 },
  { Epochs: "10", accuracy1: 0.923, accuracy2: 0.930 },
]

const chartConfig = {
  accuracy1: {
    label: "ResNet-18",
    color: "hsl(var(--chart-1))",
  },
  accuracy2: {
    label: "EfficientNet-B0",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function TwoLineChartComponent() {
  return (
    <Card className="p-8 w-full max-w-[600px] h-full">
      <CardHeader>
        <CardTitle className="text-[20px] font-normal text-white">
          Crop Disease Prediction Comparison
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ right: 20, left: 40, bottom: 50 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="Epochs"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                ticks={["2", "4", "6", "8", "10"]}
                label={{
                  value: "Epochs",
                  position: "insideBottom",
                  offset: -30,
                  style: { fill: "white" },
                }}
              />
              <YAxis
                domain={[0.75, 1]}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.toFixed(2)}
                label={{
                  value: "Accuracy",
                  angle: -90,
                  position: "insideLeft",
                  offset: -30,
                  style: { fill: "white" },
                }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent className="w-[160px]" />}
              />
              <Line
                dataKey="accuracy1"
                type="monotone"
                stroke="var(--color-accuracy1)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="accuracy2"
                type="monotone"
                stroke="var(--color-accuracy2)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
