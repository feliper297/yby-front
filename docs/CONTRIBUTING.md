# CONTRIBUTING — Yby Front

Guia técnico para contribuição no projeto. Leia antes de abrir qualquer PR.

---

## Setup

### Pré-requisitos

| Ferramenta | Versão mínima | Notas |
|-----------|---------------|-------|
| Node.js | 18.x | Recomendado 20.x LTS |
| pnpm | 8.x | Usar `pnpm`, não `npm` ou `yarn` |
| TypeScript | 6.x | Embutido no projeto |

### Clone e install

```bash
git clone <repo-url> yby-front
cd yby-front
pnpm install
```

### Dev server

```bash
pnpm dev
# Abre em http://localhost:3000
```

### Storybook (componentes isolados)

```bash
pnpm storybook
# Abre em http://localhost:6006
```

### Build de produção

```bash
pnpm build
# Zero erros obrigatório antes de qualquer commit
```

### TypeCheck

```bash
npx tsc --noEmit
# Deve retornar sem erros
```

---

## Arquitetura

### Estrutura de pastas

```
src/
├── app/
│   ├── (app)/                    # Rotas protegidas (requer AppShell)
│   │   ├── layout.tsx            # Injeta AppShell para todas as rotas filhas
│   │   ├── agenda/page.tsx       # Página de Agenda de Recebíveis
│   │   ├── financial/page.tsx    # Página Financeiro
│   │   ├── merchants/page.tsx    # Página Merchants
│   │   ├── charges/page.tsx      # Página Cobranças
│   │   ├── pricing/page.tsx      # Página Custos & Pricing
│   │   ├── dashboard/page.tsx    # Dashboard
│   │   ├── reconciliation/       # Conciliação (placeholder)
│   │   ├── users/                # Usuários (placeholder)
│   │   └── settings/             # Configurações (placeholder)
│   ├── login/page.tsx            # Login (fora do AppShell)
│   ├── page.tsx                  # Raiz → redireciona para /dashboard
│   └── layout.tsx                # RootLayout com AntdRegistry + fonte Roboto
│
├── components/
│   ├── shared/                   # Primitivos — Tag, Input, Icon, Button, Badge, Tooltip, BrandLogo, PageHeader
│   ├── ui/                       # Compostos — DataTable, KpiCard, AppSelect, PageHeader (ui)
│   ├── layout/                   # Shell — AppShell, GlobalHeader, Sidebar, ScreenRouter
│   ├── agenda/                   # Sub-componentes de Agenda (AgendaCalendar, AgendaLots, etc.)
│   └── financial/                # Sub-componentes de Financeiro (StatementTab, SettlementsTab, AdvancesTab)
│
├── store/
│   └── nav.store.ts              # Zustand store de navegação (screen, tabs, sidebar)
│
├── lib/
│   └── antd-theme.ts             # Tema customizado do Ant Design (tupiTheme)
│
└── types/
    └── css.d.ts                  # Declarações de tipos CSS
```

### Tecnologias principais

| Lib | Versão | Papel |
|-----|--------|-------|
| Next.js | 14.x | Framework React, roteamento App Router |
| React | 18.x | UI |
| Ant Design | 6.x | Componentes de tabela, select, tooltip |
| Zustand | 5.x | Estado global de navegação (persistido em localStorage) |
| TypeScript | 6.x | Tipagem estrita |
| Storybook | 8.x | Documentação visual de componentes isolados |
| Tailwind CSS | 3.x | Utilitários (com `preflight: false` para não conflitar com AntD) |

---

## Regras de Código

### Estilos

1. **Inline styles obrigatório** em todos os componentes de `shared/` e `ui/`. Nunca usar classes Tailwind nos componentes do design system.
2. Tailwind pode ser usado **somente em páginas** (`app/`) para utilitários pontuais de layout — e ainda assim, com cautela.
3. Nunca criar `div` branca manual com padding e border. Usar `DataTable` para listas, `KpiCard` para métricas.

### Tabelas

4. **DataTable sempre** para qualquer listagem. Nunca usar `<table>` nativo diretamente em páginas, exceto quando a lógica de expansão de linha for incompatível com o wrapper (ex: visão agrupada da Agenda).
5. Sempre passar `rowKey` ao `DataTable`. Nunca omitir.

### Ícones e logos

6. Usar `Icon` para todos os ícones SVG. Nunca incluir SVG inline nas páginas.
7. Usar `BrandLogo` para bandeiras e adquirentes. Nunca usar texto puro.

### Status

8. Usar `Tag` para qualquer coluna de status. Nunca criar badge manual.
9. O status passado ao `Tag` deve ser exatamente uma das chaves do `STATUS_MAP`. Status fora do mapa fazem fallback silencioso para "Pendente".

### TypeScript

10. **Zero erros de TypeScript** obrigatório. Rodar `npx tsc --noEmit` antes de abrir PR.
11. Nunca usar `any`. Se necessário, usar `unknown` + type guard.
12. Props opcionais devem ter `| undefined` explícito no tipo quando relevante para documentação.

### Estado

13. Estado de navegação (qual tela está ativa, qual tab está selecionada) vai no `useNavStore`. Nunca duplicar esse estado em `useState` local de página.
14. Estado de UI local (search, filtros, drawer aberto) vai em `useState` na própria página.

---

## Adicionando um Componente

1. **Decida a camada:**
   - `shared/` — primitivo sem dependência de outros componentes do projeto (ex: `Tag`, `Button`)
   - `ui/` — composto que usa primitivos (ex: `DataTable`, `KpiCard`)
   - `layout/` — estrutura de shell (ex: `Sidebar`)

2. **Crie o arquivo:**
   ```bash
   # Exemplo: novo componente Divider
   touch src/components/shared/Divider.tsx
   ```

3. **Implemente com interface TypeScript clara:**
   ```tsx
   'use client'

   interface DividerProps {
     orientation?: 'horizontal' | 'vertical'
     style?: React.CSSProperties
   }

   export default function Divider({ orientation = 'horizontal', style }: DividerProps) {
     return (
       <div
         style={{
           background: '#F0F0F0',
           width: orientation === 'vertical' ? 1 : '100%',
           height: orientation === 'vertical' ? '100%' : 1,
           flexShrink: 0,
           ...style,
         }}
       />
     )
   }
   ```

4. **Crie o arquivo de stories:**
   ```bash
   touch src/components/shared/Divider.stories.tsx
   ```

   ```tsx
   import type { Meta, StoryObj } from '@storybook/react'
   import Divider from './Divider'

   const meta: Meta<typeof Divider> = {
     component: Divider,
     title: 'Shared/Divider',
   }
   export default meta

   type Story = StoryObj<typeof Divider>

   export const Horizontal: Story = {}
   export const Vertical: Story = { args: { orientation: 'vertical' } }
   ```

5. **Verifique TypeScript e Storybook:**
   ```bash
   npx tsc --noEmit
   pnpm storybook
   ```

---

## Adicionando uma Página

1. **Crie a rota** dentro de `src/app/(app)/`:
   ```bash
   mkdir -p src/app/\(app\)/nova-pagina
   touch src/app/\(app\)/nova-pagina/page.tsx
   ```

2. **Template básico:**
   ```tsx
   'use client'

   import PageHeader from '@/components/shared/PageHeader'

   export default function NovaPaginaPage() {
     return (
       <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
         <PageHeader
           title="Nova Página"
           breadcrumb="Sub-adquirente / Nova Página"
           onBack={() => {}}
         />
         <div style={{ padding: 24 }}>
           {/* conteúdo */}
         </div>
       </div>
     )
   }
   ```

3. **Adicione a rota ao `NAV` do Sidebar** em `src/components/layout/Sidebar.tsx`:
   ```ts
   { key: 'nova-pagina', icon: 'receipt', label: 'Nova Página', screen: 'nova-pagina' }
   ```

4. **Adicione o tipo `Screen`** em `src/store/nav.store.ts`:
   ```ts
   export type Screen =
     | 'dashboard'
     | 'nova-pagina'    // adicionar aqui
     // ...
   ```

5. **Verifique TypeScript:**
   ```bash
   npx tsc --noEmit
   ```

---

## Adicionando Status ao Tag

O componente `Tag` usa um `STATUS_MAP` hardcoded em `src/components/shared/Tag.tsx`. Para adicionar um novo status:

1. **Abra `src/components/shared/Tag.tsx`**

2. **Adicione ao tipo `TagVariant`:**
   ```ts
   export type TagVariant =
     | 'Aprovado'
     // ... existentes ...
     | 'NovoStatus'   // adicionar aqui
   ```

3. **Adicione ao `STATUS_MAP`:**
   ```ts
   const STATUS_MAP: Record<string, { bg: string; color: string; border: string; icon: IconType }> = {
     // ... existentes ...
     'NovoStatus': { bg: '#F0F5FF', color: '#10239E', border: '#ADC6FF', icon: 'info' },
   }
   ```

4. **Escolha o grupo semântico correto:**

   | Grupo | bg | color | border | icon |
   |-------|----|-------|--------|------|
   | Sucesso | `#F6FFED` | `#237804` | `#D9F7BE` | `check` |
   | Warning | `#FFFBE6` | `#874D00` | `#FFE58F` | `info` ou `alert` |
   | Erro | `#FFF1F0` | `#820014` | `#FFCCC7` | `x` |
   | Neutro | `#F5F5F5` | `rgba(0,0,0,0.45)` | `#D9D9D9` | `minus` |
   | Info | `#E6F7FF` | `#003A8C` | `#91D5FF` | `info` |

5. **Verifique TypeScript:**
   ```bash
   npx tsc --noEmit
   ```

---

## Adicionando Período ao PeriodPill

O `DataTable` exporta `PERIOD_OPTIONS` de `src/components/ui/DataTable.tsx`. Para adicionar um novo período:

1. **Abra `src/components/ui/DataTable.tsx`**

2. **Edite `PERIOD_OPTIONS`:**
   ```ts
   export const PERIOD_OPTIONS: PeriodOption[] = [
     { label: 'Hoje',           value: 'hoje'    },
     { label: 'Esta semana',    value: 'semana'  },
     { label: 'Este mês',       value: 'mes'     },
     { label: 'Mês anterior',   value: 'mes_ant' },
     { label: 'Últimos 3 meses',value: '3meses'  },
     { label: 'Últimos 6 meses',value: '6meses'  },  // novo
   ]
   ```

3. O `PeriodPill` renderiza automaticamente todos os itens do array. Não há mais nada a mudar no componente.

4. Se a lógica de filtro de dados for server-side, o novo `value` deve ser tratado no endpoint de API correspondente.

---

## Commit Pattern

Seguir o padrão **Conventional Commits**:

```
<tipo>(<escopo>): <mensagem imperativa em minúsculas>
```

### Tipos

| Tipo | Quando usar |
|------|-------------|
| `feat` | Nova funcionalidade ou página |
| `fix` | Correção de bug |
| `docs` | Apenas documentação |
| `refactor` | Refatoração sem mudança de comportamento |
| `style` | Mudanças de estilo/formatação sem lógica |
| `test` | Testes |
| `chore` | Configuração, deps, CI |

### Escopos comuns

`agenda`, `financial`, `merchants`, `charges`, `pricing`, `dashboard`, `tag`, `datatable`, `sidebar`, `kpicard`, `nav-store`, `antd-theme`, `docs`

### Exemplos

```bash
git commit -m "feat(agenda): adicionar tab de funding com fluxo de caixa"
git commit -m "fix(tag): fallback correto para status não mapeado"
git commit -m "docs: documentação técnica completa — COMPONENTS, PAGES, TOKENS, DOMAIN, CONTRIBUTING"
git commit -m "refactor(datatable): extrair FilterPill como componente separado"
git commit -m "chore(deps): atualizar antd para 6.3.6"
```

---

## Branch Strategy

O repositório usa branch única principal:

| Branch | Propósito |
|--------|-----------|
| `main` | Código de produção. Único commit de bootstrap: `feat: initial commit — Yby Front backoffice fintech (sub-adquirente)` |

Para features novas, criar branches a partir de `main`:

```bash
git checkout -b feat/agenda-funding
# ... desenvolver ...
git push origin feat/agenda-funding
# abrir PR para main
```

### Regras de merge

1. TypeScript zero erros (`npx tsc --noEmit`)
2. Build passa (`pnpm build`)
3. Storybook atualizado para novos componentes
4. PR com descrição do que foi feito e por quê

---

## TypeScript — Regras Específicas

### Zero erros obrigatório

```bash
npx tsc --noEmit
```

Este comando deve retornar sem output antes de qualquer commit.

### Convenções de tipagem

```ts
// Props opcionais: sempre com ? na interface
interface MyProps {
  value: string           // obrigatório
  onChange?: (v: string) => void   // opcional
  style?: React.CSSProperties      // opcional
}

// Nunca usar any
// ERRADO
const data: any = fetchData()
// CORRETO
const data: unknown = fetchData()
if (typeof data === 'object' && data !== null) { ... }

// Generic em componentes com dados de tabela
function DataTable<T extends object>({ dataSource }: { dataSource: T[] }) { ... }

// ColumnType importado do DataTable
import DataTable, { type ColumnType } from '@/components/ui/DataTable'
type MyRow = { id: string; name: string }
const columns: ColumnType<MyRow>[] = [...]

// Zustand state: types exportados do store
import { useNavStore, type Screen, type AgendaTab } from '@/store/nav.store'
```

### Casting controlado

Em handlers de eventos com `onMouseEnter`/`onMouseLeave` (padrão do projeto):

```ts
// Padrão usado em Sidebar, DataTable, KpiCard, etc.
onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#f5f5f5'}
onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
```

Este casting é necessário porque `React.MouseEvent.currentTarget` é tipado como `EventTarget`, não `HTMLElement`.
