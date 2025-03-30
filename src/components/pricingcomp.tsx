"use client";
import { motion } from "motion/react";
import { RiCheckboxCircleFill, RiCloseCircleFill } from "@remixicon/react";
import CheckIcon from "@/assets/check.svg";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import StarIcon from "@/assets/star.svg";

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

  return (
    <div className="relative">
      <div className="gradient-border-div"></div> 
      {isBestValue && (
        <div className="best-value-wrapper absolute inset-0 -z-10 rounded-2xl" style={{
          border: "1px solid rgba(0, 237, 255, 0.27)",
          margin: "-1px",
        }}>
          <div className="absolute -top-4 left-0 right-0 pricing-card-popular-tag  text-white text-center py-2 font-bold z-20 rounded-t-lg">
            <div className="flex">
              <div className="flex">
                <StarIcon className="rotate-45 absolute top-1 left-3 scale-animation-1" />
                <StarIcon className="rotate-12 absolute top-1 left-12 scale-animation-2" />
                <StarIcon className="rotate-60 absolute top-4 left-8 scale-animation-3" />
              </div>
              <div className="flex">
              <StarIcon className="rotate-12 absolute top-1 right-3 scale-animation-2" />
                <StarIcon className="rotate-60 absolute top-1 right-12 scale-animation-3" />
                <StarIcon className="rotate-45 absolute top-4 right-8 scale-animation-1" />
              </div>
            </div>
            <span className="pricing-card-popular-tag-text">
            Best Value
            </span>
          </div>
        </div>
      )}
      
      <div
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
                ₹{selectedBilledType === "annually" ? getAnnualPrice() : price[selectedBilledType]}
              </div>
              <div className="text-neutral-400 text-sm font-inter flex items-center">
                / {selectedBilledType === "annually" ? "year" : selectedBilledType === "lifetime" ? "license" : "month"}
              </div>
            </div>
            <button
              className={cn(
                "relative z-10 mb-[24px] mt-[8px] inline-flex font-inter items-center justify-center rounded-lg border border-neutral-400/20 px-12 py-2.5 font-medium text-neutral-50 tracking-tight transition-all ",
                isBestValue ? "pricing-card-price " : "pricing-card-btn"
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
    <div className="bg-[#0a0118] rounded-full mb-12">
    <nav
      className="relative flex flex-col sm:flex-row px-2 py-2 pricing-plan-switcher rounded-full"
      
    >
      {/* Motion div (highlight) stays inside nav but moves smoothly */}
      <div className="relative w-full flex justify-around">
        {OfferList.map((button) => (
          <button
            key={button}
            className={cn(
              "relative z-10 inline-flex w-full sm:w-fit transform-gpu whitespace-nowrap px-6 py-2.5 font-inter font-normal text-base capitalize tracking-tight transition-colors",
              selectedBilledType === button
                ? "text-white"
                : " text-[#9b96b0] hover:text-neutral-300"
            )}
            onClick={() => handleSwitchTab(button)}
            type="button"
          >
            {button}
          </button>
        ))}

        {/* The motion.div moves smoothly between buttons */}
        <motion.div
          layoutId="pricing-focused-element"
          className="absolute top-0 bottom-0 w-[33.33%] rounded-full pricing-plan-switcher-active"
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{
            left: `${OfferList.indexOf(selectedBilledType) * 33.33}%`,
          }}
        />
      </div>
    </nav>
    </div>
  );
}


