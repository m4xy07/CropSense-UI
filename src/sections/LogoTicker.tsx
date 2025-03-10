'use client';
import PixelCard from '@/components/PixelCard/PixelCard';
import Image from 'next/image';


export const LogoTicker = () => {
  return (
     <section
      id="clients"
      className="mx-auto max-w-7xl h-[35rem] px-6 bg-black z-[60] overflow-hidden text-center md:px-8"
    >
      <div className="pt-14">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <h2 className="text-center text-lg font-inter font-medium text-white/70">
            Saving farms, one crop at a time using
          </h2>
          <div className="mt-12 flex flex-col items-center justify-center">
            <div className='flex flex-row items-center justify-center mx-auto'>
          <PixelCard variant="default">
            <Image src={"/assets/trademark/NextJSLogo.png"} width={65} height={100} alt="NextJS Logo"/>
          </PixelCard>
          <PixelCard variant="yellow">
            <Image src={"/assets/trademark/GoogleCollab.png"} width={60} height={100} alt="NextJS Logo"/>
          </PixelCard>
          <PixelCard variant="blue">
            <Image src={"/assets/trademark/ReactLogo.png"} width={40} height={100} alt="NextJS Logo"/>
          </PixelCard>
          <PixelCard variant="pink">
            <Image src={"/assets/trademark/TwilioLogo.png"} width={60} height={100} alt="NextJS Logo"/>
          </PixelCard>
          <PixelCard variant="default">
            <Image src={"/assets/trademark/ExpressLogo.png"} width={35} height={100} alt="NextJS Logo"/>
          </PixelCard>
          <PixelCard variant="pink">
            <Image src={"/assets/trademark/raspberryLogo.png"} width={35} height={100} alt="NextJS Logo"/>
          </PixelCard>
          </div>

          <div className='flex flex-row items-center justify-center mx-auto'>
          <PixelCard variant="default">
            <Image src={"/assets/trademark/ollamaLogo.png"} width={45} height={100} alt="NextJS Logo"/>
          </PixelCard>
          <PixelCard variant="blue">
            <Image src={"/assets/trademark/kaggleLogo.png"} width={60} height={100} alt="NextJS Logo"/>
          </PixelCard>
          <PixelCard variant="default">
            <Image src={"/assets/trademark/nodeJSLogo.png"} width={70} height={100} alt="NextJS Logo"/>
          </PixelCard>
          <PixelCard variant="blue">
            <Image src={"/assets/trademark/PythonLogo.png"} width={40} height={100} alt="NextJS Logo"/>
          </PixelCard>
          <PixelCard variant="yellow">
            <Image src={"/assets/trademark/huggingfaceLogo.png"} width={55} height={100} alt="NextJS Logo"/>
          </PixelCard>
          <PixelCard variant="default">
            <Image src={"/assets/trademark/MongoDBLogo.png"} width={20} height={100} alt="NextJS Logo"/>
          </PixelCard>
          </div>

          

          </div>
        </div>
      </div>
    </section>

  );
};
