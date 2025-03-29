"use client";
import { HeroHighlight } from "./herohighlight";
import { AuroraText } from "./AnimatedGradientText";

export function HeroHighlightDemo() {
  return (
    <HeroHighlight>
       <h1 className="text-4xl font-bold tracking-normal items-center text-center leading-normal mx-auto md:text-5xl lg:text-5xl">
       In a world of generic forecasts,<br/> CropSense brings you the truth — <br/> <AuroraText>real-time</AuroraText>, <AuroraText>on-farm</AuroraText> data, <br/>where it matters most.
    </h1>
    </HeroHighlight>
  );
}
