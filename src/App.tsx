import { useState } from 'react'
import { BellRing, BriefcaseMedical, ShieldCheck } from 'lucide-react'
import { PublicPortal as PublicPortalPage, AdminDashboard } from './pages/PublicPortal'

function App() {
  const [view, setView] = useState<'public' | 'admin'>('public')

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-5">
        <div className="mb-4 flex items-center justify-between rounded-full border border-slate-800 bg-slate-900 p-1.5">
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300">
              <BriefcaseMedical className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Sistema</p>
              <p className="text-sm font-medium text-white">Gabinete do Utente</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setView('public')}
              className={[
                'rounded-full px-4 py-2 text-sm font-medium transition',
                view === 'public' ? 'bg-cyan-500 text-slate-950' : 'text-slate-300 hover:bg-slate-800'
              ].join(' ')}
            >
              Portal do cidadão
            </button>
            <button
              type="button"
              onClick={() => setView('admin')}
              className={[
                'rounded-full px-4 py-2 text-sm font-medium transition',
                view === 'admin' ? 'bg-emerald-500 text-slate-950' : 'text-slate-300 hover:bg-slate-800'
              ].join(' ')}
            >
              Backoffice
            </button>
          </div>
        </div>
      </div>

      {view === 'public' ? <PublicPortalPage onEnterAdmin={() => setView('admin')} /> : <AdminDashboard />}
    </div>
  )
}

export default App
