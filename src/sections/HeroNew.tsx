'use client';

//To get started, run "npm i cobe"
import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import starsBg from "@/assets/stars.png";
import Button from '@/components/Button';
import Link from 'next/link';
import { ShimmerButton } from '@/components/magicui/shimmer-button';
import { ShimmerButton2 } from '@/components/magicui/shimmer2';



  

export default function HeroSec() {

  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const isInView = useInView(canvasRef, { margin: "-10% 0px -10% 0px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });
  
  const backgroundPositionY = useTransform(scrollYProgress, [0, 1], [-300, 300]);
  
  useEffect(() => {
    if (!canvasRef.current || !isInView) return;
    
    let phi = 4.7;
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 1200 * 2,
      height: 1200 * 2,
      phi: 0,
      theta: -0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 25000,
      mapBrightness: 13,
      mapBaseBrightness: 0.05,
      baseColor: [0.3, 0.3, 0.3],
      glowColor: [0.15, 0.15, 0.15],
      markerColor: [100, 100, 100],
      markers: [],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.0005;
      },
    });
    
    return () => globe.destroy();
  }, [isInView]);


  return (

    
    <>
    <motion.section
    id="Hero"
    ref={sectionRef}
    animate={{
      backgroundPositionX: starsBg.width,
    }}
    transition={{
      repeat: Infinity,
      ease: "linear",
      duration: 120,
    }}
    className="h-[492px] md:h-[800px] flex items-center overflow-hidden relative [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]" 
    style={{
      backgroundImage: `url(${starsBg.src})`,
      backgroundPositionY,  
    }}
    ></motion.section>
    <div className="absolute overflow-hidden inset-0 bg-[radial-gradient(circle_at_center,rgb(14,0,36,.5)_15%,rgb(14,0,36,.5)_30%,transparent)]" />
        <div className="absolute inset-0 mx-auto flex w-full flex-col items-center justify-center overflow-hidden bg-transparent pt-24">
          <div className="absolute top-[17rem] size-[40rem] rounded-full bg-blue-800 main-hero-blue-orb blur-3xl md:top-[29rem]" />

          <h2
            id="global-database-title"
            className="z-40 mt-6 inline-block bg-gradient-to-b from-white to-blue-100 bg-clip-text px-2 text-center text-5xl effect-font-gradient font-bold tracking-normal text-transparent md:text-8xl"
          >
            CropSense
          </h2>
          <p className="text-lg z-40 md:text-xl text-white/70 font-inter mt-5 text-center max-w-xl mx-auto">
            An initiative towards a greener tomorrow.
        </p>
        <div className="flex z-40 justify-center mt-5">
        <Link href="/dashboard">
                <ShimmerButton2 className="shadow-2xl">
                <span className="whitespace-pre-wrap font-inter text-center text-[15px] font-normal leading-none tracking-tight text-white from-white to-[#0a0118]">
                  Get Started
                </span>
              </ShimmerButton2>
              </Link>
        </div>
          <canvas
            className="absolute top-[10rem] main-hero-blue-orb z-20 aspect-square size-full max-w-fit sm:top-[7.1rem] md:top-[24rem]"
            ref={canvasRef}
            style={{ width: 1200, height: 1200 }}
          />
          <div className="z-20 -mt-32 h-[36rem] w-full overflow-hidden md:-mt-36">
            <div className="absolute bottom-0 h-3/5 w-full bg-gradient-to-b from-transparent via-gray-950/75 to-black" />
            <div className="absolute inset-x-6 bottom-12 m-auto max-w-4xl md:top-2/3">
              
            </div>
          </div>
          
        </div>
        
    </>
  );
}
