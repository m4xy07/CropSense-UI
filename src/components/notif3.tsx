import { CircleX } from "lucide-react";
import { motion } from "framer-motion";

export default function Notif3() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="rounded-xl border bg-gradient-to-b from-red-700/20 to-zinc-950 border-red-500/50 px-4 py-5 text-white/95"
    >
      <p className="text-[15px]">
        <CircleX
          className="me-3 -mt-0.5 inline-flex opacity-60 text-red-400"
          size={20}
          aria-hidden="true"
        />
        Early signs of blight detected in your tomato crop. Immediate action is recommended!
      </p>
    </motion.div>
  );
}
