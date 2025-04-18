import { Header } from "@/sections/Header";
import Footer from "@/sections/Footer";
import { CallToAction } from "@/sections/CallToAction";
import FeaturesHeroSec from "@/sections/FeaturesHeroSec";
import FeaturesBentoSec from "@/sections/FeaturesBentoSec";

export default function FeaturesPage() {
  return (
    <>
      <Header />
      <FeaturesHeroSec />
      <FeaturesBentoSec />
      <CallToAction />
      <Footer />
    </>
  );
}
