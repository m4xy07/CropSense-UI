import Link from 'next/link'
import React from 'react';
import Image from "next/image";
import { ChevronLeft } from 'lucide-react';
import OnboardingForm from '@/components/spectrumui/multistepformdemo';

const page = () => {
  return (
    <div className='flex h-screen flex-col justify-between dark main-dashboard-theme theme-color font-inter'>
      <div className='flex flex-row justify-between p-3'>
        <Link href="/">
          <Image
            src="/Logo_Rev_1_Transparent.png"
            alt="Logo"
            width={125}
            height={50}
            className="mx-auto "
          />
        </Link>
        <Link href="/">
        <div className="flex items-center w-fit bg-transparent p-[6px] rounded-[8px] relative group hover:bg-[rgba(255,255,255,.025)] transition-colors ease-in-out duration-200">
            <ChevronLeft className="h-4 w-4 text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff]"/>
            <span className="text-[14px] font-normal text-[rgba(255,255,255,.9)] ease-in-out duration-200 group-hover:text-[#8f8fff] pl-[6px]">Back to CropSense</span>
        </div>
        </Link>
      </div>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[rgba(255,255,255,.025)] rounded-xl border border-zinc-50/10'>
        <OnboardingForm />
      </div>
    </div>
  )
}

export default page
