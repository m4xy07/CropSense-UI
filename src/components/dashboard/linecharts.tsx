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

const API_URL = "https://data.cropsense.tech/data";

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
    const fetchData = async () => {
      setLoading(true);
      setChartData(null);
      setValue(null);
      setValueChange(null);
      setDateRange(null);

      try {
        const requestUrl = `${API_URL}?timeFrame=${encodeURIComponent(timeFrame)}`;
        const response = await fetch(requestUrl);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          let latestValue = data[data.length - 1]?.[dataFieldMap[dataType]];
          if (latestValue === undefined) throw new Error(`Data field ${dataFieldMap[dataType]} is undefined`);
          if (dataType === "pressure") latestValue /= 100;
          setValue(parseFloat(latestValue.toFixed(2)));

          const now = new Date();
          let startDate;
          switch (timeFrame) {
            case "24 hours":
              startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
              break;
            case "7 days":
              startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
              break;
            case "14 days":
              startDate = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
              break;
            case "1 month":
              startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
              break;
            case "lifetime":
              startDate = new Date(data[0].time);
              break;
            default:
              startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          }

          const filteredData = data.filter((entry: { time: string }) => {
            const entryDate = new Date(entry.time);
            return entryDate >= startDate && entryDate <= now;
          });

          const formattedData = filteredData.map((entry) => ({
            time: new Date(entry.time).toISOString().split("T")[0], // Keeps YYYY-MM-DD format
            value: entry[dataFieldMap[dataType]],
          }));

          // Calculate ticks for the X-axis
          const totalPoints = formattedData.length;
          let tickCount = 0;
          switch (timeFrame) {
            case "24 hours":
              tickCount = 2; // 2 date points
              break;
            case "7 days":
              tickCount = 3; // 3 date points
              break;
            case "14 days":
              tickCount = 6; // 6 date points
              break;
            case "1 month":
              tickCount = 5; // 6 date points
              break;
            case "lifetime":
              tickCount = Math.min(12, totalPoints); // 1 point per month, up to 12 months
              break;
          }

          // Ensure ticks are evenly distributed
          const ticks = Array.from({ length: tickCount }, (_, i) => {
            const index = Math.floor((i * totalPoints) / tickCount);
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

          let timeFrameAvgValue =
            filteredData.reduce((sum, entry) => sum + entry[dataFieldMap[dataType]], 0) / filteredData.length;
          if (dataType === "pressure") timeFrameAvgValue /= 100;
          const change = ((latestValue - timeFrameAvgValue) / timeFrameAvgValue) * 100;
          setValueChange(parseFloat(change.toFixed(2)));
        }
      } catch (error) {
        console.error(`Error fetching ${dataType} data:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
