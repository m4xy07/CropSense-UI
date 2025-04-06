import { IndianRupee } from "lucide-react";

export default function Notif5() {
    return (
        <div
            className="rounded-xl bg-gradient-to-b 
                from-green-500/20 to-zinc-950 border-emerald-500/50 px-4 py-5 text-white/95 border "
        >
            <p className="text-[15px]">
                <IndianRupee
                    className="me-3 -mt-0.5 inline-flex opacity-60 text-emerald-300"
                    size={20}
                    aria-hidden="true"
                />
                ₹ 5,000 received via Paytm Merchant ID 234-999
            </p>
        </div>
    );
}
