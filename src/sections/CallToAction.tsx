'use client';
import Button from "@/components/Button";
import starsBg from "@/assets/stars.png";
import gridlines from "@/assets/grid-lines.png";
import {motion, useMotionTemplate, useMotionValue, useScroll, useTransform} from "framer-motion";
import { RefObject, useEffect, useRef } from "react";


const useRelativeMousePosition = (to: RefObject<HTMLElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const updateMousePosition = (event: MouseEvent) => {
    if(!to.current) return;
    const {top, left} = to.current.getBoundingClientRect();
    mouseX.set(event.x - left);
    mouseY.set(event.y - top);
  };

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    }
  }, []); 

  return [mouseX, mouseY];
}


export const CallToAction = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const borderedDivRef = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundPositionY = useTransform(scrollYProgress, [0,1], [-300, 300]);

  const [mouseX, mouseY] = useRelativeMousePosition(borderedDivRef);

  const maskImage = useMotionTemplate`radial-gradient(50% 50% at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <section className="py-20" ref={sectionRef}>
      <div className="container">
        <motion.div ref={borderedDivRef} className="border border-white/15 py-24 rounded-xl overflow-hidden relative group" 
        animate={{
          backgroundPositionX: starsBg.width,
        }}
        transition={{
          repeat: Infinity,
          duration: 60,
          ease: "linear",
        }}
        style={{
          backgroundPositionY,
          backgroundImage: `url(${starsBg.src})`,
        }}>
        <div className="absolute inset-0 bg-[rgba(0,40,198,.5)] bg-blend-overlay [mask-image:radial-gradient(50%_50%_at_50%_35%,black,transparent)] group-hover:opacity-0 transition duration-700" style={{
          backgroundImage: `url(${gridlines.src})`,
        }}>
        </div>
        <motion.div className="absolute inset-0 bg-[rgba(0,40,198,.5)] bg-blend-overlay opacity-0 group-hover:opacity-100 transition duration-700" 
        style={{
          maskImage,
          backgroundImage: `url(${gridlines.src})`,
        }}>
        </motion.div>
        <div className="relative">
        <h2 className="text-[3.5rem] pt-4 text-center tracking-tight effect-font-hero effect-font-gradient">
          Make the Earth Greener 
        </h2>
        <p className="text-center text-lg md:text-xl max-w-sm mx-auto text-white/70 px-4 mt-5 tracking-tight">
          Increase your revenue and make informed decisions with our powerful analytics tools!
        </p>
        <div className="flex justify-center mt-8">
        <Button>Start Today!</Button>
        </div>
        </div>  
        </motion.div>
      </div>
    </section>
  );
};
