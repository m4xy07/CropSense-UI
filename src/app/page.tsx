import { Header } from "@/sections/Header";
import { LogoTicker } from "@/sections/LogoTicker";
import Footer from "@/sections/Footer";
import MacbookSec from "@/sections/MacbookSec";
import { CallToAction } from "@/sections/CallToAction";
import FeaturesSec from "@/sections/FeaturesSec";
import PricingSec from "@/sections/Pricing";
import HeroSec from "@/sections/HeroNew";
import { TextRevealDemo } from "@/components/TextRevealDemo";
import AnimatedTextSec from "@/sections/AnimatedTextSec";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSec />
      <LogoTicker />
      <TextRevealDemo />
      <MacbookSec />
      <FeaturesSec />
      <AnimatedTextSec />
      <PricingSec />
      <CallToAction />
      <Footer />
    </>
  );
}
