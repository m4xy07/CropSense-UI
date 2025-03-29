"use client";
import { motion } from "motion/react";
import { RiCheckboxCircleFill, RiCloseCircleFill } from "@remixicon/react";
import CheckIcon from "@/assets/check.svg";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

type BilledType = "monthly" | "annually" | "lifetime";

const pricingData: OfferCardProps[] = [
  {
    title: "Starter",
    description: "For small teams.",
    price: {
      monthly: 199,
      annually: 149,
      lifetime: 7999,
    },
    features: [
      "Best Crop Suggestions",
      "Crop Analysis",
      "1 Month Real Time Data",
      "Upto 1 Acre of Land Coverage",
    ],
  },
  {
    title: "Pro",
    description: "For medium-sized businesses.",
    price: {
      monthly: 499,
      annually: 449,
      lifetime: 19999,
    },
    features: [
      "Best Crop Suggestions",
      "Crop Analysis",
      "6 Months Real Time Data",
      "Upto 5 Acres of Land Coverage",
      "Detailed Soil Analysis",
      "Community Driven",
      "Market Price Prediction",
      "Disease Detection",
    ],
    isBestValue: true,
  },
  {
    title: "Enterprise",
    description: "For large businesses.",
    price: {
      monthly: 999,
      annually: 899,
      lifetime: 44999,
    },
    features: [
      "Everything In The Pro Plan",
      "Unlimited Real Time data access",
      "Up To 50 Acres of Land Coverage",
      "Automated Farm Management System",
      "Custom Analytics & Reports",
      "24/7 Premium Support",
    ],
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

  <div
          className="best-value-wrapper absolute inset-0 -z-10 rounded-2xl"
          style={{
            border: "1px solid rgba(0, 237, 255, 0.27)",
            margin: "-1px",
          }}
        />




  return (
    <div className="relative">
      <div className="gradient-border-div"></div> 
      {isBestValue && (
        <div className="best-value-wrapper absolute inset-0 -z-10 rounded-2xl" style={{
          border: "1px solid rgba(0, 237, 255, 0.27)",
          margin: "-1px",
        }}>
          <div className="absolute -top-4 left-0 right-0 pricing-card-popular-tag  text-white text-center py-2 font-bold z-20 rounded-t-lg">
            <span className="pricing-card-popular-tag-text">
            Best Value
            </span>
          </div>
        </div>
      )}
      
      <div
        // style={{
        //   borderTop: "ridge 1px rgb(0 237 255 / 0.27)",
        //   borderRight: "ridge 1px rgb(0 237 255 / 0.1)",
        //   borderLeft: "ridge 1px rgb(0 237 255 / 0.1)",
        // }}
        className={cn(
          "group h-full transform-gpu overflow-hidden rounded-2xl transition-all duration-500 ease-in-out",
          "bg-[#030816] text-neutral-400",
          isBestValue
            ? "border border-[rgba(0,237,255,.27)]"
            : "border-neutral-500/50"
        )}
      >
        
        

        <div className={cn("pricing-card-inner h-[600px]")}>
          
          <div className="p-6 pb-0 pricing-card-top-div relative">
            <Image
              src="/pricing-card-grid.png"
              alt="grid"
              layout="fill"
              objectFit="contain"
              className="w-full h-fit z-0 -mt-10 p-2"
            />
            <div className="relative z-10 font-bold text-[28px] text-white tracking-normal effect-font-gradient">
              {title}
            </div>
            <div className="relative z-10 mt-0 text-neutral-400 text-[14px] font-inter tracking-[-.14px] leading-[24px]">
              {description}
            </div>
            <div className="relative z-10 mt-4 flex flex-row gap-2">
              <div className="font-semibold text-5xl pricing-card-btn-amount pb-2 font-inter">
                ₹{price[selectedBilledType]}
              </div>
              {selectedBilledType !== "lifetime" && (
                <div className="text-neutral-400 text-sm font-inter flex items-center">
                  / month
                </div>
              )}
            </div>
            {selectedBilledType === "annually" && (
              <div className="relative z-10 text-neutral-400 font-inter text-sm mt-1">
                ₹{getAnnualPrice()} billed annually
              </div>
            )}

            <button
              className={cn(
                "relative z-10 mb-[24px] mt-[8px] inline-flex font-inter items-center justify-center rounded-lg border border-neutral-400/20 px-12 py-2.5 font-medium text-neutral-50 tracking-tight transition-all pricing-card-btn",
                isBestValue ? "pricing-card-price transition-all" : "bg-neutral-700"
              )}
              type="button"
            >
              <span className="pricing-card-btn-text">Subscribe</span>
            </button>
          </div>
          <hr className="hr-fade" />
          <div className="p-6 ">
            <ul className="space-y-2">
              {features.map((feature) => (
                <li
                  className="flex items-center font-inter gap-2"
                  key={feature}
                >
                  <CheckIcon></CheckIcon>
                  <div className="text-[#d2d0dd] text-sm font-inter tracking-[-.14px]">
                    {feature}
                  </div>
                </li>
              ))}
            </ul>
            {infos && (
              <>
                <div className="my-6 h-px bg-neutral-600" />
                <ul className="space-y-2">
                  {infos.map((feature) => (
                    <li className="flex items-center gap-2" key={feature}>
                      <RiCloseCircleFill className="size-4 rounded-full fill-[#FF4D4F]" />
                      <div className="text-sm font-inter tracking-[-.14px]">
                        {feature}
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
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
        background: "linear-gradient(137deg, #111214 4.87%, #0c0d0f 75.88%)",
        borderTop: "1px solid hsla(0, 0%, 100%, .06)",
        borderRight: "1px solid hsla(0, 0%, 100%, .06)",
        borderLeft: "1px solid hsla(0, 0%, 100%, .06)",
      }}
    >
      {OfferList.map((button) => (
        <button
          className={cn(
            "relative inline-flex w-fit transform-gpu whitespace-nowrap px-6 py-2.5 font-normal text-base capitalize tracking-tight transition-colors",
            selectedBilledType === button
              ? "text-neutral-700 dark:text-neutral-50"
              : "text-neutral-800 hover:text-neutral-600 dark:text-neutral-300 dark:hover:text-neutral-300"
          )}
          key={button}
          onClick={() => handleSwitchTab(button)}
          type="button"
        >
          {button}
          {selectedBilledType === button && (
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className="-z-10 absolute top-0 right-0 bottom-0 left-0 border-t border-neutral-500/50 rounded-full bg-neutral-200 dark:bg-neutral-800"
              exit={{ opacity: 0, scale: 0.9 }}
              initial={{ opacity: 0, scale: 0.95 }}
              layout={true}
              layoutId="pricing-focused-element"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="size-full rounded-full" />
            </motion.div>
          )}
        </button>
      ))}
    </nav>
  );
}
