"use client";
import { BentoCard } from "@/components/bentogrid";
import { Keyboard } from "@/components/keyboard";
import { LogoCluster } from "@/components/logocluster";
import { Map } from "@/components/map";
import { AnimatedBeamMultipleOutputDemo } from "@/components/MultipleAnimatedBeam";
import Orb from "@/components/Orb/Orb";
import React from "react";

const FeaturesSec = () => {
  return (
    <section  className="pb-12 mb-20 pt-[40rem] bg-dark ">
      <div className="container mx-auto">
        <div className="flex h-40">
        <video 
                src="/videos/3d-broadcast1.mp4"
                autoPlay
                loop
                playsInline
                height={170}
                className="mx-auto"
                muted />
        </div>
            
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
              
            <div className="mx-auto mb-[20px] max-w-[510px] text-center">
                
              <h2 className="text-[3.5rem] pt-4 font-bold text-center tracking-normal effect-font-gradient">
                Above and beyond
              </h2>
              <p className="text-white/70 text-xl font-inter text-center mt-4 tracking-tight">
              Next-level features to power your growth.
              </p>
            </div>
          </div>
        </div>
        <div id="features" className="mt-10 grid grid-cols-1 gap-4 sm:mt-8 lg:grid-cols-6 lg:grid-rows-2">
      <BentoCard
        eyebrow="Insight"
        title="Farm-Specific Real-Time Data"
        description="CropSense gathers real-time temperature, humidity, soil moisture, and air quality data directly from on-site sensors, ensuring farmers get hyper-local and highly accurate environmental information."
        graphic={
          <div style={{backgroundColor: '#030816' }}>
          <AnimatedBeamMultipleOutputDemo />
          </div>
        }
        fade={["bottom"]}
        className="max-lg:rounded-t-4xl lg:rounded-tl-4xl lg:col-span-3"
      />
      <BentoCard
        eyebrow="Analysis"
        title="AI-Powered Crop & Disease Predictions"
        description="The system recommends the best crops to sow based on real-time conditions and market trends while also identifying crop diseases using AI image recognition for proactive management."
        graphic={

          // <div className="absolute inset-0 bg-[url(https://res.cloudinary.com/eldoraui/image/upload/v1734021357/competitors_ouucah.png)] bg-[size:1100px_650px] bg-[left_-38px_top_-73px] bg-no-repeat" />

          <div style={{ width: '100%', height: '300px', position: 'relative', zIndex: 30, backgroundColor: '#030816' }}>
          <Orb
            hoverIntensity={0.5}
            rotateOnHover={true}
            hue={0}
            forceHoverState={false}
          />
        </div>

        }
        fade={["bottom"]}
        className="lg:rounded-tr-4xl lg:col-span-3"
      />
      <BentoCard
        eyebrow="Speed"
        title="Instant Alerts & Notifications"
        description="Farmers get instant alerts on droughts, fires, soil issues, and pests via SMS, app, and IVR."
        graphic={
          <div className="flex size-full pl-10 pt-10">
            <Keyboard highlighted={["LeftCommand", "C", "S"]} />
          </div>
        }
        className="lg:rounded-bl-4xl lg:col-span-2"
      />
      <BentoCard
        eyebrow="Source"
        title="Community & Expert Support"
        description="Farmers connect, get expert advice, and join mentorships to improve techniques and knowledge."
        graphic={<LogoCluster />}
        className="lg:col-span-2"
      />
      <BentoCard
        eyebrow="Limitless"
        title="Government Scheme Integration"
        description="CropSense links farmers to government schemes, insurance, and financial aid for maximum support."
        graphic={<Map />}
        className="max-lg:rounded-b-4xl lg:rounded-br-4xl lg:col-span-2"
      />
    </div>
        
      </div>
    </section>
  );
};

export default FeaturesSec;


