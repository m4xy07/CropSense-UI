"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { useEffect, useState } from "react";
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

// Static data based on provided values
const STATIC_BASE_VALUES = {
  temperature: 26.8,
  humidity: 78.5,
  aqi: 58,
  heatIndex: 28.4,
  pressure: 1008.7,
  moisture: 48.3,
};

// Interface for generated data points
interface GeneratedDataPoint {
  time: string;
  value: number;
}

// Generate realistic historical data points
const generateStaticData = (baseValue: number, dataType: string, timeFrame: string): GeneratedDataPoint[] => {
  const now = new Date("2025-09-24T18:45:12.000Z");
  let startDate: Date;
  let pointCount: number;
  
  switch (timeFrame) {
    case "24 hours":
      startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      pointCount = 24;
      break;
    case "7 days":
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      pointCount = 7;
      break;
    case "14 days":
      startDate = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
      pointCount = 14;
      break;
    case "1 month":
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      pointCount = 30;
      break;
    case "lifetime":
      startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000); // 3 months
      pointCount = 90;
      break;
    default:
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      pointCount = 7;
  }
  
  const data: GeneratedDataPoint[] = [];
  const timeStep = (now.getTime() - startDate.getTime()) / pointCount;
  
  for (let i = 0; i <= pointCount; i++) {
    const currentTime = new Date(startDate.getTime() + i * timeStep);
    // Add realistic variation to base value
    const variation = (Math.random() - 0.5) * 0.2; // ±10% variation
    let value = baseValue * (1 + variation);
    
    // Add some trend based on data type
    if (dataType === "temperature" || dataType === "heatIndex") {
      value += Math.sin(i / pointCount * Math.PI * 2) * 2; // Cyclical pattern
    } else if (dataType === "humidity") {
      value += Math.cos(i / pointCount * Math.PI * 2) * 5; // Different cyclical pattern
    }
    
    data.push({
      time: currentTime.toISOString().split('T')[0],
      value: Math.max(0, parseFloat(value.toFixed(2)))
    });
  }
  
  return data;
};

const chartComponents = {
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
  temperature: "°C",
  humidity: "%",
  aqi: "",
  heatIndex: "°C",
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
        // Get base value for this data type
        let baseValue = STATIC_BASE_VALUES[dataType];
        if (!baseValue) {
          throw new Error(`Unknown data type: ${dataType}`);
        }
        
        // Convert pressure from hPa to the display format (divide by 100 if needed)
        let latestValue = baseValue;
        if (dataType === "pressure") {
          latestValue = baseValue / 100;
        }
        setValue(parseFloat(latestValue.toFixed(2)));

        // Generate static data
        const data = generateStaticData(baseValue, dataType, timeFrame);
        
        const formattedData = data.map((entry) => ({
          time: entry.time,
          value: dataType === "pressure" ? entry.value / 100 : entry.value,
        }));

        // Calculate ticks for the X-axis
        const totalPoints = formattedData.length;
        let tickCount = 0;
        switch (timeFrame) {
          case "24 hours":
            tickCount = 2;
            break;
          case "7 days":
            tickCount = 3;
            break;
          case "14 days":
            tickCount = 6;
            break;
          case "1 month":
            tickCount = 5;
            break;
          case "lifetime":
            tickCount = Math.min(12, totalPoints);
            break;
        }

        // Ensure ticks are evenly distributed
        const ticks = Array.from({ length: tickCount }, (_, i) => {
          const index = Math.floor((i * (totalPoints - 1)) / (tickCount - 1));
          return formattedData[index]?.time;
        }).filter(Boolean);

        setChartData({ data: formattedData, ticks });

        const formatDate = (dateString: string) => {
          const date = new Date(dateString);
          const day = date.getDate();
          const month = date.toLocaleString("en-US", { month: "long" });
          const suffix =
            day % 10 === 1 && day !== 11
              ? "st"
              : day % 10 === 2 && day !== 12
              ? "nd"
              : day % 10 === 3 && day !== 13
              ? "rd"
              : "th";
          return `${day}${suffix} ${month}`;
        };

        setDateRange(`${formatDate(formattedData[0].time)} - ${formatDate(formattedData[formattedData.length - 1].time)}`);

        // Calculate average and trend
        const timeFrameAvgValue = formattedData.reduce((sum, entry) => sum + entry.value, 0) / formattedData.length;
        const change = ((latestValue - timeFrameAvgValue) / timeFrameAvgValue) * 100;
        setValueChange(parseFloat(change.toFixed(2)));
        
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
        {loading ? <Skeleton className="h-[277px] w-full" /> : ChartComponent && <ChartComponent data={chartData?.data} ticks={chartData?.ticks} />}
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
