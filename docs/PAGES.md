# PAGES — Yby Front

Documentação de cada página do backoffice. Todas as páginas residem em `src/app/(app)/` (rota protegida com `AppShell`) com exceção de Login e a raiz.

---

## Índice

1. [Login](#login)
2. [Dashboard](#dashboard)
3. [Agenda de Recebíveis](#agenda-de-recebíveis)
4. [Financeiro](#financeiro)
5. [Merchants](#merchants)
6. [Cobranças](#cobranças)
7. [Custos & Pricing](#custos--pricing)

---

## Login

**Arquivo:** `src/app/login/page.tsx`

**Job to be done:** O operador do sub-adquirente precisa autenticar-se para acessar o painel de backoffice. Espera uma tela limpa, profissional e rápida para entrar com e-mail e senha.

### Estado local

```ts
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [showPass, setShowPass] = useState(false)
const [loading, setLoading] = useState(false)
```

### Componentes usados

- `Icon` (olho para toggle de senha)
- `useRouter` (Next.js) — redireciona para `/dashboard` após login

### Fluxo atual (mock)

1. Usuário preenche e-mail e senha
2. Clica em "Entrar" ou pressiona Enter em qualquer campo
3. `loading = true` por 900ms (setTimeout simulado)
4. Redireciona para `/dashboard`

### Layout

- Header branco (104px) com logo TUPI + badge roxo "Sub-adquirente"
- Card central 420px × auto, `padding: 36px`, `box-shadow: 0 2px 8px rgba(0,0,0,0.08)`
- Background canvas `#F2F4F8`
- Footer com copyright e links de política/termos

### Dados

Nenhum dado real — autenticação é simulada por timeout. Produção deve integrar com endpoint de auth (JWT/OAuth).

---

## Dashboard

**Arquivo:** `src/app/(app)/dashboard/page.tsx`

**Job to be done:** O gestor do sub-adquirente precisa de uma visão consolidada de volume, aprovação e distribuição de transações para avaliar a saúde do negócio em menos de 30 segundos.

### Estado local

```ts
const [tab, setTab] = useState('geral')  // 'geral' | 'planificacao'
```

### Tabs (botões no `extra` do PageHeader)

| Tab | Conteúdo |
|-----|----------|
| `geral` | KPI row + donut de bandeiras + linha temporal + ranking de merchants |
| `planificacao` | Mesmos componentes com foco no ranking (a distinção é visual no botão ativo) |

### Componentes usados

- `PageHeader` (shared) — com `extra` contendo botões de tab + filtros de MCC e período
- `Icon`
- `BrandLogo`
- `KpiCard` local (versão simplificada inline, não o componente de `ui/KpiCard.tsx`)
- `DonutChart` — SVG inline, sem biblioteca externa
- `MultiLineChart` — SVG inline polyline, sem biblioteca externa

### KPIs exibidos

| Label | Valor (mock) | Observação |
|-------|-------------|-----------|
| Cobranças criadas | R$ 1.240.500,00 | Trend +14% vs mês anterior |
| Cobranças autorizadas | R$ 1.180.200,00 | Taxa aprovação 95,2% |
| Quantidade | 38.140 | Transações |
| Merchants ativos | 7 | de 8 cadastrados |
| MDR médio | 2,34% | Blended rate |

### Gráficos

**Donut:** distribuição de transações por bandeira (Visa 4.823 / Mastercard 3.241 / Elo 1.456 / Outros 620). SVG puro 160×160, innerRadius 36px.

**MultiLine:** volume por bandeira nos últimos 6 meses (Jan–Jun). SVG viewBox 500×140, sem eixo Y explícito.

### Dados

Todos mock hardcoded na página. Produção: endpoint de resumo consolidado filtrado por período e MCC.

---

## Agenda de Recebíveis

**Arquivo:** `src/app/(app)/agenda/page.tsx`

**Job to be done:** O analista financeiro do sub-adquirente precisa visualizar e entender o fluxo de recebíveis — quando cada parcela será creditada, quanto foi antecipado, e qual é o líquido disponível — para tomar decisões de caixa e de antecipação a merchants.

### Tabs

```ts
const AGENDA_TABS = [
  { key: 'calendario',   label: 'Calendário' },
  { key: 'detalhada',    label: 'Por parcela' },
  { key: 'lote',         label: 'Por lote' },
  { key: 'antecipacoes', label: 'Antecipações' },
  { key: 'funding',      label: 'Funding / Liquidação' },
  { key: 'pagamentos',   label: 'Pagamentos' },
]
```

Tab ativa controlada por `useNavStore().agendaTab` (persiste em `localStorage` via Zustand `persist`).

### Estado local

```ts
const [agrupado, setAgrupado] = useState(false)
const [search, setSearch] = useState('')
const [filterBandeira, setFilterBandeira] = useState('')
const [filterStatus, setFilterStatus] = useState('')
const [selectedDay, setSelectedDay] = useState(22)
const [expandedLotes, setExpandedLotes] = useState<Record<string, boolean>>({})
const [calView, setCalView] = useState<'bruto' | 'repasse' | 'liquido'>('bruto')
const [calBrutoSub, setCalBrutoSub] = useState<'consolidado' | 'adquirente'>('consolidado')
const [selectedAdqs, setSelectedAdqs] = useState<string[]>([])
const [adqDropOpen, setAdqDropOpen] = useState(false)
const [dismissed, setDismissed] = useState<Set<string>>(new Set())
```

### Tab: Calendário

**Layout:** dois painéis lado a lado — calendário mensal (flex:1) + painel de detalhe do dia (280px fixo).

**Calendário:**
- Toggle de visão: `Bruto` / `Repasses` / `Líquido`
- Quando `Bruto` selecionado, sub-toggle: `Todos` | `Adiq` | `Rede` | `Cielo` | `Getnet`
- Grid 7 colunas (Dom–Sáb) com `firstDow` calculado por `new Date(calYear, calMonth, 1).getDay()`
- Estados visuais dos dias: `creditado` (passado normal), `confirmado` (passado recente), `antecipado` (passado com antecipação), `previsto` (futuro)
- Hoje marcado com borda azul no topo (`2px solid #1890FF`) e background `#f0f7ff`

**Painel de detalhe do dia:**
- Dados: crédito líquido do dia, compromisso futuro
- Linhas de entradas (Parcelas a creditar, Recebíveis livres)
- Compromissos: Taxas e MDR, Recebíveis comprometidos (antecipação tomada + gravame/oneração)
- Banners com tooltips educativos

### Tab: Por parcela

**Modo simples (`agrupado=false`):** `DataTable` com 13 colunas e filtros de busca, bandeira, lançamento, status e período.

**Modo agrupado (`agrupado=true`):** `<table>` nativo expandível com linhas-pai (lote por data+bandeira) e linhas-filho (parcelas). Toggle no `titleExtra` do DataTable.

**Colunas da tabela:**
Data de crédito · NSU/Ref (com dot laranja para antecipadas) · Merchant (EC) · Adquirente · Bandeira · Lançamento · Parcela · Valor · MDR retido · Antecip. tomada (com tooltip) · Valor líquido · Status · Ações (eye)

**KPIs exibidos:**
Total de parcelas · Valor bruto total · Parcelas antecipadas · Deduções (MDR) · Valor líquido total

### Tab: Por lote

`DataTable` com 7 colunas: Lote/Adquirente (combinado com BrandLogo) · Qtd · Bruto · Comissão Sub · Antecipação · Líquido · Status.

Barra de totais fixada abaixo da tabela (background `#e6f7ff`).

**Dados mock:** 7 lotes entre 10/04 e 13/04/2026. 4 adquirentes, 3 bandeiras.

### Tab: Antecipações

Antecipações **do sub-adquirente para os merchants (ECs)**. O sub adianta dinheiro e recupera via desconto nos próximos repasses.

`DataTable` com colunas: Data · Merchant · Valor antecipado ao EC · Taxa (a.m.) · Receita (juros) · Prazo · Saldo devedor do EC · Status.

Banner informativo dismissível com saldo total em aberto.

### Tab: Funding / Liquidação

Créditos **recebidos dos adquirentes** (Adiq, Rede, Cielo, Getnet).

Layout de dois painéis:
- **Esquerdo:** Fluxo de Caixa com Adquirentes (demonstrativo de resultado estilo DRE simplificado)
- **Direito:** Dois cards empilhados — Liquidações por adquirente (barras de progresso) + Funding previsto próximos 7 dias

Abaixo: `DataTable` de eventos de liquidação com colunas: Data · Adquirente · Tipo de crédito · Bruto do lote · Descontos · Crédito líquido · Conta destino · Status.

### Tab: Pagamentos

Repasses **do sub-adquirente para os merchants**.

Banner de política de repasse: D+1 útil (débito/PIX) · D+14 (crédito à vista) · D+30/parcela (parcelado).

Card de rolling reserve: R$ 43.200,00 · 3% · libera em 90d.

`DataTable` com: Merchant · CNPJ · Data repasse · Bruto vendas · Taxas retidas · Valor repassado · Conta destino · Status.

### Componentes usados

- `PageHeader` (shared) com tabs e breadcrumb
- `DataTable` + `PERIOD_OPTIONS`
- `Tag`
- `BrandLogo`
- `Icon`
- `Tooltip` (local inline — cópia do componente shared para uso dentro da página)
- `useNavStore` (tabs de agenda, agendaTab)

### Dados

Todos mock hardcoded na página. Array `PARCELAS_DATA` com 23 registros cobrindo 4 adquirentes, 4 bandeiras, 8 merchants (ECs).

---

## Financeiro

**Arquivo:** `src/app/(app)/financial/page.tsx`

**Job to be done:** O controller do sub-adquirente precisa acompanhar o extrato de caixa, as liquidações recebidas dos adquirentes e as antecipações concedidas a merchants — com capacidade de simular novas operações de antecipação.

### Tabs

```ts
const FINANCIAL_TABS = [
  { key: 'extrato',      label: 'Extrato' },
  { key: 'liquidacoes',  label: 'Liquidações' },
  { key: 'antecipacoes', label: 'Antecipações' },
]
```

Tab ativa controlada por `useNavStore().financialTab`.

### Estado local

```ts
const [drawerLiq, setDrawerLiq] = useState<LiqEvento | null>(null)
const [drawerSim, setDrawerSim] = useState(false)
const [dismissed, setDismissed] = useState<Set<string>>(new Set())
```

### Tab: Extrato

`DataTable` com colunas: Data · Descrição · Tipo (pill colorida: Crédito azul / Custo vermelho / Neutro) · Adquirente · Entrada (verde) · Saída (vermelho) · Saldo parcial (Roboto Mono).

KPIs: Saldo disponível · Entradas no mês · Saídas no mês · Próximo crédito.

**Dados mock:** `EXTRATO_DATA` — 8 lançamentos de abril/2026 cobrindo liquidações, repasses e custos.

### Tab: Liquidações

Dois blocos de conteúdo:

**1. Banner informativo:** "Liquidação Centralizada ativa" — domicílio bancário + oneração R$ 140.000,00. Botão "Ver configuração".

**2. DataTable domicílio bancário:** 4 linhas (Adiq/CIP, Rede/CERC, Cielo/TAG, Getnet/CIP). Colunas: Adquirente · Registradora (pill) · Domicílio bancário (Roboto Mono) · Volume liquidado · Status · Ações (edit).

**3. DataTable eventos de liquidação:** 8 eventos. Colunas: Data · Adquirente · Tipo de crédito (pill Crédito normal / Desconto de antecipação tomada) · Bruto · MDR/Tarifas · Antecipação descontada · Crédito líquido · Conta creditada · Status · Ação (eye → abre `DrawerLiquidacaoDetalhes`).

Barra de totais fixada abaixo.

KPIs: Total liquidado · A liquidar · Liq. centralizada ativa · Gravames ativos · Custo de processamento.

### Tab: Antecipações

`DataTable` com colunas: ID (Roboto Mono azul) · Data · Merchant · Valor antecipado · Taxa (a.m.) · Juros recebidos · Vencimento · A recuperar · Status.

Botões no `titleExtra`: "Simular antecipação" (abre `DrawerSimulacaoAntecipacao`) + "Nova antecipação".

KPIs: Saldo devedor total · Antecipado no mês · Taxa média tomada · Custo total em juros · Elegível para antecipar.

### Drawers

**`DrawerLiquidacaoDetalhes`** (largura 480px):
- Abre ao clicar no ícone eye em qualquer linha de liquidação
- Exibe: Dados da operação (adquirente, tipo, data, conta, registradora) + Resumo financeiro (4 mini-cards coloridos: Bruto/MDR/Antecip/Líquido)
- Footer: "Baixar comprovante" + "Estornar" (se não liquidado)

**`DrawerSimulacaoAntecipacao`** (largura padrão):
- Formulário: Valor da cobrança (input) · Método (select) · Bandeira (select) · MCC (select)
- Ao clicar "Simular": calcula `repasseEC = -(v * (1 - taxaEC))`, `custoAdq = -(v * taxaAdq)`, `liquido = v + repasseEC + custoAdq`
- Resultado: resumo em 4 mini-cards + tabela detalhada de simulação
- Footer muda para "Refazer Simulação" + "Contratar antecipação"

**Tabela de taxas para simulação:**

| Método | Taxa EC | Taxa Adq |
|--------|---------|----------|
| Crédito à vista | 2,00% | 1,00% |
| Crédito parcelado 2x | 2,50% | 1,20% |
| Crédito parcelado 3–6x | 2,90% | 1,50% |
| Crédito parcelado 7–12x | 3,40% | 1,80% |
| Débito à vista | 1,50% | 0,80% |

### Componentes usados

- `PageHeader` (shared)
- `DataTable` + `PERIOD_OPTIONS`
- `Tag`
- `BrandLogo`
- `Icon`
- `Drawer` (componente local inline — não exportado)
- `useNavStore`

---

## Merchants

**Arquivo:** `src/app/(app)/merchants/page.tsx`

**Job to be done:** O gestor de credenciamento precisa consultar, filtrar e gerenciar os merchants (ECs) cadastrados — visualizando status, volume e detalhes completos — para tomar ações de ativação, suspensão ou exclusão.

### Estado local

```ts
const [search, setSearch] = useState('')
const [statusFilter, setStatusFilter] = useState<string[]>(['Ativo', 'Suspenso', 'Inativo'])
const [detail, setDetail] = useState<Merchant | null>(null)
const [detailTab, setDetailTab] = useState('geral')
```

### Componentes usados

- `PageHeader` (shared) com botão "Novo Merchant" no `extra`
- `DataTable`
- `Tag`
- `Icon`

### Colunas da tabela

| Coluna | Largura | Observação |
|--------|---------|-----------|
| ID | 100px | Azul, Roboto Mono |
| Nome | flex | Fontweight 600, sortável A–Z |
| CNPJ | 180px | Roboto Mono 12px |
| MCC | 70px | — |
| Volume (30d) | flex | Fontweight 500 |
| Transações | 110px | Sortável, formato `pt-BR` |
| Status | 100px | `<Tag>` |
| Ações | 96px | Ícones: eye (detail), edit, trash |

### Drawer de detalhe (inline, sem componente extraído)

Painel deslizante de 540px à direita. Abre ao clicar no ícone eye de qualquer linha.

**Tabs do drawer:**
- `geral` — KPIs (Volume 30d, Transações, Ticket médio R$ 186,00) + dados (Status, MCC, CNPJ, Credenciado em, Última transação) + botões Editar / Suspender|Reativar
- `transações` — "Em desenvolvimento"
- `agenda` — "Em desenvolvimento"
- `documentos` — "Em desenvolvimento"

### Dados mock

```ts
// 8 merchants
const MERCHANTS = [
  { id: 'MCH-001', name: 'Americanas S.A.', cnpj: '00.776.574/0001-56', mcc: '5912', status: 'Ativo', ... },
  // ... MCH-002 a MCH-008
]
```

---

## Cobranças

**Arquivo:** `src/app/(app)/charges/page.tsx`

**Job to be done:** O analista de suporte precisa consultar transações individuais — filtrando por status e método de pagamento — para responder dúvidas de merchants e investigar transações recusadas ou em análise.

### Estado local

```ts
const [search, setSearch]             = useState('')
const [statusFilter, setStatusFilter] = useState<string[]>(ALL_STATUSES)
const [methodFilter, setMethodFilter] = useState<string[]>(ALL_METHODS)
```

### Componentes usados

- `PageHeader` (shared)
- `DataTable`
- `Tag`

### Colunas da tabela

| Coluna | Observação |
|--------|-----------|
| ID | `#TXN-XXXX`, azul, Roboto Mono |
| Merchant | Sortável |
| Data | `rgba(0,0,0,0.65)` |
| Valor | Fontweight 500 |
| Método | Visa / Mastercard / Elo / PIX / Boleto |
| Parcelas | 1x, 3x, 6x, 12x |
| Status | `<Tag>` |

### Filtros disponíveis

- Busca por merchant ou ID de transação
- FilterPill "Status": Aprovado, Pendente, Em análise, Recusado
- FilterPill "Método": Visa, Mastercard, Elo, PIX, Boleto
- Botão Exportar

### Dados mock

```ts
const TRANSACTIONS = [
  { id: '#TXN-9001', merchant: 'Mercado Livre', date: '22/04/2026', value: 'R$ 3.450,00', method: 'Visa', installments: '1x', status: 'Aprovado' },
  // 6 transações adicionais
]
```

---

## Custos & Pricing

**Arquivo:** `src/app/(app)/pricing/page.tsx`

**Job to be done:** O gerente comercial precisa consultar e editar as taxas (MDR, antecipação, tarifa por transação) por arranjo de pagamento e produto — para ajustar o pricing de novos merchants ou comunicar mudanças regulatórias.

### Estado local

```ts
const [exp, setExp] = useState<Record<string, boolean>>({
  visa: true,
  mastercard: false,
  elo: false,
  pix: false,
})
```

Controla se cada acordeão de scheme está expandido.

### Componentes usados

- `PageHeader` (shared) com botões "Histórico" e "Salvar alterações"
- `Icon`

### Estrutura de dados

```ts
const schemes = [
  { key: 'visa', label: 'Visa', color: '#1A1F71', txtColor: '#fff', products: [...] },
  { key: 'mastercard', label: 'Mastercard', color: '#EB001B', txtColor: '#fff', products: [...] },
  { key: 'elo', label: 'Elo', color: '#FFD700', txtColor: '#000', products: [...] },
  { key: 'pix', label: 'PIX', color: '#00BDAE', txtColor: '#fff', products: [...] },
]
```

### Tabela de pricing vigente (mock)

| Arranjo | Produto | MDR | Taxa Antecipação | Tarifa/Txn |
|---------|---------|-----|-----------------|------------|
| Visa | Crédito à vista | 2,20% | 1,99% a.m. | R$ 0,10 |
| Visa | Crédito 2–6x | 2,90% | 1,99% a.m. | R$ 0,10 |
| Visa | Crédito 7–12x | 3,40% | 1,99% a.m. | R$ 0,10 |
| Visa | Débito | 1,50% | — | R$ 0,08 |
| Mastercard | Crédito à vista | 2,25% | 1,99% a.m. | R$ 0,10 |
| Mastercard | Crédito 2–6x | 2,95% | 1,99% a.m. | R$ 0,10 |
| Mastercard | Crédito 7–12x | 3,50% | 1,99% a.m. | R$ 0,10 |
| Mastercard | Débito | 1,55% | — | R$ 0,08 |
| Elo | Crédito à vista | 2,30% | 2,10% a.m. | R$ 0,10 |
| Elo | Crédito 2–6x | 3,10% | 2,10% a.m. | R$ 0,10 |
| Elo | Crédito 7–12x | 3,70% | 2,10% a.m. | R$ 0,10 |
| Elo | Débito | 1,65% | — | R$ 0,08 |
| PIX | QR Code/Cobrança | 0,99% | — | R$ 0,05 |

O campo MDR é editável inline (`<input defaultValue>` com `onFocus`/`onBlur`). "Salvar alterações" ainda não persiste (mock).

### Layout

Acordeão por arranjo. Cada scheme tem: pill colorida com sigla (3 letras) + nome + contagem de produtos + chevron. Ao expandir, exibe `<table>` com thead e tbody.

Banner informativo: "As taxas abaixo refletem o pricing vigente para novos merchants. Alterações entram em vigor no próximo ciclo de faturamento."
