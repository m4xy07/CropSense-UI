import { PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function MorphingDialogBasicFifteen() {
  const [harvestableMonths, setHarvestableMonths] = useState<any[]>([]);

  useEffect(() => {
    const fetchBestCrop = async () => {
      try {
        const response = await fetch("https://data.cropsense.tech");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          const latestHarvestableMonths = data[data.length - 1]?.harvestable_months;
          setHarvestableMonths(latestHarvestableMonths);
        } else {
          console.warn("API returned an empty or invalid response.");
        }
      } catch (error) {
        console.error("Error fetching best crop status:", error);
      }
    };

    fetchBestCrop();
  }, []);

  return (
    <div
      style={{
        borderRadius: '12px',
      }}
      className='flex max-w-[270px] md:w-[200px] md:h-[180px] items-center justify-center flex-col overflow-hidden border border-zinc-950/10 bg-black dark:border-zinc-50/10 dark:bg-zinc-900'
    >
      <div className='flex grow flex-row items-center justify-between px-3 py-2'>
        <div>
          <div className='text-zinc-950 text-center dark:text-white'>
            {harvestableMonths.length > 1 ? harvestableMonths[1].month : "Loading..."}
          </div>

          <div className='text-zinc-950 pt-2 text-center dark:text-zinc-50/70 text-[14px]'>
            Wholesaler Price
          </div>
          <div className='text-zinc-700 text-center dark:text-zinc-200'>
            ₹ {harvestableMonths.length > 1
              ? parseFloat(harvestableMonths[1].wholesale_price).toFixed(2)
              : "Loading..."}
          </div>

          <div className='text-zinc-950 pt-2 text-center dark:text-zinc-50/70 text-[14px]'>
            Retail Price
          </div>
          <div className='text-zinc-700 text-center dark:text-zinc-200'>
            ₹ {harvestableMonths.length > 1
              ? parseFloat(harvestableMonths[1].retail_price).toFixed(2)
              : "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
}
