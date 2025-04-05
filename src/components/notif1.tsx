import { CircleCheckIcon } from "lucide-react";

export default function Notif1() {
    return (
        <div
            className="rounded-xl bg-gradient-to-b 
                from-green-800/20 to-zinc-950 border-emerald-500/50 px-4 py-3 text-emerald-600 border "
        >
            <p className="text-sm">
                <CircleCheckIcon
                    className="me-3 -mt-0.5 inline-flex opacity-60"
                    size={16}
                    aria-hidden="true"
                />
                Completed successfully!
            </p>
        </div>
    );
}
