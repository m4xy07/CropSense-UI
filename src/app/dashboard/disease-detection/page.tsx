"use client";

import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const API_URL = "https://data.cropsense.tech/data";

export default function Page() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [altitude, setAltitude] = useState<number | null>(null);
  const [timeFrame, setTimeFrame] = useState<string>("7 days");
  const [chartData, setChartData] = useState<{
    chartData: { label: string; price: number }[];
    harvestableMonth: string;
    bestCrop: string;
    recommendedFertilizer: string;
  } | null>(null);

  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [diseaseName, setDiseaseName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [diseaseDetails, setDiseaseDetails] = useState<{
    prevention: string;
    cause: string;
    cure: string;
  } | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const latestRecord = data[data.length - 1];
          const latestMonthData =
            latestRecord.harvestable_months[
              latestRecord.harvestable_months.length - 1
            ];

          setAltitude(parseFloat(latestRecord?.alt?.toFixed(2)));

          setChartData({
            chartData: [
              {
                label: "Wholesale",
                price: parseFloat(latestMonthData.wholesale_price.toFixed(2)),
              },
              {
                label: "Retail",
                price: parseFloat(latestMonthData.retail_price.toFixed(2)),
              },
            ],
            harvestableMonth: latestMonthData.month,
            bestCrop: latestRecord.best_crop || "Unknown",
            recommendedFertilizer:
              latestRecord.recommended_fertilizer || "Unknown",
          });
        } else {
          console.warn("API returned an empty or invalid response.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const fetchDiseaseInfo = async (disease: string) => {
    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=PROCESS.ENV.GAPIKEY",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Provide concise information about the disease ${disease} under the following headings: Prevention, Cause, and Cure. Use bullet points for each heading.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error("Error response from API:", errorDetails);
        throw new Error("Failed to fetch disease information");
      }

      const data = await response.json();
      const content = data?.contents?.[0]?.parts?.[0]?.text || "";

      const preventionMatch = content.match(
        /Prevention[\s\S]*?(?:\n|\r)([\s\S]*?)(?:\n\n|$)/
      );
      const causeMatch = content.match(
        /Cause[\s\S]*?(?:\n|\r)([\s\S]*?)(?:\n\n|$)/
      );
      const cureMatch = content.match(
        /Cure[\s\S]*?(?:\n|\r)([\s\S]*?)(?:\n\n|$)/
      );

      return {
        prevention: preventionMatch
          ? preventionMatch[1].trim()
          : "No information available",
        cause: causeMatch ? causeMatch[1].trim() : "No information available",
        cure: cureMatch ? cureMatch[1].trim() : "No information available",
      };
    } catch (error) {
      console.error("Error fetching disease information:", error);
      return {
        prevention: "Error fetching information",
        cause: "Error fetching information",
        cure: "Error fetching information",
      };
    }
  };

  const handleDiseaseInfo = async () => {
    if (!diseaseName) return;

    setLoading(true);
    try {
      const diseaseInfo = await fetchDiseaseInfo(diseaseName);
      if (diseaseInfo) {
        setDiseaseDetails(diseaseInfo);
      }
    } catch (error) {
      console.error("Error handling disease information:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (diseaseName) {
      handleDiseaseInfo();
    }
  }, [diseaseName]);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setUploadedImage(file);

      const formData = new FormData();
      formData.append("image", file);

      setLoading(true);
      try {
        const response = await fetch("http://128.199.255.54:5000/getdiseases", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Failed to fetch disease data");

        const data = await response.json();
        setResultImage(`http://128.199.255.54:5000${data.image_url}`);
        setDiseaseName(data.disease_name);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <SidebarProvider className="dark font-inter">
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex justify-between w-full pr-4">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Disease Detections</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col items-center gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="col-span-3 text-center">
              <h2 className="text-xl font-semibold">Disease Detection</h2>
              <p className="text-gray-500">
                Upload an image to detect crop diseases.
              </p>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mt-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />

              {loading && (
                <p className="mt-4 text-blue-500">Processing image...</p>
              )}

              {resultImage && (
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-medium">Detection Result</h3>
                  <img
                    src={resultImage}
                    alt="Result"
                    className="mt-2 rounded-lg border border-gray-200 mx-auto"
                  />
                  <p className="mt-2 text-gray-700">
                    Detected Disease: <strong>{diseaseName}</strong>
                  </p>
                </div>
              )}

              {diseaseDetails && (
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-medium">Disease Information</h3>
                  <div className="mt-2">
                    <h4 className="text-md font-semibold">Prevention</h4>
                    <p className="text-gray-700">{diseaseDetails.prevention}</p>
                  </div>
                  <div className="mt-2">
                    <h4 className="text-md font-semibold">Cause</h4>
                    <p className="text-gray-700">{diseaseDetails.cause}</p>
                  </div>
                  <div className="mt-2">
                    <h4 className="text-md font-semibold">Cure</h4>
                    <p className="text-gray-700">{diseaseDetails.cure}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {/* <div className="aspect-video rounded-xl bg-muted/50">
              {chartData ? (
                <BarChartComponent cardTitle="Crop Harvest & Pricing" data={chartData} />
              ) : (
                <p className="text-center text-gray-500">Loading...</p>
              )}
            </div> */}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
