# Gabinete do Utente

Portal digital para interacção entre hospitais e utentes, com gestão de manifestações, relatórios, notificações e controlo de SLA.

## Visão geral

A aplicação foi desenvolvida para facilitar a comunicação entre a instituição hospitalar e o cidadão, permitindo:

- Registo e acompanhamento de reclamações, sugestões e elogios
- Gestão de contactos por SMS e WhatsApp
- Painel de trabalho para o gabinete do utente
- Relatórios e exportação em Excel
- Segurança, anonimato e conformidade legal
- Portal livre para o cidadão, sem login obrigatório

## Stack tecnológica

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- SheetJS (XLSX)

## Requisitos

- Node.js 18+
- npm 9+

## Instalação

```bash
npm install
```

## Execução em ambiente de desenvolvimento

```bash
npm run dev
```

## Build para produção

```bash
npm run build
```

## Funcionalidades implementadas

- Landing page institucional
- Portal do cidadão sem login obrigatório
- Formulário de submissão de manifestações
- Consulta de estado do pedido
- Dashboard do backoffice com filtros
- Exportação de relatórios para Excel
- Seção de configuração e conformidade

## Estrutura sugerida

```text
src/
  App.tsx
  main.tsx
  index.css
public/
  favicon.svg
```

## Estado do projeto

A base do frontend foi desenvolvida e a interface já inclui funcionalidades úteis para avaliação e continuação do sistema, com a experiência do cidadão aberta e sem login obrigatório.
