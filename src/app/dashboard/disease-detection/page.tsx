"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

import { AppSidebar } from "@/components/app-sidebar";
import NotificationsComponent from "@/components/comp-383";
import UploadComponent from "@/components/comp-545";
import { NavUser } from "@/components/nav-user";
import { TextShimmer } from "@/components/shining-text";
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

type DiseaseDetails = {
  prevention: string;
  cause: string;
  cure: string;
};

type SensorSnapshot = {
  time?: string;
  temperature?: number;
  humidity?: number;
  moisture?: number;
  raining?: string;
};

type RiskAssessment = {
  level: "High" | "Moderate" | "Low";
  message: string;
  checks: {
    label: string;
    passed: boolean;
  }[];
  readings: {
    temperature: number | null;
    humidity: number | null;
    moisture: number | null;
    raining: string;
    timestamp: string;
  };
};

function toNumber(value: unknown): number | null {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function calculateTomatoDiseaseRisk(
  snapshot: SensorSnapshot | null,
): RiskAssessment {
  const temperature = toNumber(snapshot?.temperature);
  const humidity = toNumber(snapshot?.humidity);
  const moisture = toNumber(snapshot?.moisture);
  const raining = String(snapshot?.raining ?? "unknown").toLowerCase();
  const timestamp = snapshot?.time
    ? new Date(snapshot.time).toLocaleString()
    : "Unknown";

  const tempInRange =
    temperature !== null && temperature >= 24 && temperature <= 29;
  const highHumidity = humidity !== null && humidity > 80;
  const continuousMoisture =
    (moisture !== null && moisture >= 20) || raining === "yes";

  const checks = [
    { label: "Temperature between 24-29°C", passed: tempInRange },
    { label: "Humidity above 80%", passed: highHumidity },
    {
      label: "Continuous moisture / wetness likely",
      passed: continuousMoisture,
    },
  ];

  const score = checks.filter((check) => check.passed).length;

  if (score === 3) {
    return {
      level: "High",
      message:
        "High risk of Early Blight in the next 48 hours for tomato. Preventive spray is recommended.",
      checks,
      readings: {
        temperature,
        humidity,
        moisture,
        raining,
        timestamp,
      },
    };
  }

  if (score === 2) {
    return {
      level: "Moderate",
      message:
        "Moderate early-blight risk for tomato. Increase monitoring and prepare preventive treatment.",
      checks,
      readings: {
        temperature,
        humidity,
        moisture,
        raining,
        timestamp,
      },
    };
  }

  return {
    level: "Low",
    message:
      "Current sensor conditions indicate low early-blight risk for tomato. Keep regular monitoring active.",
    checks,
    readings: {
      temperature,
      humidity,
      moisture,
      raining,
      timestamp,
    },
  };
}

export default function Page() {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [diseaseName, setDiseaseName] = useState<string | null>(null);
  const [cameraLoading, setCameraLoading] = useState<boolean>(false);
  const [riskLoading, setRiskLoading] = useState<boolean>(true);
  const [riskAssessment, setRiskAssessment] = useState<RiskAssessment | null>(
    null,
  );
  const [diseaseDetails, setDiseaseDetails] = useState<DiseaseDetails | null>(
    null,
  );

  const { user } = useUser();

  const data = {
    user: {
      name: user?.fullName || "Guest",
      email: user?.primaryEmailAddress?.emailAddress || "guest@example.com",
      avatar: user?.imageUrl || "/avatars/default.jpg",
    },
  };

  const fetchDiseaseInfo = async (disease: string): Promise<DiseaseDetails> => {
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
        },
      );

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error("Error response from API:", errorDetails);
        throw new Error("Failed to fetch disease information");
      }

      const payload = await response.json();
      const content = payload?.contents?.[0]?.parts?.[0]?.text || "";

      const preventionMatch = content.match(
        /Prevention[\s\S]*?(?:\n|\r)([\s\S]*?)(?:\n\n|$)/,
      );
      const causeMatch = content.match(
        /Cause[\s\S]*?(?:\n|\r)([\s\S]*?)(?:\n\n|$)/,
      );
      const cureMatch = content.match(
        /Cure[\s\S]*?(?:\n|\r)([\s\S]*?)(?:\n\n|$)/,
      );

      return {
        prevention: preventionMatch?.[1]?.trim() || "No information available",
        cause: causeMatch?.[1]?.trim() || "No information available",
        cure: cureMatch?.[1]?.trim() || "No information available",
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

    setCameraLoading(true);
    try {
      const diseaseInfo = await fetchDiseaseInfo(diseaseName);
      setDiseaseDetails(diseaseInfo);
    } catch (error) {
      console.error("Error handling disease information:", error);
    } finally {
      setCameraLoading(false);
    }
  };

  useEffect(() => {
    if (diseaseName) {
      handleDiseaseInfo();
    }
  }, [diseaseName]);

  useEffect(() => {
    let mounted = true;

    const fetchSensorRisk = async () => {
      try {
        const response = await fetch("https://data.cropsense.tech/");
        if (!response.ok) throw new Error("Failed to fetch sensor readings");
        const payload = await response.json();

        const latest =
          Array.isArray(payload) && payload.length > 0
            ? payload[payload.length - 1]
            : payload;

        if (!mounted) return;
        setRiskAssessment(calculateTomatoDiseaseRisk(latest));
      } catch (error) {
        console.error("Error fetching sensor risk data:", error);
        if (mounted) {
          setRiskAssessment(calculateTomatoDiseaseRisk(null));
        }
      } finally {
        if (mounted) {
          setRiskLoading(false);
        }
      }
    };

    fetchSensorRisk();
    const intervalId = setInterval(fetchSensorRisk, 60000);

    return () => {
      mounted = false;
      clearInterval(intervalId);
    };
  }, []);

  const handleImageUpload = async (file: File) => {
    setUploadedImage(file);
    const formData = new FormData();
    formData.append("image", file);
    setCameraLoading(true);
    try {
      const response = await fetch("http://128.199.255.54:5000/getdiseases", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to fetch disease data");
      const payload = await response.json();
      setResultImage(`http://128.199.255.54:5000${payload.image_url}`);
      setDiseaseName(payload.disease_name);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setCameraLoading(false);
    }
  };

  const riskColor =
    riskAssessment?.level === "High"
      ? "text-red-400"
      : riskAssessment?.level === "Moderate"
        ? "text-yellow-300"
        : "text-green-400";

  return (
    <SidebarProvider className="dark main-dashboard-theme theme-color font-inter">
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 text-white theme-color main-topbar-theme">
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
                    <BreadcrumbPage className="text-white">
                      Disease Detections
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <div className="flex flex-row gap-2 items-center mr-[-10px]">
                <NotificationsComponent />
                <Separator orientation="vertical" className="mx-2 h-4" />
                <NavUser user={data.user} />
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col items-center gap-4 p-4 pt-0 justify-center">
          <div className="w-full max-w-5xl text-center">
            <UploadComponent
              onFileUpload={handleImageUpload}
              loading={cameraLoading}
            />

            {cameraLoading && (
              <TextShimmer className="font-inter mt-4 text-[16px]" duration={1}>
                Processing image...
              </TextShimmer>
            )}

            <div className="mt-4 p-4 rounded-xl border border-zinc-50/10 equipment-card-inner text-left">
              <h3 className="text-lg font-medium text-white">
                Risk - Detection
              </h3>
              <p className="text-sm text-zinc-300 mt-1">
                Current planted crop:{" "}
                <span className="text-white font-medium">Tomato</span>
              </p>

              {riskLoading || !riskAssessment ? (
                <p className="text-zinc-300 mt-3">
                  Analyzing live conditions from sensors...
                </p>
              ) : (
                <div className="mt-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-300" />
                    <span className={`font-semibold ${riskColor}`}>
                      {riskAssessment.level} Risk
                    </span>
                  </div>
                  <p className="text-zinc-200 mt-2">{riskAssessment.message}</p>
                  <p className="text-zinc-400 text-xs mt-2">
                    Last sensor update: {riskAssessment.readings.timestamp}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4 text-sm">
                    <p className="text-zinc-200">
                      Temperature:{" "}
                      <span className="text-white">
                        {riskAssessment.readings.temperature ?? "N/A"}°C
                      </span>
                    </p>
                    <p className="text-zinc-200">
                      Humidity:{" "}
                      <span className="text-white">
                        {riskAssessment.readings.humidity ?? "N/A"}%
                      </span>
                    </p>
                    <p className="text-zinc-200">
                      Soil Moisture:{" "}
                      <span className="text-white">
                        {riskAssessment.readings.moisture ?? "N/A"}%
                      </span>
                    </p>
                    <p className="text-zinc-200">
                      Raining:{" "}
                      <span className="text-white">
                        {riskAssessment.readings.raining}
                      </span>
                    </p>
                  </div>

                  <div className="mt-4 space-y-2">
                    {riskAssessment.checks.map((check) => (
                      <div
                        key={check.label}
                        className="flex items-center gap-2 text-sm"
                      >
                        {check.passed ? (
                          <CheckCircle2 className="h-4 w-4 text-green-400" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-400" />
                        )}
                        <span className="text-zinc-200">{check.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

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
      </SidebarInset>
    </SidebarProvider>
  );
}
