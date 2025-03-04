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

export function LineChartComponent({ cardTitle, dataType }: { cardTitle: string, dataType: string }) {
  const [value, setValue] = useState<number | null>(null);
  const [valueChange, setValueChange] = useState<number | null>(null);
  const [dateRange, setDateRange] = useState<string | null>(null);

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

          // Calculate the average value of the week before the recorded week
          const weekBeforeData = data.slice(-14, -7);
          let weekBeforeAvgValue = weekBeforeData.reduce((sum, entry) => sum + entry[dataFieldMap[dataType]], 0) / weekBeforeData.length;
          if (dataType === 'pressure') {
            weekBeforeAvgValue /= 100; // Divide pressure value by 100
          }
          console.log(`Week before average ${dataType}:`, weekBeforeAvgValue);

          // Calculate the percentage change
          const change = ((latestValue - weekBeforeAvgValue) / weekBeforeAvgValue) * 100;
          setValueChange(parseFloat(change.toFixed(2)));

          // Set the date range
          const earliestMonth = new Date(data[0].time).toLocaleString('default', { month: 'long' });
          const latestMonth = new Date(data[data.length - 1].time).toLocaleString('default', { month: 'long' });
          setDateRange(`${earliestMonth} - ${latestMonth} ${new Date().getFullYear()}`);
        } else {
          console.warn("API returned an empty or invalid response.");
        }
      } catch (error) {
        console.error(`Error fetching ${dataType} data:`, error);
      }
    };

    fetchData();
  }, [dataType]);

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
        {ChartComponent && <ChartComponent />}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {valueChange !== null ? (
            <>
              {`Trending ${valueChange > 0 ? 'up' : 'down'} by ${Math.abs(valueChange)}% this week`}
              {valueChange > 0 ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
            </>
          ) : 'Calculating change...'}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing {dataType} trends for the last week
        </div>
      </CardFooter>
    </Card>
  )
}
