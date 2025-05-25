import { ArrowRightIcon, TriangleAlert } from "lucide-react"

export default function AlertComponent() {
  return (
    <div className="rounded-lg border mt-6 px-4 py-3 border-zinc-50/10">
      <div className="flex gap-3">
        <div className="h-[10px] w-[10px] mt-1 rounded-full bg-[#f4af29] alert-animation" />
        {/* <TriangleAlert
          className="hrink-0 mt-0.5 text-amber-500"
          size={16}
          aria-hidden="true"
        /> */}
        <div className="flex grow justify-between gap-3">
          <p className="text-sm">Prices may vary with crop quality at harvest. To stay near expected revenues, follow our guides for optimal results.</p>
          <a href="/dashboard/guides" className="group text-sm font-medium whitespace-nowrap">
        Guides
        <ArrowRightIcon
          className="ms-1 -mt-0.5 inline-flex opacity-60 transition-transform group-hover:translate-x-0.5"
          size={16}
          aria-hidden="true"
        />
          </a>
        </div>
      </div>
    </div>
  )
}
