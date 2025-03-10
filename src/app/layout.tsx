import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "CropSense",
  description: "Tech So Bright, Crops Grow Right!",
  openGraph: {
    images: [
      {
        url: "/Logo_Rev_1_Transparent.png",
        width: 800,
        height: 600,
        alt: "CropSense Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: "/Logo_Rev_1_Transparent.png",
        width: 800,
        height: 600,
        alt: "CropSense Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <ClerkProvider
        appearance={{
          layout: {
            logoImageUrl: "/Logo_Rev_1_Transparent.png",
          },
          variables: {
            colorText: "#fff",
            colorPrimary: "#0E78F9",
            colorBackground: "#000000",
            colorInputBackground: "#ddeaf814",
            colorInputText: "#fff",
          },
        }}
      >
        <body
          className={twMerge(
            "font-Rebond-Grotesque",
            "bg-black text-white antialiased"
          )}
        >
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
