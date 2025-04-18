'use client';

//To get started, run "npm i cobe"
import { useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import starsBg from "@/assets/stars.png";
import Button from '@/components/Button';
import Link from 'next/link';
import Image from 'next/image';



  

export default function FeaturesHeroSec() {

  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const isInView = useInView(canvasRef, { margin: "-50% 0px -50% 0px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });
  
  const backgroundPositionY = useTransform(scrollYProgress, [0, 1], [-300, 300]);
  
  

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
          <div className="absolute top-[17rem] size-[100rem] rounded-full background-backdrop blur-xl md:top-[-250px]" />
          <div className='relative w-full h-[500px] -mt-12 -mb-36'>
            <Image
                src="/hero-graph.svg"
                alt="hero-graph"
                width={500}
                height={500}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 hero-graph"
            />
          </div>
                
          <h2
            id="global-database-title"
            className="z-40 mt-6 pb-6 inline-block bg-gradient-to-b from-white to-blue-100 bg-clip-text px-2 text-center text-5xl effect-font-gradient font-bold tracking-normal text-transparent md:text-7xl"
          >
            Supercharge Your Yields
          </h2>
          <p className="text-lg z-40 md:text-xl text-white/70 font-inter -mt-1 text-center max-w-xl mx-auto">
            texts
        </p>
        {/* <div className="flex z-40 justify-center mt-5">
          <Link href={'/dashboard'}>
            <Button>Get Started</Button>
            </Link>
        </div> */}
        <div className="z-20 -mt-32 h-[36rem] w-full overflow-hidden md:-mt-36">
            <div className="absolute bottom-0 h-3/5 w-full bg-gradient-to-b from-transparent via-gray-950/75 to-black" />
            <div className="absolute inset-x-6 bottom-12 m-auto max-w-4xl md:top-2/3">
              
            </div>
          </div>
          
        </div>
       
    </>
  );
}
