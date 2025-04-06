import { CircleCheckIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function Notif1() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-xl bg-gradient-to-b 
                from-green-800/20 to-zinc-950 border-emerald-500/50 px-4 py-5 text-white/95 border"
        >
            <p className="text-[15px]">
                <CircleCheckIcon
                    className="me-3 -mt-0.5 inline-flex opacity-60 text-emerald-300"
                    size={20}
                    aria-hidden="true"
                />
                You have successfully reached 95% of your projected yield for the rice crop this season.
            </p>
        </motion.div>
    );
}
