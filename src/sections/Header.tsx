"use client";
import LogoIcon from "../assets/Logo_Rev_1_Transparent.png";
import MenuIcon from "@/assets/icon-menu.svg";
import Button from "@/components/Button";
import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ShimmerButton } from "@/components/magicui/shimmer-button";


export const Header = () => {
  
  

  return (<header className="py-4 border-b border-white/15 md:border-none sticky font-inter top-0 z-[2000]">
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
    
          <Link href="/features" className="text-white/70 hover:text-white transition" style={{cursor:'pointer'}}>Features</Link>
            {/* <ScrollLink to="features" spy={true} smooth={true} offset={50} duration={200} className="text-white/70 hover:text-white transition" style={{cursor:'pointer'}}>Features</ScrollLink> */}
            {/* <ScrollLink to="team" spy={true} smooth={true} offset={50} duration={200} className="text-white/70 hover:text-white transition" style={{cursor:'pointer'}}>Team</ScrollLink> */}
            <ScrollLink to="pricing" spy={true} smooth={true} offset={50} duration={200} className="text-white/70 hover:text-white transition" style={{cursor:'pointer'}}>Pricing</ScrollLink>
            <ScrollLink to="#" spy={true} smooth={true} offset={50} duration={200} className="text-white/70 hover:text-white transition" style={{cursor:'pointer'}}>About</ScrollLink>
            

          </nav>
          
        </div>
        <div className="flex gap-4 items-center">
          
          <SignedIn>
            
            <div>
              
           
              

              <Link href="/dashboard">
                <ShimmerButton className="shadow-2xl">
                <span className="whitespace-pre-wrap text-center text-sm font-normal leading-none tracking-tight text-white from-white to-[#0a0118]">
                  Dashboard
                </span>
              </ShimmerButton>
              </Link>
            </div>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Link href="/sign-in">
            <Button>Sign In</Button>
            </Link>
            </SignInButton>
          </SignedOut>

          {/* <MenuIcon className="md:hidden" /> */}
        </div>
      </div>
    </div>
  </header>
  );
};
