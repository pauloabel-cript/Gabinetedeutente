import type { CaseItem } from '../types'

export function CaseTable({ cases }: { cases: CaseItem[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800">
      <table className="min-w-full divide-y divide-slate-800 text-left text-sm text-slate-200">
        <thead className="bg-slate-950/80 text-slate-400">
          <tr>
            <th className="px-4 py-3">Código</th>
            <th className="px-4 py-3">Tipo</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Canal</th>
            <th className="px-4 py-3">Responsável</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800 bg-slate-900/60">
          {cases.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-3 font-medium text-white">{item.id}</td>
              <td className="px-4 py-3">{item.type}</td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-cyan-500/10 px-2 py-1 text-xs text-cyan-200">{item.status}</span>
              </td>
              <td className="px-4 py-3">{item.channel}</td>
              <td className="px-4 py-3">{item.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
