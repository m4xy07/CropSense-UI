"use client";

import { clsx } from "clsx";
import { motion } from "framer-motion";

export function BentoCard({
  className = "",
  eyebrow,
  title,
  description,
  graphic,
  fade = [],
}: {
  className?: string;
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  graphic: React.ReactNode;
  fade?: ("top" | "bottom")[];
}) {
  return (
    <motion.div
      initial="idle"
      whileHover="active"
      variants={{ idle: {}, active: {} }}
      className={clsx(
        className,
        "group relative flex flex-col overflow-hidden rounded-lg",
        "bg-[#0a0118] shadow-sm border border-[#a9a3c23d]",
      )}
    >
      <div className="relative h-80 shrink-0">
        {graphic}
        {fade.includes("top") && (
          <div className="absolute inset-0 bg-gradient-to-b to-50% from-gray-950 from-[-25%]" />
        )}
        {fade.includes("bottom") && (
          <div className="" />
        )}
      </div>
      <div className="relative p-10">
        <p className=" feature-title text-white">
          {title}
        </p>
        <p className="mt-2 max-w-[600px] text-sm/6 text-gray-400 font-inter">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
