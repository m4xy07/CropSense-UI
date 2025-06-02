import { PlusIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function MorphingDialogBasicNine() {
  const [best_crop, setBestCrop] = useState<string | null>(null);

  useEffect(() => {
    const fetchBestCrop = async () => {
      try {
        const response = await fetch("https://data.cropsense.tech");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          const latestBestCrop = data[data.length - 1]?.best_crop;
          setBestCrop(latestBestCrop);
        } else {
          console.warn("API returned an empty or invalid response.");
        }
      } catch (error) {
        console.error("Error fetching best crop status:", error);
      }
    };

    fetchBestCrop();
  }, []);

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
              src="/Tomato.jpg"
              alt="crop image"
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
              />
            </div>
            </div>
            <div className="text-center text-[22px] mt-2 text-white">
            <a
              href="https://www.bighaat.com/products/ns-5002-1068-tomato-seeds?variant=40614523174935"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-400 transition-colors"
            >
              Tomato Namdhari 1068
            </a>
            </div>
        </div>
      </div>
    </div>
  );
}
