import React from "react";

import { MacbookScrollDemo } from "@/components/Macbook";

const MacbookSec = () => {
  return (
    <section id="team" className="pb-10 mb-40 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[510px] text-center">
              <h2 className="text-5xl text-center tracking-tighter font-medium">
                Macbook Section
              </h2>
              <p className="text-white/70 text-lg text-center mt-5 tracking-tight">
                text
              </p>
            </div>
          </div>
        </div>

        <MacbookScrollDemo/>
      </div>
    </section>
  );
};

export default MacbookSec;


