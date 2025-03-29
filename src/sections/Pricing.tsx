import ManyOffersVariant1, { SelectOfferTab } from "@/components/pricingcomp";
import React from "react";

const PricingSec = () => {
  return (
    <section id="team" className="pb-12 mb-20 pt-12">
      <div className="container mx-auto">
      <div className="flex h-40">
        <video 
                src="/videos/3d-smtp.mp4"
                autoPlay
                loop
                playsInline
                height={170}
                className="mx-auto"
                muted />
        </div>
        <div className="-mx-4 flex flex-wrap">
        
          <div className="w-full px-4">
            <div className="mx-auto mb-2 max-w-[510px] text-center">
              <h2 className="text-[3.5rem] pt-4 text-center font-bold tracking-normal effect-font-gradient">
                Pay as you grow
              </h2>
              <p className="text-white/70 text-xl font-inter text-center mt-4 tracking-tight">
              Flexible pricing that scales with you.
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


