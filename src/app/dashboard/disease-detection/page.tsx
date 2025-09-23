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
import UploadComponent from "@/components/comp-545";
import { NavUser } from "@/components/nav-user";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { TextShimmer } from "@/components/shining-text";
import { Bell } from "lucide-react";
import NotificationsComponent from "@/components/comp-383";


export default function Page() {
  

  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [diseaseName, setDiseaseName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [diseaseDetails, setDiseaseDetails] = useState<{
    prevention: string;
    cause: string;
    cure: string;
  } | null>(null);

  

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
      const cureMatch2 = content.match(
        /Cure[\s\S]*?(?:\n|\r)([\s\S]*?)(?:\n\n|$)/
      );

      return {
        prevention: preventionMatch
          ? preventionMatch[1].trim()
          : "No information available",
        cause: causeMatch ? causeMatch[1].trim() : "No information available",
        cure: cureMatch2 ? cureMatch2[1].trim() : "No information available",
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

  // Handler for drag-and-drop uploader
  const handleImageUpload = async (file: File) => {
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
  };

  const { user } = useUser();
  const pathname = usePathname();

  const data = {
    user: {
      name: user?.fullName || "Guest",
      email: user?.primaryEmailAddress?.emailAddress || "guest@example.com",
      avatar: user?.imageUrl || "/avatars/default.jpg",
    },
    
  };

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
                    <BreadcrumbPage className="text-white">Disease Detections</BreadcrumbPage>
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

        <div className="flex flex-1 flex-col items-center gap-4 p-4 pt-0 justify-center ">
            <div className="col-span-3 text-center">
              {/* <h2 className="text-xl font-semibold">Disease Detection</h2> */}
              {/* <p className="text-[#ffffffc7] mb-4">
                Upload an image to detect crop diseases.
              </p> */}

              {/* Use the new UploadComponent and pass the handler */}
              <UploadComponent onFileUpload={handleImageUpload} loading={loading} />

              {loading && (
                <TextShimmer className='font-inter mt-4 text-[16px]' duration={1}>
                  Processing image...
                </TextShimmer>
                // <p className="mt-4 text-blue-500">Processing image...</p>
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
      </SidebarInset>
    </SidebarProvider>
  );
}
