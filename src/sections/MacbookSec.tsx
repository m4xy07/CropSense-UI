import React from "react";

import { MacbookScrollDemo } from "@/components/Macbook";
import { LampDemo } from "@/components/ui/lamps";

const MacbookSec = () => {
  return (
    
    <section id="team" className="pb-10 mb-80 -mt-48 lg:pb-20">
      <LampDemo/> 
      <div className="container -mt-48 mx-auto">
        <MacbookScrollDemo/>
      </div>
    </section>
  );
};

export default MacbookSec;


