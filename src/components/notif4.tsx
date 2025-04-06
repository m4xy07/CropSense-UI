import { TriangleAlert } from "lucide-react"

export default function Notif4() {
  return (
    <div className="rounded-xl bg-gradient-to-b from-amber-700/20 to-zinc-950 border border-amber-500/50 px-4 py-5 text-white/95">
      <p className="text-[15px]">
        <TriangleAlert
          className="me-3 -mt-0.5 inline-flex opacity-60 text-amber-400"
          size={20}
          aria-hidden="true"
        />
        Light to moderate showers expected in your area tomorrow. Plan accordingly.
      </p>
    </div>
  )
}
