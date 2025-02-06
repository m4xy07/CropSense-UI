import { Header } from "@/sections/Header";
import { Hero } from "@/sections/Hero";
import { LogoTicker } from "@/sections/LogoTicker";
import Footer from "@/sections/Footer";
import MacbookSec from "@/sections/MacbookSec";
import { CallToAction } from "@/sections/CallToAction";
import FeaturesSec from "@/sections/FeaturesSec";
import PricingSec from "@/sections/Pricing";

export default function Home() {
  return (
    <>
      <Header />
      <Hero/> 
      <LogoTicker />
      <MacbookSec/>
      <FeaturesSec/>
      <PricingSec/>
      <CallToAction/>
      <Footer />
    </>
  
  );
}
