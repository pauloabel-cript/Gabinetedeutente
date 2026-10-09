import {
  Activity,
  BellRing,
  BriefcaseMedical,
  FileSpreadsheet,
  HeartHandshake,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Users
} from 'lucide-react'

const stats = [
  { label: 'Manifestações hoje', value: '184', accent: 'bg-cyan-500/15 text-cyan-200' },
  { label: 'Tempo médio de resposta', value: '2d 4h', accent: 'bg-emerald-500/15 text-emerald-200' },
  { label: 'Taxa de resolução', value: '91%', accent: 'bg-violet-500/15 text-violet-200' },
  { label: 'Notificações enviadas', value: '1.2k', accent: 'bg-amber-500/15 text-amber-200' }
]

const modules = [
  {
    title: 'Portal do Cidadão',
    description: 'Registo de reclamações, sugestões e elogios com anonimato protegido e protocolo único.',
    icon: MessageSquareText,
    tone: 'from-cyan-500/30 to-sky-500/5'
  },
  {
    title: 'Backoffice',
    description: 'Separação diária por categoria, filtros, registo de chamadas e notas internas.',
    icon: BriefcaseMedical,
    tone: 'from-emerald-500/30 to-teal-500/5'
  },
  {
    title: 'Notificações ao Utente',
    description: 'Envio de SMS e WhatsApp com gestão simplificada de alertas e confirmação de leitura.',
    icon: BellRing,
    tone: 'from-purple-500/30 to-indigo-500/5'
  },
  {
    title: 'Relatórios',
    description: 'Exportação em Excel com múltiplas folhas e suporte a gestão executiva e operacional.',
    icon: FileSpreadsheet,
    tone: 'from-amber-500/30 to-orange-500/5'
  }
]

const priorities = [
  { label: 'Reclamações', value: 48, color: 'bg-rose-500' },
  { label: 'Sugestões', value: 27, color: 'bg-cyan-500' },
  { label: 'Elogios', value: 18, color: 'bg-emerald-500' },
  { label: 'Outros', value: 7, color: 'bg-violet-500' }
]

function App() {
  return (
    <div className="min-h-screen text-slate-100">
      <header className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col gap-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan-200">
              <Sparkles className="h-3.5 w-3.5" />
              Solução digital hospitalar
            </p>
            <h1 className="text-3xl font-bold md:text-5xl">Gabinete do Utente</h1>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950/50 px-4 py-3">
            <ShieldCheck className="h-8 w-8 text-emerald-400" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Conformidade</p>
              <p className="font-medium text-emerald-300">Lei nº 3/2023</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-6 pb-12">
        <section className="grid gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/20">
              <div className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${stat.accent}`}>
                {stat.label}
              </div>
              <p className="mt-5 text-3xl font-semibold text-white">{stat.value}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <div className="mb-6 flex items-center gap-3">
              <HeartHandshake className="h-8 w-8 text-pink-400" />
              <h2 className="text-2xl font-semibold">Visão Geral</h2>
            </div>

            <p className="max-w-2xl text-base text-slate-300">
              Plataforma digital para interligar hospitais e utentes, permitindo registo de reclamações,
              sugestões, elogios, acompanhamento do estado de atendimento e comunicação em tempo útil com a
              comunidade.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {modules.map(({ title, description, icon: Icon, tone }) => (
                <div key={title} className={`rounded-2xl border border-slate-700 bg-gradient-to-br ${tone} p-4`}>
                  <div className="mb-4 inline-flex rounded-xl border border-white/10 bg-slate-950/40 p-3">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
                  <p className="text-sm text-slate-200">{description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <div className="mb-6 flex items-center gap-3">
              <Activity className="h-8 w-8 text-violet-400" />
              <h2 className="text-2xl font-semibold">Distribuição</h2>
            </div>

            <div className="space-y-4">
              {priorities.map(({ label, value, color }) => (
                <div key={label}>
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                    <span>{label}</span>
                    <span>{value}%</span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                    <div className={`${color} h-full rounded-full`} style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-950/50 p-4">
              <div className="mb-3 flex items-center gap-3">
                <Users className="h-5 w-5 text-cyan-400" />
                <span className="font-medium text-slate-200">Gestão de utilizadores</span>
              </div>
              <p className="text-sm text-slate-300">
                Perfis de acesso com RBAC, gestão de SLA e acompanhamento de prazos por equipa e setor.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
