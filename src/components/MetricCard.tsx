import type { LucideIcon } from 'lucide-react'

export type MetricCardProps = {
  label: string
  value: string
  accent: string
  icon: LucideIcon
}

export function MetricCard({ label, value, accent, icon: Icon }: MetricCardProps) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
      <div className="flex items-center justify-between">
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${accent}`}>{label}</span>
        <span className="rounded-xl bg-slate-950 p-2 text-slate-200"><Icon className="h-4 w-4" /></span>
      </div>
      <p className="mt-5 text-3xl font-semibold text-white">{value}</p>
    </div>
  )
}
