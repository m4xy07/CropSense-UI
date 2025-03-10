"use client";
import React from "react";

import { MacbookScrollDemo } from "@/components/Macbook";
import { MorphingTextDemo } from "@/components/MorphingTextDemo";

const MacbookSec = () => {
  return (
    
    <section id="team" className="pb-10  lg:pb-20">
      <div className="flex h-40 mb-8">
        <video 
                src="/videos/3d-control.mp4"
                autoPlay
                loop
                playsInline
                height={170}
                className="mx-auto"
                muted />
        </div>
      <MorphingTextDemo />
      <p className="text-white/70 text-lg text-center mt-0 tracking-normal">
        Real-time access, anytime, anywhere.
      </p>
      <div className="container mt-24 mx-auto">
         <MacbookScrollDemo/> 
      </div>
    </section>
  );
};

export default MacbookSec;


