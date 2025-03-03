"use client";

import * as React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import {
  CardContent,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const API_URL = "https://data.cropsense.tech/data";

const chartConfig = {
  temperature: {
    label: "Temperature",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function TemperatureChart() {
    const [chartData, setChartData] = React.useState<{ time: string; temperature: number }[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error("Failed to fetch data");

                const data = await response.json();

                const now = new Date();
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(now.getDate() - 7);

                const filteredData = data.filter((entry: { time: string }) => {
                    const entryDate = new Date(entry.time);
                    return entryDate >= sevenDaysAgo && entryDate <= now;
                });

                const formattedData = filteredData.map((entry: { time: string; temperature: number }) => ({
                    time: new Date(entry.time).toLocaleDateString("en-US", {
                        weekday: "short",
                    }),
                    temperature: entry.temperature,
                }));

                setChartData(formattedData);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <CardContent>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <ChartContainer config={chartConfig} className="p-6 pt-0">
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{ left: -35, right: 12 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="time"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                        />
                        <YAxis />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[175px]"
                                    nameKey="temperature"
                                />
                            }
                        />
                        <Line
                            dataKey="temperature"
                            type="monotone"
                            stroke={`var(--color-temperature)`}
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            )}
        </CardContent>
    );
}
