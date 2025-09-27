import { RiArrowDownLine } from "@remixicon/react";

export default function NPKTableComponent() {
  // Static NPK data based on provided values
  const current = {
    nitrogen: 10.9,
    phosphorus: 5.2,
    potassium: 8.6,
  };

  // Hardcoded ideal values
  const ideal = {
    nitrogen: 15,
    phosphorus: 15,
    potassium: 15,
  };

const getStatus = (currentVal: number, idealVal: number) => {
  const difference = Math.abs(currentVal - idealVal).toFixed(1);

  if (currentVal > idealVal) {
    return (
      <span className="inline-flex items-center gap-x-1 ml-1 text-[11px] font-normal text-red-500 bg-[#d104121f]">
        <RiArrowDownLine className="size-3 -mr-1 rotate-180" aria-hidden={true} />
        {difference}
      </span>
    );
  }

  if (currentVal < idealVal) {
    return (
      <span className="inline-flex items-center gap-x-1 ml-1 text-[11px] font-normal text-red-500 bg-[#d104121f] rounded-[4px] px-1 py-0.5">
        {difference}
        <svg width="9" height="8" viewBox="0 0 9 8" fill="none" className="size-2" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M0.933058 0.683058C1.17714 0.438981 1.57286 0.438981 1.81694 0.683058L7 5.86612V2.375C7 2.02982 7.27982 1.75 7.625 1.75C7.97018 1.75 8.25 2.02982 8.25 2.375V7.375C8.25 7.72018 7.97018 8 7.625 8H2.625C2.27982 8 2 7.72018 2 7.375C2 7.02982 2.27982 6.75 2.625 6.75H6.11612L0.933058 1.56694C0.688981 1.32286 0.688981 0.927136 0.933058 0.683058Z" fill="#D10412"></path></svg>
      </span>
    );
  }

  return null;
};

  return (
    <div className="rounded-md border border-zinc-50/10 overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-4 bg-transparent text-[#e4e4e4] border-b border-zinc-50/10">
        <div className="py-2 px-4 text-center font-medium border-r border-zinc-50/10 text-[14px] bg-[#ffffff0a]">Values</div>
        <div className="py-2 px-4 text-center font-medium border-r border-zinc-50/10 text-[14px] bg-[#ffffff0a]">Nitrogen</div>
        <div className="py-2 px-4 text-center font-medium border-r border-zinc-50/10 text-[14px] bg-[#ffffff0a]">Phosphorus</div>
        <div className="py-2 px-4 text-center font-medium text-[14px] bg-[#ffffff0a]">Potassium</div>
      </div>

      {/* Current Row */}
      <div className="grid grid-cols-4 border-b border-zinc-50/10">
        <div className="py-2 px-2 text-center font-medium text-[#e4e4e4] text-[14px] border-r bg-[#ffffff0a] border-zinc-50/10">
          Current
        </div>
        <div className="py-2 px-2 text-center border-r border-zinc-50/10 text-[14px] flex flex-row items-center justify-center">
          {current.nitrogen.toFixed(1)}
          <div className="text-xs text-gray-400 flex flex-col justify-center">{getStatus(current.nitrogen, ideal.nitrogen)}</div>
        </div>
        <div className="py-2 px-2 text-center border-r border-zinc-50/10 text-[14px] flex flex-row items-center justify-center">
          {current.phosphorus.toFixed(1)}
          <div className="text-xs text-gray-400 flex flex-col justify-center">{getStatus(current.phosphorus, ideal.phosphorus)}</div>
        </div>
        <div className="py-2 px-2 text-center text-[14px] flex flex-row items-center justify-center">
          {current.potassium.toFixed(1)}
          <div className="text-xs text-gray-400 flex flex-col justify-center">{getStatus(current.potassium, ideal.potassium)}</div>
        </div>
      </div>

      {/* Ideal Row */}
      <div className="grid grid-cols-4 border-b last:border-none border-zinc-50/10">
        <div className="py-2 px-2 text-center font-medium text-[#e4e4e4] text-[14px] border-r bg-[#ffffff0a] border-zinc-50/10">
          Ideal
        </div>
        <div className="py-2 px-2 text-center border-r border-zinc-50/10 text-[14px] flex flex-row items-center justify-center">{ideal.nitrogen}</div>
        <div className="py-2 px-2 text-center border-r border-zinc-50/10 text-[14px] flex flex-row items-center justify-center">{ideal.phosphorus}</div>
        <div className="py-2 px-2 text-center text-[14px] flex flex-row items-center justify-center">{ideal.potassium}</div>
      </div>
    </div>
  );
}
