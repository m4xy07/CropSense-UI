"use client";
import LogoIcon from "../assets/Logo_Rev_1_Transparent.png";
import MenuIcon from "@/assets/icon-menu.svg";
import Button from "@/components/Button";
import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";


export const Header = () => {
  
  

  return (<header className="py-4 border-b border-white/15 md:border-none sticky top-0 z-[2000]">
    <div className="absolute inset-0 backdrop-blur -z-10 md:hidden"></div>
    <div className="container">
      <div className="flex justify-between items-center md:border border-white/15 md:p-2.5 rounded-xl max-w-4xl mx-auto relative">
      <div className="absolute inset-0 backdrop-blur -z-10 hidden md:block"></div>
        <div>
          <div className=" h-[3rem] w-full inline-flex justify-center items-center ">
          <img src={LogoIcon.src} className="h-full w-full" />
          </div>
        </div>
        <div className="hidden md:block">

        <nav className="flex gap-8 text-sm">
    
            <ScrollLink to="team" spy={true} smooth={true} offset={50} duration={200} className="text-white/70 hover:text-white transition" style={{cursor:'pointer'}}>Features</ScrollLink>
            <ScrollLink to="team" spy={true} smooth={true} offset={50} duration={200} className="text-white/70 hover:text-white transition" style={{cursor:'pointer'}}>Team</ScrollLink>
            <ScrollLink to="team" spy={true} smooth={true} offset={50} duration={200} className="text-white/70 hover:text-white transition" style={{cursor:'pointer'}}>About</ScrollLink>
            <ScrollLink to="team" spy={true} smooth={true} offset={50} duration={200} className="text-white/70 hover:text-white transition" style={{cursor:'pointer'}}>Pricing</ScrollLink>

          </nav>
          
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/admindashboard">
          <Button>Sign In</Button>
          </Link>
          <MenuIcon className="md:hidden" />
        </div>
      </div>
    </div>
  </header>
  );
};
