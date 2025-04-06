import { TriangleAlert } from "lucide-react";
import { motion } from "framer-motion";

export default function Notif4() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="rounded-xl bg-gradient-to-b from-amber-700/20 to-zinc-950 border border-amber-500/50 px-4 py-5 text-white/95"
    >
      <p className="text-[15px]">
        <TriangleAlert
          className="me-3 -mt-0.5 inline-flex opacity-60 text-amber-400"
          size={20}
          aria-hidden="true"
        />
        Light to moderate showers expected in your area tomorrow. Plan accordingly.
      </p>
    </motion.div>
  );
}
