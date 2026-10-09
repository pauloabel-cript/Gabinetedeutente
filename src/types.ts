export type TabKey = 'portal' | 'dashboard' | 'reports' | 'config'

export type ManifestationType = 'Reclamação' | 'Sugestão' | 'Elogio'
export type Channel = 'Portal' | 'WhatsApp' | 'SMS' | 'Presencial'
export type Priority = 'Alta' | 'Média' | 'Baixa'
export type CaseStatus = 'Em análise' | 'Em revisão' | 'Respondida'

export type CaseItem = {
  id: string
  type: ManifestationType
  status: CaseStatus
  priority: Priority
  date: string
  channel: Channel
  owner: string
  description: string
}

export type FormState = {
  name: string
  category: ManifestationType
  channel: Channel
  message: string
  isAnonymous: boolean
}
