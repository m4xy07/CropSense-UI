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
}: {
  cardTitle: string;
  dataType: string;
  timeFrame: string;
}) {
  const [value, setValue] = useState<number | null>(null);
  const [valueChange, setValueChange] = useState<number | null>(null);
  const [dateRange, setDateRange] = useState<string | null>(null);
  const [chartData, setChartData] = useState<{ data: { time: string; value: number }[]; ticks: string[] } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const generateData = () => {
      setLoading(true);
      setChartData(null);
      setValue(null);
      setValueChange(null);
      setDateRange(null);

      try {
        const now = new Date();
        let startDate;
        let points = 24; // Default number of points

        switch (timeFrame) {
          case "24 hours":
            startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
            points = 24;
            break;
          case "7 days":
            startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            points = 28; // 4 per day
            break;
          case "14 days":
            startDate = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
            points = 28; // 2 per day
            break;
          case "1 month":
            startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
            points = 30; // 1 per day
            break;
          case "lifetime":
             startDate = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
             points = 60;
             break;
          default:
            startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        }

        const data: { time: string; value: number }[] = [];
        const interval = (now.getTime() - startDate.getTime()) / points;

        // Generate artificial data based on dataType
        let baseValue = 0;
        let variation = 0;

        switch (dataType) {
          case "temperature": baseValue = 28; variation = 5; break;
          case "humidity": baseValue = 65; variation = 15; break;
          case "aqi": baseValue = 45; variation = 30; break;
          case "heatIndex": baseValue = 32; variation = 4; break;
          case "pressure": baseValue = 1013; variation = 5; break;
          case "moisture": baseValue = 50; variation = 20; break;
        }

        let currentValue = baseValue;

        for (let i = 0; i <= points; i++) {
            const time = new Date(startDate.getTime() + i * interval);
            const change = (Math.random() - 0.5) * (variation / 2);
            currentValue += change;
            currentValue += (baseValue - currentValue) * 0.1; // Soft mean reversion

            let val = currentValue;
            
            // Add some trend based on time of day for temp/humidity if "24 hours"
            if (timeFrame === "24 hours") {
                const hour = time.getHours();
                if (dataType === "temperature" || dataType === "heatIndex") {
                    if (hour > 6 && hour < 18) val += 3; // warmer during day
                    else val -= 2;
                }
            }

            data.push({
                time: time.toISOString(),
                value: parseFloat(val.toFixed(2)),
            });
        }

        if (data.length > 0) {
          let latestValue = data[data.length - 1].value;
          setValue(latestValue);

          const filteredData = data; // Already correct timeframe

          if (filteredData.length === 0) {
            setChartData({ data: [], ticks: [] });
            setDateRange(null);
            setValueChange(null);
            return;
          }

          const formattedData = filteredData; // Data is already in correct format

          // Calculate ticks for the X-axis
          const totalPoints = formattedData.length;
          let tickCount = 6;
          
          // Ensure ticks are evenly distributed
          const ticks = Array.from({ length: tickCount }, (_, i) => {
            const index = Math.floor((i * (totalPoints - 1)) / (tickCount - 1)); 
            return formattedData[index]?.time;
          }).filter(Boolean);

          setChartData({ data: formattedData, ticks });

          if (formattedData.length > 0) {
            setDateRange(
              formatDateRangeLabel(
                formattedData[0].time,
                formattedData[formattedData.length - 1].time,
              ),
            );
          }

          let timeFrameAvgValue =
            filteredData.reduce((sum, entry) => sum + entry.value, 0) / filteredData.length;
          // Pressure division moved to data generation

          const change = ((latestValue - timeFrameAvgValue) / timeFrameAvgValue) * 100;
          setValueChange(parseFloat(change.toFixed(2)));
        }
      } catch (error) {
        console.error(`Error generating ${dataType} data:`, error);
      } finally {
        setLoading(false);
      }
    };

    generateData();
  }, [dataType, timeFrame]);

  const ChartComponent = chartComponents[dataType];

  return (
    <Card className="equipment-card-inner border-zinc-50/10" >
      <CardHeader>
        <div className="flex flex-col gap-2 font-inter">
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>{loading ? <Skeleton className="h-4 w-32" /> : dateRange}</CardDescription>
        </div>
        <div className="font-inter">{loading ? <Skeleton className="h-6 w-20" /> : value !== null ? `${value}${unitMap[dataType]}` : "No data available"}</div>
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
