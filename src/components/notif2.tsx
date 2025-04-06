import { InfoIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function Notif2() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="rounded-xl bg-gradient-to-b 
                from-blue-900/20 to-zinc-950 border-violet-800/40 px-4 py-5 text-white/95 border"
    >
      <p className="text-[15px]">
        <InfoIcon
          className="me-3 -mt-0.5 inline-flex opacity-60 text-blue-300"
          size={20}
          aria-hidden="true"
        />
        Today&apos;s market price for onions: ₹24/kg — up ₹3 from last week.
      </p>
    </motion.div>
  );
}
