# COMPONENTS — Yby Front Design System

Documentação completa de todos os componentes reutilizáveis. Todos os componentes de design system usam **inline styles** exclusivamente (sem classes Tailwind nos componentes em `shared/` e `ui/`). Nunca construa tabelas, cards ou badges manualmente — use sempre os componentes documentados aqui.

---

## Shared Components (`src/components/shared/`)

### Badge

**Propósito:** Indicador numérico ou ponto de notificação. Usado em ícones de sino, contadores de itens pendentes.

**Interface:**

```typescript
interface BadgeProps {
  count: number
  max?: number                    // default 99
  color?: string                  // default '#FF4D4F'
  dot?: boolean                   // default false — mostra ponto sem número
  children?: React.ReactNode
  style?: React.CSSProperties
}
```

**Exemplo mínimo:**

```tsx
<Badge count={5} />
```

**Exemplo avançado:**

```tsx
<Badge count={120} max={99} color="#FA8C16">
  <Icon name="bell" size={20} />
</Badge>
```

**Variantes:**

| Modo | Descrição |
|------|-----------|
| Standalone | Renderiza pill com número |
| Wrapped | Posicionado absoluto sobre `children` (canto superior direito) |
| Dot | Ponto 8×8px sem número |

**Anti-patterns:**

- Não usar `count={0}` sem `dot` — retorna `null`
- Não usar para status semântico — use `Tag` para isso

---

### Button

**Propósito:** Botão de ação. Usado em headers, formulários, drawers.

**Interface:**

```typescript
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant         // default 'primary'
  size?: ButtonSize               // default 'md'
  loading?: boolean               // default false
  icon?: string                   // nome do ícone (componente Icon)
  iconPosition?: 'left' | 'right' // default 'left'
  children?: React.ReactNode
}
```

**Tamanhos:**

| Size | Height | Font Size | Padding |
|------|--------|-----------|---------|
| sm | 24px | 12px | 0 8px |
| md | 32px | 14px | 0 15px |
| lg | 40px | 16px | 0 20px |

**Variantes visuais:**

| Variant | Base | Hover | Disabled |
|---------|------|-------|----------|
| primary | `#1890FF` bg, white text | `#40A9FF` | `#F5F5F5` gray |
| secondary | white bg, dark text, `#D9D9D9` border | border `#1890FF` | gray |
| ghost | transparent, `#1890FF` text | light blue bg | gray text |
| danger | `#FF4D4F` bg, white text | `#FF7875` | gray |

**Exemplo mínimo:**

```tsx
<Button onClick={handleSave}>Salvar</Button>
```

**Exemplo avançado:**

```tsx
<Button
  variant="danger"
  size="lg"
  icon="trash"
  loading={deleting}
  onClick={handleDelete}
>
  Excluir merchant
</Button>
```

**Anti-patterns:**

- Não usar `variant="danger"` para ações não-destrutivas
- Não usar `size="sm"` em headers — usar `md` ou `lg`

---

### Icon

**Propósito:** Ícones SVG inline. Base visual de toda a aplicação.

**Interface:**

```typescript
interface IconProps {
  name: string                    // ver lista abaixo
  size?: number                   // default 16
  color?: string                  // default 'currentColor'
  strokeWidth?: number            // default 2
}
```

**Ícones disponíveis (42):**

`dashboard` · `users` · `receipt` · `calendar` · `landmark` · `creditCard` · `settings` · `bell` · `search` · `chevronDown` · `chevronUp` · `chevronRight` · `chevronLeft` · `menu` · `eye` · `eyeOff` · `info` · `filter` · `plus` · `download` · `x` · `moreHorizontal` · `trendingUp` · `arrowLeft` · `logOut` · `barChart` · `reconcile` · `userPlus` · `edit` · `trash` · `externalLink` · `check` · `minus` · `alertTriangle` · `clock` · `refreshCw` · `copy` · `link` · `phone` · `mail` · `mapPin` · `globe`

**Exemplo mínimo:**

```tsx
<Icon name="dashboard" />
```

**Exemplo avançado:**

```tsx
<Icon name="bell" size={24} color="#FF4D4F" strokeWidth={1.5} />
```

**Anti-patterns:**

- Não usar nomes inexistentes — renderiza SVG vazio
- Não usar `size` > 48 — ícones são desenhados para 16–24px

---

### Input

**Propósito:** Campo de texto com label, erro, hint e ícones.

**Interface:**

```typescript
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label?: string
  error?: string
  hint?: string
  prefix?: string               // nome do ícone
  suffix?: string               // nome do ícone
  onSuffixClick?: () => void
}
```

**Estados visuais:**

| Estado | Border | Shadow |
|--------|--------|--------|
| Normal | `#D9D9D9` | none |
| Focus | `#1890FF` | `0 0 0 2px rgba(24,144,255,0.2)` |
| Error | `#FF4D4F` | `0 0 0 2px rgba(255,77,79,0.2)` |
| Disabled | bg `#F5F5F5` | none |

**Exemplo mínimo:**

```tsx
<Input label="E-mail" placeholder="seu@email.com" />
```

**Exemplo avançado:**

```tsx
<Input
  label="Senha"
  type={showPass ? 'text' : 'password'}
  error={errors.password}
  hint="Mínimo 8 caracteres"
  suffix={showPass ? 'eyeOff' : 'eye'}
  onSuffixClick={() => setShowPass(!showPass)}
/>
```

**Anti-patterns:**

- Não usar `error` e `hint` simultaneamente — `error` tem prioridade visual
- Não usar para selects — usar `AppSelect`

---

### Tag

**Propósito:** Badge de status semântico. Obrigatório em todas as tabelas com coluna de status.

**Interface:**

```typescript
interface TagProps {
  status: string
  label?: string               // override do texto padrão
  showIcon?: boolean           // default true
}
```

**Status disponíveis (23):**

| Grupo | Statuses | Cor | Ícone |
|-------|----------|-----|-------|
| Success (Polar Green) | `Aprovado`, `Pago`, `Ativo`, `Liquidado`, `Quitado`, `Recuperado` | `#237804` / bg `#F6FFED` | check |
| Warning (Calendula Gold) | `Pendente`, `Em aberto`, `A recuperar` | `#874D00` / bg `#FFFBE6` | info |
| Warning (Calendula Gold) | `Suspenso` | `#874D00` / bg `#FFFBE6` | alert |
| Warning (Orange) | `Antecipado` | `#874D00` / bg `#FFF7E6` | info |
| Error (Dust Red) | `Recusado`, `Chargeback`, `Erro` | `#820014` / bg `#FFF1F0` | x |
| Neutral | `Cancelado`, `Inativo` | `rgba(0,0,0,0.45)` / bg `#F5F5F5` | minus |
| Info (Daybreak Blue) | `Em análise`, `Info`, `Previsto` | `#003A8C` / bg `#E6F7FF` | info |

**Exemplo mínimo:**

```tsx
<Tag status="Aprovado" />
```

**Exemplo avançado:**

```tsx
<Tag status="Chargeback" label="Contestado" showIcon={false} />
```

**Anti-patterns:**

- Não usar strings que não estão no mapa — renderiza sem estilização
- Não usar para contagem — usar `Badge`

---

### Tooltip

**Propósito:** Tooltip informativo com ícone de info. Usado em KPI cards para explicar métricas.

**Interface:**

```typescript
interface TooltipProps {
  text: string
  children: React.ReactNode
}
```

**Exemplo mínimo:**

```tsx
<Tooltip text="MDR é a taxa cobrada do lojista por transação">
  <span>MDR médio</span>
</Tooltip>
```

**Anti-patterns:**

- Não usar para textos > 200 chars — considere um popover ou info banner

---

### BrandLogo

**Propósito:** Logos de bandeiras de cartão e adquirentes. Inline SVG para bandeiras, PNG para adquirentes.

**Interface:**

```typescript
interface BrandLogoProps {
  brand: string                 // 'visa' | 'mastercard' | 'master' | 'elo' | 'amex' | 'adiq' | 'rede' | 'cielo' | 'getnet'
  size?: number                 // default 20 — height; width = size * 1.6
  showLabel?: boolean           // default false
}
```

**Exemplo mínimo:**

```tsx
<BrandLogo brand="visa" />
```

**Exemplo avançado:**

```tsx
<BrandLogo brand="cielo" size={32} showLabel />
```

**Anti-patterns:**

- Não usar brand strings fora da lista — renderiza placeholder
- `master` é alias de `mastercard`

---

### PageHeader (shared)

**Propósito:** Header de página com título, breadcrumb, ações e tabs.

**Interface:**

```typescript
interface Tab {
  key: string
  label: string
}

interface PageHeaderProps {
  title: string
  breadcrumb?: string
  extra?: React.ReactNode
  onBack?: () => void
  tabs?: Tab[]
  activeTab?: string
  onTabChange?: (key: string) => void
}
```

**Exemplo mínimo:**

```tsx
<PageHeader title="Dashboard" />
```

**Exemplo avançado:**

```tsx
<PageHeader
  title="Agenda de Recebíveis"
  breadcrumb="Agenda"
  tabs={AGENDA_TABS}
  activeTab={agendaTab}
  onTabChange={setAgendaTab}
  extra={<Button icon="download">Exportar</Button>}
/>
```

**Anti-patterns:**

- Não usar `onBack` sem breadcrumb — confuso para o usuário
- Preferir a versão `ui/PageHeader` para páginas novas (usa AntD Breadcrumb nativo)

---

## UI Components (`src/components/ui/`)

### AppSelect

**Propósito:** Wrapper do Ant Design Select com suporte a label, hint e error. Usado em formulários.

**Interface:**

```typescript
type AppSelectProps<T = string> = SelectProps<T> & {
  label?: string
  hint?: string
  error?: string
}
```

**Exemplo mínimo:**

```tsx
<AppSelect
  label="Bandeira"
  options={[
    { label: 'Visa', value: 'visa' },
    { label: 'Mastercard', value: 'mastercard' },
  ]}
/>
```

**Exemplo avançado:**

```tsx
<AppSelect
  label="Status"
  mode="multiple"
  error={errors.status}
  hint="Selecione um ou mais"
  options={statusOptions}
  onChange={setStatusFilter}
/>
```

**Anti-patterns:**

- Não usar `<select>` nativo — sempre `AppSelect`
- Não combinar `error` e `hint` — error tem prioridade

---

### DataTable

**Propósito:** Tabela padronizada com toolbar (busca, filtros, período, export). **Componente obrigatório para toda listagem.**

**Interface:**

```typescript
type PeriodOption = { label: string; value: string }

type TableFilterConfig = {
  key: string
  label: string
  options: { label: string; value: string }[]
  value: string[]
  onChange: (val: string[]) => void
}

type DataTableProps<T extends object> = {
  columns: ColumnType<T>[]
  dataSource: T[]
  rowKey: TableProps<T>['rowKey']
  title?: string
  titleExtra?: React.ReactNode
  searchPlaceholder?: string
  searchValue?: string
  onSearch?: (value: string) => void
  filters?: TableFilterConfig[]
  onExport?: () => void
  onAdvancedFilter?: () => void
  toolbarExtra?: React.ReactNode
  periodOptions?: PeriodOption[]
  defaultPeriod?: string
  periodValue?: string
  onPeriodChange?: (value: string) => void
  loading?: boolean
  pageSize?: number              // default 10
  showPagination?: boolean       // default true
  expandable?: TableProps<T>['expandable']
  onRow?: TableProps<T>['onRow']
}
```

**Period options pré-definidas (exportadas):**

```typescript
const PERIOD_OPTIONS: PeriodOption[] = [
  { label: 'Hoje', value: 'hoje' },
  { label: 'Esta semana', value: 'semana' },
  { label: 'Este mês', value: 'mes' },
  { label: 'Mês anterior', value: 'mes_ant' },
  { label: 'Últimos 3 meses', value: '3meses' },
]
```

**Exemplo mínimo:**

```tsx
<DataTable
  columns={columns}
  dataSource={data}
  rowKey="id"
/>
```

**Exemplo avançado:**

```tsx
<DataTable
  title="Transações"
  titleExtra={<Button icon="plus">Nova cobrança</Button>}
  columns={columns}
  dataSource={filtered}
  rowKey="id"
  searchPlaceholder="Buscar por NSU ou merchant"
  searchValue={search}
  onSearch={setSearch}
  filters={[
    { key: 'status', label: 'Status', options: statusOpts, value: statusFilter, onChange: setStatusFilter },
    { key: 'bandeira', label: 'Bandeira', options: bandeiraOpts, value: bandeiraFilter, onChange: setBandeiraFilter },
  ]}
  periodOptions={PERIOD_OPTIONS}
  periodValue={period}
  onPeriodChange={setPeriod}
  onExport={handleExport}
  pageSize={15}
/>
```

**Features:**

- Search input com ícone (232px width)
- Filter pills com multi-select dropdown (checkboxes)
- Period pill com presets
- Export button com ícone download
- Botão filtro avançado (icon-only)
- Paginação com contagem total
- Header `#FAFAFA`, font-weight 400

**Anti-patterns:**

- Não usar `antd Table` diretamente — sempre `DataTable`
- Não omitir `rowKey` — causa warnings de React
- Não usar `pageSize` > 50 — performance

---

### KpiCard

**Propósito:** Card de métrica/KPI. Usado em dashboards e headers de tabs.

**Interface:**

```typescript
type KpiVariant = 'info' | 'orange' | 'error' | 'success' | 'warning' | 'neutral'

interface KpiCardProps {
  label: string
  value: string
  subLabel?: string
  variant?: KpiVariant           // default 'info'
  tooltip?: string
  loading?: boolean
  style?: React.CSSProperties
}
```

**Variantes:**

| Variant | Background | Border | Value Color |
|---------|------------|--------|-------------|
| info | `#E6F7FF` | `#91D5FF` | `#1890FF` |
| orange | `#FFF7E6` | `#FFD591` | `#FA8C16` |
| error | `#FFF1F0` | `#FFCCC7` | `#FF4D4F` |
| success | `#F6FFED` | `#D9F7BE` | `#237804` |
| warning | `#FFFBE6` | `#FFE58F` | `#874D00` |
| neutral | `#F5F5F5` | `#D9D9D9` | `rgba(0,0,0,0.85)` |

**Exemplo mínimo:**

```tsx
<KpiCard label="Total bruto" value="R$ 1.240.500,00" />
```

**Exemplo avançado:**

```tsx
<KpiCard
  label="MDR médio"
  value="2.34%"
  subLabel="+0.12% vs mês anterior"
  variant="warning"
  tooltip="Merchant Discount Rate médio ponderado"
  loading={isLoading}
/>
```

**Anti-patterns:**

- Não usar mais de 6 KpiCards seguidos — agrupar em rows de 4–5
- Não usar `variant="error"` para métricas positivas

---

### PageHeader (ui)

**Propósito:** Versão Ant Design do PageHeader. Usa `antd Breadcrumb` nativo e `lucide-react ArrowLeft`.

**Interface:**

```typescript
interface Props {
  title: string
  breadcrumbs?: BreadcrumbItemType[]  // Ant Design type
  extra?: React.ReactNode
  tabs?: React.ReactNode
  onBack?: () => void
}
```

**Exemplo mínimo:**

```tsx
<PageHeader title="Merchants" />
```

**Exemplo avançado:**

```tsx
<PageHeader
  title="Detalhes do Merchant"
  breadcrumbs={[{ title: 'Merchants' }, { title: 'MCH-001' }]}
  onBack={() => router.back()}
  extra={<Button variant="secondary" icon="edit">Editar</Button>}
/>
```

---

## Layout Components (`src/components/layout/`)

### AppShell

**Propósito:** Shell raiz da aplicação autenticada. Contém GlobalHeader + Sidebar + área de conteúdo.

```typescript
interface Props {
  children: React.ReactNode
}
```

**Layout:** Flex column 100vw × 100vh, background `#F2F4F8`.

---

### GlobalHeader

**Propósito:** Barra superior com logo TUPI, busca, notificações e menu de usuário. Height: 48px.

---

### Sidebar

**Propósito:** Menu de navegação lateral colapsável (207px aberto, 48px fechado).

**Itens de navegação:**

| Key | Icon | Label | Sub-items |
|-----|------|-------|-----------|
| dashboard | dashboard | Dashboard | — |
| merchants | users | Merchants | Lista, Novo |
| charges | receipt | Cobranças | — |
| agenda | calendar | Agenda | Recebíveis, Por parcela, Por lote |
| financial | landmark | Financeiro | Extrato, Liquidações, Antecipações |
| reconciliation | reconcile | Conciliação | — |
| pricing | creditCard | Custos & Pricing | — |
| users | userPlus | Usuários | — |
| settings | settings | Configurações | — |

---

### ScreenRouter

**Propósito:** Sincroniza o Zustand nav store com o Next.js router. Sem output visual (retorna `null`).
