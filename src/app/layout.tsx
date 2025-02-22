import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CropSense",
  description: "Tech So Bright, Crops Grow Right!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
      appearance={{
        layout:{
          logoImageUrl: '/Logo_Rev_1_Transparent.png',
        },
        variables: {
          colorText: '#fff',
          colorPrimary: '#0E78F9',
          colorBackground: '#000000',
          colorInputBackground: '#ddeaf814',
          colorInputText: '#fff'
          
        }
      }}
      >
      <body className={twMerge(inter.className, "bg-black text-white antialiased")}>
        {children}
        </body>
        </ClerkProvider>
      
    </html>
  );
}
