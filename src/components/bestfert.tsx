import Image from 'next/image';
import Button from './Button';
import Link from 'next/link';

export function MorphingDialogBasicTen() {
  // Static data
  const recommendedFertilizer = "NPK 15-15-15";

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div
      className="flex max-w-fit p-8 items-center justify-center flex-col overflow-hidden border border-zinc-950/10 equipment-card-inner dark:border-zinc-50/10"
      style={{ borderRadius: '12px' }}
    >
      <div className="flex grow flex-row items-center justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <h2 className="text-[20px] font-normal text-white">Recommended Fertilizer</h2>
            <p className="text-base text-zinc-50/70">
              Based on the crop and soil analysis, you should use
            </p>
          </div>
          
            <div className="flex flex-col items-center">
            <Image src="/NPK15.png" alt="fertilizer image" width={175} height={175} className="rounded-xl" />
            <div className="text-center text-white">
              {recommendedFertilizer}
            </div>
            </div>
            <div className='w-fit flex items-center justify-center mx-auto'>
              <Link href="https://dir.indiamart.com/impcat/npk-fertilizer/npk-ratio-15-15-15-q15410334/"><Button>Order {recommendedFertilizer}</Button></Link>
            </div>
            
        </div>
      </div>
    </div>
  );
}
