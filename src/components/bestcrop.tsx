import { PlusIcon } from 'lucide-react';
import Image from 'next/image';

export function MorphingDialogBasicNine() {
  // Static data
  const best_crop = "soybean";

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div
      className="flex max-w-max p-8 items-center justify-center flex-col overflow-hidden border border-zinc-950/10 equipment-card-inner dark:border-zinc-50/10"
      style={{ borderRadius: '12px' }}
    >
      <div className="flex grow flex-row items-center justify-between">
        <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-4">
            <h2 className="text-[20px] font-normal text-white">Best Crop to Grow</h2>
            <p className="text-base text-zinc-50/70">
              Given the foreseeable soil and weather conditions, you should grow 
            </p>
            <div className="w-full h-[200px] relative">
              <Image
              src="/Soybean.jpg"
              alt="crop image"
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
              />
            </div>
            </div>
            <div className="text-center text-[22px] mt-2 text-white">
            <a
              href="https://www.bighaat.com/products/soybean-seeds"
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:text-blue-400 transition-colors ease-in-out duration-200"
            >
              {best_crop ? capitalize(best_crop) : "Soybean"}
            </a>
            </div>
        </div>
      </div>
    </div>
  );
}
