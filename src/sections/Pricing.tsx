import { BentoCard } from "@/components/bentogrid";
import { Keyboard } from "@/components/keyboard";
import { LogoCluster } from "@/components/logocluster";
import { Map } from "@/components/map";
import ManyOffersVariant1, { SelectOfferTab } from "@/components/pricingcomp";
import React from "react";

const PricingSec = () => {
  return (
    <section id="team" className="pb-10 mb-40 pt-10 lg:pt-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-2 max-w-[510px] text-center">
              <h2 className="text-[3.5rem] pt-4 text-center tracking-tight effect-font-hero effect-font-gradient">
                Pricing
              </h2>
              <p className="text-white/70 text-lg text-center mt-4 tracking-tight">
                text
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10">
      <ManyOffersVariant1 />
    </div>
        
      </div>
    </section>
  );
};

export default PricingSec;


