# Yby Front — Backoffice Fintech (Sub-adquirente)

Interface de gestão para sub-adquirentes da plataforma Tupi Fintech (OBN). Cobre agenda de recebíveis, chargebacks, merchants, financeiro e operações de adquirência.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 14 (App Router) |
| UI Base | Ant Design 5 |
| State | Zustand |
| Icons | Lucide React |
| Tipagem | TypeScript 6 |
| Package Manager | pnpm |
| Storybook | Storybook 8 (Vite) |

---

## Pré-requisitos

- Node.js ≥ 18
- pnpm ≥ 9 (`npm install -g pnpm`)

---

## Rodando localmente

```bash
# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento (porta 3000)
pnpm dev
```

Acesse `http://localhost:3000`.

---

## Storybook — Design System

O Storybook é a **fonte de verdade do design system**. Todos os componentes compartilhados estão documentados lá com variantes, props e exemplos de uso.

### Rodando o Storybook

```bash
pnpm storybook
```

Acesse `http://localhost:6006`.

### Build estático do Storybook

```bash
pnpm build-storybook
# Output em: storybook-static/
```

### O que está documentado no Storybook

| Story | Componente | Descrição |
|---|---|---|
| `DataTable` | `src/components/ui/DataTable.tsx` | Tabela com WhiteCard embutido — padrão de todas as listas |
| `WhiteCardPattern` | `src/stories/WhiteCardPattern.stories.tsx` | Padrão de seção com card branco, header + divider + body |
| `KpiCard` | `src/components/ui/KpiCard.tsx` | Cards de métricas no topo das páginas |
| `AppSelect` | `src/components/ui/AppSelect.tsx` | Select customizado do design system |

---

## Design System — Padrões principais

### DataTable (= WhiteCard + Tabela)

O componente `<DataTable>` é o padrão único para **toda listagem de dados**. Ele já entrega:

- Card branco com `border: 1px solid rgba(0,0,0,0.06)`
- Header com título + `borderBottom: 1px solid #f0f0f0` quando `title` é passado
- Wrapper interno `padding: 0 21px` entre borda do card e grid da tabela
- Toolbar com busca, filtros pill, exportar e filtro avançado
- Paginação PT-BR integrada

```tsx
<DataTable
  title="Nome da seção"
  titleExtra={<Button>Ação</Button>}
  columns={columns}
  dataSource={data}
  rowKey="id"
  searchValue={search}
  onSearch={setSearch}
  filters={[{ label: 'Status', options: [...], value: statusFilter, onChange: setStatusFilter }]}
  onExport={() => {}}
  pageSize={10}
/>
```

**Nunca** crie um div branco manual em volta de `<table>` — use sempre `<DataTable>`.

### WhiteCard (seções sem tabela)

Para seções que têm conteúdo livre (não tabelas), use o padrão direto:

```tsx
<div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
  {/* Header com divider */}
  <div style={{ padding: '16px 21px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <span style={{ fontSize: 16, fontWeight: 600 }}>Título da seção</span>
  </div>
  {/* Body */}
  <div style={{ padding: '16px 21px' }}>
    {/* conteúdo */}
  </div>
</div>
```

### Tokens de cor

| Token | Valor | Uso |
|---|---|---|
| Primary | `#1890FF` | CTAs, links, selecionado |
| Success | `#52c41a` | Valores positivos, status Ativo |
| Warning | `#fa8c16` | Antecipações, alertas leves |
| Danger | `#ff4d4f` | Valores negativos, erros |
| Text primary | `rgba(0,0,0,0.85)` | Texto principal |
| Text secondary | `rgba(0,0,0,0.65)` | Labels, dados secundários |
| Text disabled | `rgba(0,0,0,0.45)` | Placeholders, desabilitados |
| Border | `rgba(0,0,0,0.06)` | Borda de cards |
| Divider | `#f0f0f0` | Separadores internos |
| Background | `#F2F4F8` | Fundo da aplicação |
| Header bg | `#fafafa` | Cabeçalho de tabelas |

---

## Estrutura do projeto

```
src/
├── app/
│   └── (app)/
│       ├── agenda/         # Agenda de recebíveis (calendário, parcelas, lotes, antecipações, funding, pagamentos)
│       ├── merchants/      # Lista e detalhe de merchants
│       ├── financial/      # Financeiro (extrato, liquidações, antecipações)
│       ├── charges/        # Cobranças / chargebacks
│       ├── reconciliation/ # Conciliação
│       ├── pricing/        # Custos & Pricing
│       ├── users/          # Gestão de usuários
│       └── settings/       # Configurações
├── components/
│   ├── shared/             # PageHeader, Icon, Tag, BrandLogo, etc.
│   └── ui/                 # DataTable, KpiCard, AppSelect (componentes do DS)
└── stories/                # Stories extras (WhiteCardPattern, etc.)
```

---

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `pnpm dev` | Dev server (porta 3000) |
| `pnpm build` | Build de produção |
| `pnpm start` | Serve o build de produção |
| `pnpm lint` | ESLint |
| `pnpm storybook` | Storybook dev (porta 6006) |
| `pnpm build-storybook` | Build estático do Storybook |

---

## Contexto de negócio

**Domínio:** Sub-adquirência / Adquirência  
**Empresa:** Tupi Fintech (OBN)  
**Plataforma:** YBY — backoffice operacional para gestão de recebíveis, merchants e chargebacks

Conceitos-chave para entender as telas:
- **MDR:** taxa cobrada do lojista por transação (%)
- **Agenda de recebíveis:** calendário de URs (Unidades de Recebíveis) por dia — bruto vs líquido, por adquirente
- **Antecipação:** adiantamento de recebíveis futuros com deságio
- **Funding / Liquidação:** eventos de crédito dos adquirentes na conta do sub
- **Chargeback:** contestação de transação pelo portador do cartão
- **Split:** divisão automática de pagamentos entre marketplace e lojistas

---

## Ambiente de desenvolvimento recomendado

- VS Code com extensões: ESLint, Prettier, Tailwind CSS IntelliSense
- Node.js LTS (v20+)
- pnpm (gerenciador de pacotes — **não use npm ou yarn**)
