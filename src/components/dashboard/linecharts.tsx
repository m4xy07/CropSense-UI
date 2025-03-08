"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TemperatureChart } from "./temperaturechart"
import { HumidityChart } from "./humiditychart"
import { AQIChart } from "./aqichart"
import { HeatIndexChart } from "./hichart"
import { PressureChart } from "./pressurechart"
import { MoistureChart } from "./moisturechart"

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
  temperature: 'temperature',
  humidity: 'humidity',
  aqi: 'aqi',
  heatIndex: 'hi', // Correct field name for heat index
  pressure: 'pres', // Correct field name for pressure
  moisture: 'moisture',
};

const unitMap = {
  temperature: ' °C',
  humidity: '%',
  aqi: '',
  heatIndex: ' °C',
  pressure: ' hPa',
  moisture: '%',
};

export function LineChartComponent({ cardTitle, dataType, timeFrame }: { cardTitle: string, dataType: string, timeFrame: string }) {
  const [value, setValue] = useState<number | null>(null);
  const [valueChange, setValueChange] = useState<number | null>(null);
  const [dateRange, setDateRange] = useState<string | null>(null);
  const [chartData, setChartData] = useState<{ time: string; value: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log(`Fetching ${dataType} data...`);
      try {
        const response = await fetch(API_URL);
        console.log("Response received:", response);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (Array.isArray(data) && data.length > 0) {
          let latestValue = data[data.length - 1]?.[dataFieldMap[dataType]];
          if (latestValue === undefined) {
            throw new Error(`Data field ${dataFieldMap[dataType]} is undefined`);
          }
          if (dataType === 'pressure') {
            latestValue /= 100; // Divide pressure value by 100
          }
          console.log(`Latest ${dataType}:`, latestValue);
          setValue(parseFloat(latestValue.toFixed(2)));

          // Filter data based on the selected time frame
          const now = new Date();
          let startDate;
          switch (timeFrame) {
            case '24 hours':
              startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
              break;
            case '7 days':
              startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
              break;
            case '14 days':
              startDate = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
              break;
            case '1 month':
              startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
              break;
            case 'lifetime':
              startDate = new Date(data[0].time);
              break;
            default:
              startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          }

          const filteredData = data.filter((entry: { time: string }) => {
            const entryDate = new Date(entry.time);
            return entryDate >= startDate && entryDate <= now;
          });

          const formattedData = filteredData.map((entry: { time: string } & { [key: string]: number }) => ({
            time: new Date(entry.time).toLocaleDateString("en-US", {
              weekday: timeFrame === '24 hours' || timeFrame === '7 days' ? 'short' : undefined,
              month: timeFrame === '1 month' || timeFrame === 'lifetime' ? 'short' : undefined,
              day: 'numeric',
            }),
            value: dataType === 'pressure' ? entry[dataFieldMap[dataType]] / 100 : entry[dataFieldMap[dataType]],
          }));

          setChartData(formattedData);

          // Calculate the average value of the selected time frame
          let timeFrameAvgValue = filteredData.reduce((sum, entry) => sum + entry[dataFieldMap[dataType]], 0) / filteredData.length;
          if (dataType === 'pressure') {
            timeFrameAvgValue /= 100; // Divide pressure value by 100
          }
          console.log(`Time frame average ${dataType}:`, timeFrameAvgValue);

          // Calculate the percentage change
          const change = ((latestValue - timeFrameAvgValue) / timeFrameAvgValue) * 100;
          setValueChange(parseFloat(change.toFixed(2)));

          // Set the date range
          const earliestDate = new Date(filteredData[0].time).toLocaleDateString();
          const latestDate = new Date(filteredData[filteredData.length - 1].time).toLocaleDateString();
          setDateRange(`${earliestDate} - ${latestDate}`);
        } else {
          console.warn("API returned an empty or invalid response.");
        }
      } catch (error) {
        console.error(`Error fetching ${dataType} data:`, error);
      }
    };

    fetchData();
  }, [dataType, timeFrame]);

  const ChartComponent = chartComponents[dataType];

  return (
    <Card>
      <CardHeader>
        <div className="space-y-1.5">
          <CardTitle>{cardTitle}</CardTitle>
          <CardDescription>{dateRange || 'Loading date range...'}</CardDescription>
        </div>
        <div>
          {value !== null ? `${value}${unitMap[dataType]}` : 'Loading...'}
        </div>
      </CardHeader>
      <CardContent>
        {ChartComponent && <ChartComponent data={chartData} />}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {valueChange !== null ? (
            <>
              {`Trending ${valueChange > 0 ? 'up' : 'down'} by ${Math.abs(valueChange)}% last ${timeFrame}`}
              {valueChange > 0 ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
            </>
          ) : 'Calculating change...'}
        </div>
        <div className="leading-snug text-muted-foreground">
          Showing {dataType} trends for the selected time frame
        </div>
      </CardFooter>
    </Card>
  )
}
