import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react'
import * as XLSX from 'xlsx'
import {
  Activity,
  ArrowRight,
  BellRing,
  CheckCircle2,
  Clock3,
  MessageSquareText,
  Search,
  Sparkles,
  TrendingUp,
  Users
} from 'lucide-react'
import { MetricCard } from '../components/MetricCard'
import { CaseTable } from '../components/CaseTable'
import { defaultMetrics, citizenActions, distribution, statusOptions, initialCases, formDefaults } from '../data/mockCases'
import type { CaseItem, FormState, TabKey } from '../types'

export function PublicPortal({ onEnterAdmin }: { onEnterAdmin: () => void }) {
  const [form, setForm] = useState<FormState>(formDefaults)
  const [cases, setCases] = useState<CaseItem[]>(initialCases)

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target

    if (type === 'checkbox') {
      const checkbox = event.target as HTMLInputElement
      setForm((previous) => ({ ...previous, [name]: checkbox.checked }))
      return
    }

    setForm((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!form.message.trim()) return

    const nextId = `UG-${Math.floor(1000 + Math.random() * 9000)}`
    const newCase: CaseItem = {
      id: nextId,
      type: form.category,
      status: 'Em análise',
      priority: 'Média',
      date: new Date().toLocaleDateString('pt-MZ'),
      channel: form.channel,
      owner: form.isAnonymous ? 'Anonimizado' : form.name || 'Utente externo',
      description: form.message
    }

    setCases((previous) => [newCase, ...previous])
    setForm(formDefaults)
    onEnterAdmin()
  }

  return (
    <>
      <section className="grid gap-6 rounded-[28px] border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/50 p-8 shadow-2xl shadow-slate-950/40 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan-200">
            <Sparkles className="h-3.5 w-3.5" />
            Portal aberto ao cidadão
          </p>
          <h2 className="max-w-xl text-4xl font-bold tracking-tight text-white md:text-5xl">
            Conectar instituições, utentes e respostas em tempo real.
          </h2>
          <p className="mt-4 max-w-xl text-base text-slate-300">
            Sem login obrigatório para o cidadão. O utente pode apresentar uma reclamação, sugestão ou elogio e acompanhar o protocolo online.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-medium text-slate-950 transition hover:bg-cyan-400">
              Faço a minha manifestação
              <ArrowRight className="h-4 w-4" />
            </button>
            <button type="button" onClick={onEnterAdmin} className="rounded-xl border border-slate-700 bg-slate-950/60 px-5 py-3 font-medium text-slate-200 transition hover:border-slate-500 hover:text-white">
              Ver estado
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-700 bg-slate-950/60 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Resumo do dia</p>
              <h3 className="mt-1 text-2xl font-semibold text-white">7 solicitações pendentes</h3>
            </div>
            <div className="rounded-2xl bg-emerald-500/15 p-2 text-emerald-300">
              <CheckCircle2 className="h-6 w-6" />
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {cases.slice(0, 3).map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-cyan-300">{item.id}</span>
                  <span className="rounded-full bg-slate-800 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-slate-300">
                    {item.priority}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm text-slate-300">
                  <span>{item.type}</span>
                  <span>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {citizenActions.map(({ title, detail, badge }) => (
          <div key={title} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-300">
                <MessageSquareText className="h-5 w-5" />
              </div>
              <span className="rounded-full border border-slate-700 bg-slate-950 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-slate-200">
                {badge}
              </span>
            </div>
            <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm text-slate-300">{detail}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
          <div className="flex items-center gap-3">
            <MessageSquareText className="h-6 w-6 text-cyan-300" />
            <h3 className="text-2xl font-semibold text-white">Submeter manifestação</h3>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="block text-sm text-slate-300">
              Nome / identificador
              <input
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none transition focus:border-cyan-500"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ex.: Ana Mário"
              />
            </label>

            <label className="block text-sm text-slate-300">
              Tipo
              <select
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none transition focus:border-cyan-500"
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="Reclamação">Reclamação</option>
                <option value="Sugestão">Sugestão</option>
                <option value="Elogio">Elogio</option>
              </select>
            </label>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="block text-sm text-slate-300">
              Canal preferido
              <select
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none transition focus:border-cyan-500"
                name="channel"
                value={form.channel}
                onChange={handleChange}
              >
                <option value="Portal">Portal</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="SMS">SMS</option>
                <option value="Presencial">Presencial</option>
              </select>
            </label>

            <label className="mt-6 flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm text-slate-200 md:mt-8">
              <input
                type="checkbox"
                name="isAnonymous"
                checked={form.isAnonymous}
                onChange={handleChange}
                className="h-4 w-4 accent-cyan-500"
              />
              manifesto anonimamente
            </label>
          </div>

          <label className="mt-4 block text-sm text-slate-300">
            Descrição
            <textarea
              className="mt-2 min-h-[120px] w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none transition focus:border-cyan-500"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Descreva a sua situação, sugestão ou elogio..."
            />
          </label>

          <div className="mt-5 flex justify-end">
            <button type="submit" className="rounded-xl bg-emerald-500 px-4 py-2.5 font-medium text-slate-950 transition hover:bg-emerald-400">
              Enviar solicitação
            </button>
          </div>
        </form>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
          <div className="flex items-center gap-3">
            <Activity className="h-6 w-6 text-violet-300" />
            <h3 className="text-2xl font-semibold text-white">Consulta de estado</h3>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Protocolo</p>
            <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-900 p-3">
              <span className="font-semibold text-white">{cases[0]?.id ?? 'UG-0001'}</span>
              <span className="rounded-full bg-cyan-500/10 px-2 py-1 text-xs font-medium text-cyan-200">{cases[0]?.status ?? 'Em análise'}</span>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Etapa atual</p>
              <p className="mt-2 text-lg font-medium text-white">A validação da reclamação está em curso</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Resposta prevista</p>
              <p className="mt-2 text-lg font-medium text-white">Até 48 horas úteis</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabKey>('portal')
  const [cases, setCases] = useState<CaseItem[]>(initialCases)
  const [statusFilter, setStatusFilter] = useState('Todos')
  const [search, setSearch] = useState('')

  const filteredCases = useMemo(() => {
    return cases.filter((item) => {
      const matchesStatus = statusFilter === 'Todos' || item.status === statusFilter
      const matchSearch =
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.type.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())

      return matchesStatus && matchSearch
    })
  }, [cases, search, statusFilter])

  const navItems: { key: TabKey; label: string }[] = [
    { key: 'portal', label: 'Portal do cidadão' },
    { key: 'dashboard', label: 'Backoffice' },
    { key: 'reports', label: 'Relatórios' },
    { key: 'config', label: 'Configuração' }
  ]

  const exportExcel = () => {
    const payload = filteredCases.map((item) => ({
      Código: item.id,
      Tipo: item.type,
      Status: item.status,
      Prioridade: item.priority,
      Canal: item.channel,
      Responsável: item.owner,
      Data: item.date,
      Descrição: item.description
    }))

    const worksheet = XLSX.utils.json_to_sheet(payload)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Manifestações')
    XLSX.writeFile(workbook, 'gabinete-do-utente-relatorio.xlsx')
  }

  return (
    <>
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-500/30">
              <BellRing className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Backoffice</p>
              <h1 className="text-xl font-semibold text-white">Gabinete do Utente</h1>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-2 rounded-full border border-slate-800 bg-slate-900 p-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setActiveTab(item.key)}
                className={[
                  'rounded-full px-4 py-2 text-sm font-medium transition',
                  activeTab === item.key
                    ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                ].join(' ')}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-6 py-8">
        {activeTab === 'dashboard' && (
          <>
            <section className="grid gap-4 md:grid-cols-4">
              {defaultMetrics.map(({ label, value, accent }) => (
                <MetricCard
                  key={label}
                  label={label}
                  value={value}
                  accent={accent}
                  icon={label === 'Manifestações hoje' ? MessageSquareText : label === 'Tempo médio' ? Clock3 : label === 'Taxa de resolução' ? TrendingUp : BellRing}
                />
              ))}
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <h3 className="text-2xl font-semibold text-white">Casos em aberto</h3>

                  <div className="flex flex-col gap-3 md:flex-row md:items-center">
                    <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-300">
                      <Search className="h-4 w-4" />
                      <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        className="w-40 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                        placeholder="Procurar..."
                      />
                    </div>

                    <select
                      value={statusFilter}
                      onChange={(event) => setStatusFilter(event.target.value)}
                      className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none"
                    >
                      <option value="Todos">Todos</option>
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <CaseTable cases={filteredCases} />
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
                <h3 className="text-2xl font-semibold text-white">Distribuição por categoria</h3>
                <div className="mt-6 space-y-5">
                  {distribution.map(({ label, value, color }) => (
                    <div key={label}>
                      <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                        <span>{label}</span>
                        <span>{value}%</span>
                      </div>
                      <div className="h-2.5 w-full rounded-full bg-slate-800">
                        <div className={`${color} h-full rounded-full`} style={{ width: `${value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-cyan-300" />
                    <span className="font-medium text-slate-200">Gestão de utilizadores</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-300">
                    12 operadores ativos, 4 perfis, 3 níveis de SLA e alertas automáticos ao exceder o prazo.
                  </p>
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === 'reports' && (
          <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Exportação</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">Relatórios executivos</h3>
              </div>
              <button type="button" onClick={exportExcel} className="rounded-xl bg-emerald-500 px-4 py-2 font-medium text-slate-950 hover:bg-emerald-400">
                Exportar Excel
              </button>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: 'Geral', subtitle: 'Indicadores de volume, produtividade e tempo médio de resposta.', color: 'text-cyan-300' },
                { title: 'SLA', subtitle: 'Acompanhamento de prazos por unidade, setor e categoria de assunto.', color: 'text-violet-300' },
                { title: 'Comunicação', subtitle: 'Relatório de SMS, WhatsApp e canais utilizados por utente e área.', color: 'text-amber-300' }
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-700 bg-slate-950/50 p-4">
                  <p className={`text-xs uppercase tracking-[0.2em] ${item.color}`}>Folha 1</p>
                  <h4 className="mt-2 text-xl font-semibold text-white">{item.title}</h4>
                  <p className="mt-2 text-sm text-slate-300">{item.subtitle}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'config' && (
          <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <div className="flex items-center gap-3">
              <BellRing className="h-6 w-6 text-emerald-300" />
              <h3 className="text-2xl font-semibold text-white">Conformidade e segurança</h3>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-4">
                <p className="text-sm text-slate-400">Legislação</p>
                <p className="mt-2 text-lg font-medium text-white">Lei nº 3/2023 de Proteção de Dados Pessoais</p>
              </div>
              <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-4">
                <p className="text-sm text-slate-400">Anonimato</p>
                <p className="mt-2 text-lg font-medium text-white">Proteção de identidade e controlo de acesso por perfil</p>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  )
}
