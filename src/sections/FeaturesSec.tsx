import { BentoCard } from "@/components/bentogrid";
import { Keyboard } from "@/components/keyboard";
import { LogoCluster } from "@/components/logocluster";
import { Map } from "@/components/map";
import React from "react";

const FeaturesSec = () => {
  return (
    <section id="team" className="pb-10 mb-40 pt-10 dark:bg-dark lg:pb-20 lg:pt-[120px]">
      <div className="container mx-auto">
        <div className="flex h-40">
        <video 
                src="/videos/globe2.mp4"
                autoPlay
                loop
                playsInline
                height={170}
                className="mx-auto"
                muted />
        </div>
            
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
              
            <div className="mx-auto mb-[60px] max-w-[510px] text-center">
                
              <h2 className="text-[3.5rem] pt-4 text-center tracking-tight effect-font-hero effect-font-gradient">
                Features Section
              </h2>
              <p className="text-white/70 text-lg text-center mt-5 tracking-tight">
                text
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-8 lg:grid-cols-6 lg:grid-rows-2">
      <BentoCard
        eyebrow="Insight"
        title="Get perfect clarity"
        description="Radiant uses social engineering to build a detailed financial picture of your leads. Know their budget, compensation package, social security number, and more."
        graphic={
          // eslint-disable-next-line tailwindcss/no-contradicting-classname
          <div className="h-80 bg-[url(https://res.cloudinary.com/eldoraui/image/upload/v1734021365/profile_ldoiwc.png)] bg-[size:1000px_560px] bg-[left_-109px_top_-112px] bg-no-repeat" />
        }
        fade={["bottom"]}
        className="max-lg:rounded-t-4xl lg:rounded-tl-4xl lg:col-span-3"
      />
      <BentoCard
        eyebrow="Analysis"
        title="Undercut your competitors"
        description="With our advanced data mining, you’ll know which companies your leads are talking to and exactly how much they’re being charged."
        graphic={
          // eslint-disable-next-line tailwindcss/no-contradicting-classname
          <div className="absolute inset-0 bg-[url(https://res.cloudinary.com/eldoraui/image/upload/v1734021357/competitors_ouucah.png)] bg-[size:1100px_650px] bg-[left_-38px_top_-73px] bg-no-repeat" />
        }
        fade={["bottom"]}
        className="lg:rounded-tr-4xl lg:col-span-3"
      />
      <BentoCard
        eyebrow="Speed"
        title="Built for power users"
        description="It’s never been faster to cold email your entire contact list using our streamlined keyboard shortcuts."
        graphic={
          <div className="flex size-full pl-10 pt-10">
            <Keyboard highlighted={["LeftCommand", "C", "S"]} />
          </div>
        }
        className="lg:rounded-bl-4xl lg:col-span-2"
      />
      <BentoCard
        eyebrow="Source"
        title="Get the furthest reach"
        description="Bypass those inconvenient privacy laws to source leads from the most unexpected places."
        graphic={<LogoCluster />}
        className="lg:col-span-2"
      />
      <BentoCard
        eyebrow="Limitless"
        title="Sell globally"
        description="Radiant helps you sell in locations currently under international embargo."
        graphic={<Map />}
        className="max-lg:rounded-b-4xl lg:rounded-br-4xl lg:col-span-2"
      />
    </div>
        
      </div>
    </section>
  );
};

export default FeaturesSec;


