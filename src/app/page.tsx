import { Header } from "@/sections/Header";
import { Hero } from "@/sections/Hero";
import { LogoTicker } from "@/sections/LogoTicker";
import Footer from "@/sections/Footer";
import MacbookSec from "@/sections/MacbookSec";
import { CallToAction } from "@/sections/CallToAction";
import FeaturesSec from "@/sections/FeaturesSec";
import PricingSec from "@/sections/Pricing";
import Example from "@/sections/HeroNew";
import { TextRevealDemo } from "@/components/TextRevealDemo";
import AnimatedTextSec from "@/sections/AnimatedTextSec";

export default function Home() {
  return (
    <>
      <Header />
      <Example/> 
      <LogoTicker />
      <TextRevealDemo/>
      <MacbookSec/>
      <FeaturesSec/>
      <AnimatedTextSec/>
      <PricingSec/>
      <CallToAction/>
      <Footer />
    </>
  
  );
}
