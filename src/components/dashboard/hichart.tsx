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
  heatIndex: {
    label: "Heat Index",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function HIChart() {
    const [chartData, setChartData] = React.useState<{ time: string; hi: number }[]>([]);
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

                const formattedData = filteredData.map((entry: { time: string; hi: number }) => ({
                    time: new Date(entry.time).toLocaleDateString("en-US", {
                        weekday: "short",
                    }),
                    hi: entry.hi,
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
                                    nameKey="hi"
                                />
                            }
                        />
                        <Line
                            dataKey="hi"
                            type="monotone"
                            stroke={`var(--color-hi)`}
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            )}
        </CardContent>
    );
}

export function HeatIndexChart() {
    const [chartData, setChartData] = React.useState<{ time: string; heatIndex: number }[]>([]);
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

                const formattedData = filteredData.map((entry: { time: string; hi: number }) => ({
                    time: new Date(entry.time).toLocaleDateString("en-US", {
                        weekday: "short",
                    }),
                    heatIndex: entry.hi, // Map "hi" from API to "heatIndex" for the chart
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
                                    nameKey="heatIndex"
                                />
                            }
                        />
                        <Line
                            dataKey="heatIndex"
                            type="monotone"
                            stroke={`var(--color-heatIndex)`}
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            )}
        </CardContent>
    );
}
