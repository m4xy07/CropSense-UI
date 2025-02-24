'use client';
import { LogoCloud } from '@/components/LogoCloud';


export const LogoTicker = () => {
  return (
     <section
      id="clients"
      className="mx-auto max-w-7xl h-[35rem] px-6 bg-black z-[60] overflow-hidden text-center md:px-8"
    >
      <div className="pt-14">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <h2 className="text-center text-lg  font-medium text-white/70">
            Built on
          </h2>
          <div className="mt-12">
            
          <LogoCloud
  limit={6}
  logos={[
    {
      href: "https://enroll.dopler.app",
      icon: false,
      size: "xs",
      wordmarkSrc: "/assets/trademark/NextJSLogo.png",
    },
    {
      href: "https://dopler.app",
      icon: false,
      size: "xs",
      wordmarkSrc: "/assets/trademark/GoogleCollab.png",
    },
    {
      href: "https://club.dopler.io",
      icon: false,
      size: "xs",
      wordmarkSrc: "/assets/trademark/ReactLogo.png",
    },
    {
      href: "https://magic-portfolio.com",
      icon: false,
      size: "xs",
      wordmarkSrc: "/assets/trademark/TwilioLogo.png",
    },
    {
      href: "https://enroll.dopler.app",
      icon: false,
      size: "xs",
      wordmarkSrc: "/assets/trademark/ExpressLogo.png",
    },
    {
      href: "https://dopler.app",
      icon: false,
      size: "xs",
      wordmarkSrc: "/assets/trademark/ollamaLogo.png",
    },
    {
      href: "https://enroll.dopler.app",
      icon: false,
      size: "xs",
      wordmarkSrc: "/assets/trademark/kaggleLogo.png",
    },
    {
      href: "https://dopler.app",
      icon: false,
      size: "xs",
      wordmarkSrc: "/assets/trademark/nodeJSLogo.png",
    },
    {
      href: "https://enroll.dopler.app",
      icon: false,
      size: "xs",
      wordmarkSrc: "/assets/trademark/PythonLogo.png",
    },
    {
      href: "https://dopler.app",
      icon: false,
      size: "xs",
      wordmarkSrc: "/assets/trademark/huggingfaceLogo.png",
    },
    {
      href: "https://club.dopler.io",
      icon: false,
      size: "xs",
      wordmarkSrc: "/assets/trademark/MongoDBLogo.png",
    },
    {
      href: "https://magic-portfolio.com",
      icon: false,
      size: "xs",
      wordmarkSrc: "/assets/trademark/raspberryLogo.png",
    },

  ]}
  columns={3} 
  mobileColumns={1} // Stack on mobile
/>

          </div>
        </div>
      </div>
    </section>

  );
};
