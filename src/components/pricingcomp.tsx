"use client";
import { motion } from "motion/react";
import { CheckIcon, DollarSignIcon, EuroIcon } from "lucide-react";
import { RiCheckboxCircleFill } from '@remixicon/react';
import { useState } from "react";
import { cn } from "@/lib/utils";
type BilledType = "monthly" | "annually" | "lifetime";

const pricingData: OfferCardProps[] = [
  {
    title: "Starter",
    description: "For small teams",
    price: {
      monthly: 199,
      annually: 149,
      lifetime: 7999,
    },
    features: ["10 users included", "2 GB of storage", "Email support"],
    infos: ["30 users included", "15 GB of storage", "Phone and email support"],
  },
  {
    title: "Pro",
    description: "For medium-sized businesses",
    price: {
      monthly: 499,
      annually: 449,
      lifetime: 19999,
    },
    features: [
      "20 users included",
      "10 GB of storage",
      "Priority email support",
    ],
    infos: ["30 users included", "15 GB of storage", "Phone and email support"],
    isBestValue: true,
  },
  {
    title: "Enterprise",
    description: "For large businesses",
    price: {
      monthly: 999,
      annually: 899,
      lifetime: 44999,
    },
    features: [
      "30 users included",
      "15 GB of storage",
      "Phone and email support",
    ],
    infos: ["30 users included", "15 GB of storage", "Phone and email support"],
  },
  
];

export default function ManyOffersVariant1() {
  const [selectedBilledType, setSelectedBilledType] =
    useState<BilledType>("monthly");
  function handleSwitchTab(tab: BilledType) {
    setSelectedBilledType(tab);
  }
  return (
    <div className="flex flex-col items-center gap-12">
      <SelectOfferTab
        handleSwitchTab={handleSwitchTab}
        selectedBilledType={selectedBilledType}
      />
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {pricingData.map((offer) => (
          <OfferCard
            key={offer.title}
            {...offer}
            selectedBilledType={selectedBilledType}
          />
        ))}
      </div>
    </div>
  );
}

type OfferCardProps = {
  title: string;
  description: string;
  price: {
    monthly: number;
    annually: number;
    lifetime: number;
  };
  features: string[];
  infos?: string[];
  isBestValue?: boolean;
};

const OfferCard = ({
  title,
  description,
  price,
  features,
  infos,
  isBestValue,
  selectedBilledType,
}: OfferCardProps & {
  selectedBilledType: BilledType;
}) => {
  function getAnnualPrice() {
    return price.annually * 12;
  }
  return (
    <div
  style={{
    borderTop: "ridge 1px rgb(0 237 255 / 0.27)",
  }}
  className={cn(
    "relative group hover:-translate-y-1 h-full transform-gpu overflow-hidden rounded-2xl transition-all duration-500 ease-in-out",
    "bg-neutral-800/50 text-neutral-400",
    isBestValue ? "border border-[rgba(0,237,255,.27)]" : "border-neutral-500/50"
  )}
>
      <div
  className="absolute inset-0 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
  style={{
    backgroundImage: "radial-gradient(circle at top right, rgba(115, 115, 115, 0.2) 0%, rgba(115, 115, 115, 0.1) 15%, transparent 30%)"
  }}
>
</div>

  


      <div
        className={cn("p-6")}
        style={
          isBestValue 
            ? {
                background:
                  "radial-gradient(58.99% 10.42% at 50% 100.46%, rgba(0,237,255,.1) 0, transparent 100%), radial-gradient(135.76% 66.69% at 92.19% -3.15%, rgba(0,40,198,.15) 0, transparent 100%), radial-gradient(127.39% 38.15% at 22.81% -2.29%, rgba(0,237,255,.27) 0, transparent 100%)",
              }
            : {}
        }
      >
        <div className="font-bold text-[20px] text-white">{title}</div>
<div className="mt-0 text-neutral-400 text-[16px]">{description}</div>
<div className="mt-4 flex flex-row gap-2">
  <div className="font-semibold text-6xl text-white pb-2">
    ₹{price[selectedBilledType]}
  </div>
  {selectedBilledType !== "lifetime" && (
    <div className="text-neutral-400 text-sm flex items-center">
      / month
    </div>
  )}
</div>
{selectedBilledType === "annually" && (
  <div className="text-neutral-400 text-sm mt-1">
    ₹{getAnnualPrice()} billed annually
  </div>
)}


        <button
          className={cn(
            "my-12 inline-flex w-full transform-gpu items-center justify-center rounded-lg border border-neutral-400/20 px-12 py-2.5 font-medium text-neutral-50 tracking-tight transition-all",
            isBestValue
              ? " bg-[#00edff] text-black"
              : "bg-neutral-700 ",
          )}
          type="button"
        >
          Get Started
        </button>

        <ul className="space-y-2">
          {features.map((feature) => (
            <li className="flex items-center gap-2" key={feature}>
              <RiCheckboxCircleFill className="size-4 rounded-full  fill-[#2DAA6E]" />
              <div className="text-white text-sm">{feature}</div>
            </li>
          ))}
        </ul>
        {infos && (
          <>
            <div className="my-6 h-px bg-neutral-600" />
            <ul className="space-y-2">
              {infos.map((feature) => (
                <li className="flex items-center gap-2" key={feature}>
                  <div className="size-1.5 rounded-full bg-neutral-500" />
                  <div className=" text-sm">{feature}</div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export function SelectOfferTab({
  handleSwitchTab,
  selectedBilledType,
}: Readonly<{
  handleSwitchTab: (tab: BilledType) => void;
  selectedBilledType: BilledType;
}>) {
  const OfferList = ["monthly", "annually", "lifetime"] as const;
  return (
    <nav
  className="flex flex-col sm:flex-row px-2 py-2 rounded-full shadow-[inset_0_1px_0_0_hsla(0,0%,100%,.1)]"
  style={{
    background: 'linear-gradient(137deg, #111214 4.87%, #0c0d0f 75.88%)',
    borderTop: '1px solid hsla(0, 0%, 100%, .06)',
    borderRight: '1px solid hsla(0, 0%, 100%, .06)',
    borderLeft: '1px solid hsla(0, 0%, 100%, .06)',
  }}
>

      {OfferList.map((button, _index) => (
        <button
          className={cn(
            " relative inline-flex w-fit transform-gpu whitespace-nowrap px-6 py-2.5 font-normal text-base capitalize tracking-tight transition-colors",
            selectedBilledType === button
              ? "text-neutral-700 dark:text-neutral-50"
              : "text-neutral-800 hover:text-neutral-600 dark:text-neutral-300 dark:hover:text-neutral-300 ",
          )}
          key={button}
          onClick={() => handleSwitchTab(button)}
          type="button"
        >
          {button}
          {selectedBilledType === button && (
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className="-z-10 absolute top-0 right-0 bottom-0 left-0 border-t border-neutral-500/50 rounded-full bg-neutral-200 dark:bg-neutral-800 "
              exit={{ opacity: 0, scale: 0.9 }}
              initial={{ opacity: 0, scale: 0.95 }}
              layout={true}
              layoutId="pricing-focused-element"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className=" size-full rounded-full" />
            </motion.div>
          )}
        </button>
      ))}
    </nav>
  );
}
