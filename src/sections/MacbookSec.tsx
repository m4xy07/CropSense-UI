import React from "react";

import { MacbookScrollDemo } from "@/components/Macbook";
import { LampDemo } from "@/components/ui/lamps";
import Page from "@/app/dashboard/page";

const MacbookSec = () => {
  return (
    
    <section id="team" className="pb-10 mb-40 pt-10 lg:pb-20">
      <LampDemo/>
      <div className="container -mt-48 mx-auto">
        <MacbookScrollDemo/>
        <Page />
      </div>
    </section>
  );
};

export default MacbookSec;


