"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { useEffect, useState, type ComponentType } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TemperatureChart } from "./temperaturechart";
import { HumidityChart } from "./humiditychart";
import { AQIChart } from "./aqichart";
import { HeatIndexChart } from "./hichart";
import { PressureChart } from "./pressurechart";
import { MoistureChart } from "./moisturechart";
import { formatDateRangeLabel } from "@/lib/date-format";

type ChartComponentProps = {
  data: { time: string; value: number }[];
  ticks: string[];
  timeFrame: string;
};

const chartComponents: Record<string, ComponentType<ChartComponentProps>> = {
  temperature: TemperatureChart,
  humidity: HumidityChart,
  aqi: AQIChart,
  heatIndex: HeatIndexChart,
  pressure: PressureChart,
  moisture: MoistureChart,
};

const dataFieldMap = {
  temperature: "temperature",
  humidity: "humidity",
  aqi: "aqi",
  heatIndex: "hi",
  pressure: "pres",
  moisture: "moisture",
};

const unitMap = {
  temperature: " °C",
  humidity: "%",
  aqi: "",
  heatIndex: " °C",
  pressure: " hPa",
  moisture: "%",
};

export function LineChartComponent({
  cardTitle,
  dataType,
  timeFrame,
  data = [],
}: {
  cardTitle: string;
  dataType: string;
  timeFrame: string;
  data?: any[];
}) {
  const [value, setValue] = useState<number | null>(null);
  const [valueChange, setValueChange] = useState<number | null>(null);
  const [dateRange, setDateRange] = useState<string | null>(null);
  const [chartData, setChartData] = useState<{ data: { time: string; value: number }[]; ticks: string[] } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const processData = () => {
      setLoading(true);
      setChartData(null);
      setValue(null);
      setValueChange(null);
      setDateRange(null);

      try {
        if (!data || data.length === 0) {
            setLoading(false);
            return;
        }

        const now = new Date();
        // Since we are simulating a specific date, we use the "now" from the context if possible, 
        // but "new Date()" in browser will be the real current time. 
        // The user prompted "The current date is February 2, 2026."
        // However, standard specific logic usually uses the latest data point as reference or system time.
        // I will use system time "new Date()" but if the data is all in the past (2025), I might need to adjust.
        // Let's assume standard filtering: relative to NOW.
        
        // Actually, let's use the latest data point as "now" if available, to ensure charts show something for old data
        // logic: find max date in data.
        const maxDate = data.reduce((max, d) => (new Date(d.time) > max ? new Date(d.time) : max), new Date(0));
        // If maxDate is far in the past, effectively we shift the window or just show relative to maxDate?
        // Let's stick to valid timeFrame filtering. If "24 hours", it's last 24h from maxDate to show "latest 24h of data"
        // This is a common pattern for dashboards showing historical datasets.
        
        const referenceTime = maxDate.getTime() > 0 ? maxDate : now;

        let startTime: number;
        switch (timeFrame) {
          case "24 hours":
            startTime = referenceTime.getTime() - 24 * 60 * 60 * 1000;
            break;
          case "7 days":
            startTime = referenceTime.getTime() - 7 * 24 * 60 * 60 * 1000;
            break;
          case "14 days":
            startTime = referenceTime.getTime() - 14 * 24 * 60 * 60 * 1000;
            break;
          case "1 month":
            startTime = referenceTime.getTime() - 30 * 24 * 60 * 60 * 1000;
            break;
          case "lifetime":
            startTime = 0;
            break;
          default:
            startTime = referenceTime.getTime() - 7 * 24 * 60 * 60 * 1000;
        }

        const field = dataFieldMap[dataType as keyof typeof dataFieldMap] || dataType;

        const filtered = data
            .map((d: any) => ({
                time: d.time,
                value: d[field],
                dt: new Date(d.time).getTime()
            }))
            .filter((d) => d.dt >= startTime && d.dt <= referenceTime.getTime())
            .sort((a, b) => a.dt - b.dt);

        if (filtered.length > 0) {
            const formattedData = filtered.map(d => ({
                time: d.time,
                value: Number(Number(d.value).toFixed(2)) // Ensure it's a number
            }));

            // Ticks
            const totalPoints = formattedData.length;
            const tickCount = 6;
            const ticks = Array.from({ length: tickCount }, (_, i) => {
                const index = Math.floor((i * (totalPoints - 1)) / (tickCount - 1));
                return formattedData[index]?.time;
            }).filter(Boolean);

            setChartData({ data: formattedData, ticks });

            // Value (Latest)
            const latestVal = formattedData[formattedData.length - 1].value;
            setValue(latestVal);

            // Date Range
            setDateRange(
              formatDateRangeLabel(
                formattedData[0].time,
                formattedData[formattedData.length - 1].time,
              )
            );

            // Change
            const avg = formattedData.reduce((acc, curr) => acc + curr.value, 0) / totalPoints;
            if (avg !== 0) {
                 const change = ((latestVal - avg) / avg) * 100;
                 setValueChange(parseFloat(change.toFixed(2)));
            } else {
                 setValueChange(0);
            }
        }

      } catch (error) {
        console.error(`Error processing ${dataType} data:`, error);
      } finally {
        setLoading(false);
      }
    };

    processData();
  }, [dataType, timeFrame, data]);

  const ChartComponent = chartComponents[dataType];

  return (
    <Card className="equipment-card-inner border-zinc-50/10" >
      <CardHeader>
        <div className="flex flex-col gap-2 font-inter">
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>{loading ? <Skeleton className="h-4 w-32" /> : dateRange}</CardDescription>
        </div>
        <div className="font-inter">{loading ? <Skeleton className="h-6 w-20" /> : value !== null ? `${value.toFixed(2)}${unitMap[dataType]}` : "No data available"}</div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-[277px] w-full" />
        ) : (
          ChartComponent && (
            <ChartComponent
              data={chartData?.data ?? []}
              ticks={chartData?.ticks ?? []}
              timeFrame={timeFrame}
            />
          )
        )}
      </CardContent>
      <CardFooter>
        {loading ? (
          <Skeleton className="h-4 w-48" />
        ) : valueChange !== null ? (
          <div className="flex items-center gap-2 text-sm font-inter">
            {`Trending ${valueChange > 0 ? "up" : "down"} by ${Math.abs(valueChange)}% last ${timeFrame}`}
            {valueChange > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          </div>
        ) : (
          "No data"
        )}
      </CardFooter>
    </Card>
  );
}
