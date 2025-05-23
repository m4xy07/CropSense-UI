import { ArrowRightIcon, TriangleAlert } from "lucide-react"

export default function AlertComponent() {
  return (
    <div className="rounded-md border mt-6 px-4 py-3 border-zinc-50/10">
      <div className="flex gap-3">
        <TriangleAlert
          className="hrink-0 mt-0.5 text-amber-500"
          size={16}
          aria-hidden="true"
        />
        <div className="flex grow justify-between gap-3">
          <p className="text-sm">Prices may vary according to the quality of your crop during harvest. In order to keep your revenues close to the predicted values, please refer to our guides for optimal quality.</p>
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
