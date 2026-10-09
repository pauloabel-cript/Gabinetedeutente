import type { CaseItem, ManifestationType, Channel, CaseStatus, Priority } from '../types'

const initialCases: CaseItem[] = [
  {
    id: 'UG-2408',
    type: 'Reclamação',
    status: 'Em análise',
    priority: 'Alta',
    date: '09/10/2026',
    channel: 'Portal',
    owner: 'Dra. N. Silva',
    description: 'Problemas de demora no atendimento de urgência.'
  },
  {
    id: 'UG-2407',
    type: 'Sugestão',
    status: 'Em revisão',
    priority: 'Média',
    date: '08/10/2026',
    channel: 'WhatsApp',
    owner: 'Unidade de Qualidade',
    description: 'Sugerir melhoria na triagem telefónica.'
  },
  {
    id: 'UG-2405',
    type: 'Elogio',
    status: 'Respondida',
    priority: 'Baixa',
    date: '07/10/2026',
    channel: 'SMS',
    owner: 'Gabinete do Utente',
    description: 'Reconhecimento ao apoio prestado pela equipa.'
  }
]

const defaultMetrics = [
  { label: 'Manifestações hoje', value: '184', accent: 'bg-cyan-500/15 text-cyan-200' },
  { label: 'Tempo médio', value: '2d 4h', accent: 'bg-emerald-500/15 text-emerald-200' },
  { label: 'Taxa de resolução', value: '91%', accent: 'bg-violet-500/15 text-violet-200' },
  { label: 'Notificações', value: '1.2k', accent: 'bg-amber-500/15 text-amber-200' }
]

const citizenActions = [
  { title: 'Registar manifestação', detail: 'Submeter reclamação, sugestão ou elogio em segundos.', badge: 'Novo' },
  { title: 'Consultar estado', detail: 'Acompanhar protocolo e prazo de resposta.', badge: 'Ativo' },
  { title: 'Falar com a equipa', detail: 'Solicitar apoio e receber resposta por WhatsApp/SMS.', badge: 'Suporte' }
]

const reportCards = [
  { title: 'Atendimento por semana', value: '1.248', subtitle: 'Total de solicitações' },
  { title: 'Tempo de resposta', value: '2d 4h', subtitle: 'Média nacional' },
  { title: 'Satisfação', value: '94%', subtitle: 'Índice de percepção' },
  { title: 'Custos de comunicação', value: '42,8k', subtitle: 'SS' }
]

const distribution = [
  { label: 'Reclamações', value: 48, color: 'bg-rose-500' },
  { label: 'Sugestões', value: 27, color: 'bg-cyan-500' },
  { label: 'Elogios', value: 18, color: 'bg-emerald-500' },
  { label: 'Outros', value: 7, color: 'bg-violet-500' }
]

const configCards = [
  { title: 'Perfis de acesso', value: 'RBAC', detail: 'Administradores, operadores, qualidade e gestão.' },
  { title: 'SLA e prazos', value: '72h', detail: 'Monitorização de respostas e alertas automáticos.' },
  { title: 'Notificações', value: 'SMS + WhatsApp', detail: 'Enviar mensagens directas ao utente.' }
]

const statusOptions: CaseStatus[] = ['Em análise', 'Em revisão', 'Respondida']

const formDefaults = {
  name: '',
  category: 'Reclamação' as ManifestationType,
  channel: 'Portal' as Channel,
  message: '',
  isAnonymous: false
}

export {
  initialCases,
  defaultMetrics,
  citizenActions,
  reportCards,
  distribution,
  configCards,
  statusOptions,
  formDefaults
}
