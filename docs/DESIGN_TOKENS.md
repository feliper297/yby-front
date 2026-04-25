# DESIGN_TOKENS — Yby Front

Tokens extraídos do código-fonte real (`src/lib/antd-theme.ts`, `tailwind.config.ts`, componentes). Este arquivo é a fonte única de verdade para valores visuais. Todos os tokens foram copiados do source — nada foi inventado.

---

## Paleta de Cores

### Cores primárias (Ant Design `colorPrimary`)

| Token | Hex / Valor | Uso semântico | Exemplo de componente |
|-------|-------------|---------------|----------------------|
| `accent` / `colorPrimary` | `#1890FF` | Ação principal, links, foco, tab ativa | Button primary, tab ativa no PageHeader, border de input em foco, PeriodPill hover |
| `accent-hover` / `colorLinkHover` | `#40A9FF` | Hover de primário | Button primary hover |
| `accent-down` | `#096DD9` | Pressed / active state | — |
| `cta` | `#0F62FE` | CTA alternativo (reservado) | — |
| `cta-hover` | `#0043CE` | Hover do CTA alternativo | — |

### Cores semânticas

| Token | Hex | Uso | Background pair | Border pair |
|-------|-----|-----|----------------|-------------|
| `success` / `colorSuccess` | `#52C41A` | Valores positivos, status de sucesso | `success-bg` `#F6FFED` | `success-border` `#B7EB8F` |
| `warning` / `colorWarning` | `#FAAD14` | Alertas, valores pendentes | `warning-bg` `#FFFBE6` | `warning-border` `#FFE58F` |
| `error` / `colorError` | `#FF4D4F` | Erros, valores negativos, saídas | `error-bg` `#FFF1F0` | `error-border` `#FFCCC7` |
| `info` / `colorInfo` | `#1890FF` | Informações, valores informativos | `info-bg` `#E6F7FF` | `info-border` `#91D5FF` |
| `orange` | `#FA8C16` | Antecipações, valores de atenção intermediária | `orange-bg` `#FFF7E6` | `orange-border` `#FFD591` |

### Cores de texto

| Token | Valor | Uso |
|-------|-------|-----|
| `text-primary` / `colorTextBase` | `rgba(0,0,0,0.85)` | Títulos, valores principais, body |
| `text-secondary` / `colorTextSecondary` | `rgba(0,0,0,0.65)` | Labels, texto secundário, breadcrumb |
| `text-tertiary` / `colorTextTertiary` | `rgba(0,0,0,0.45)` | Placeholders, hints, labels de KPI |
| `text-disabled` | `rgba(0,0,0,0.25)` | Campos desabilitados, texto inativo |

### Cores de superfície e layout

| Token | Valor | Uso |
|-------|-------|-----|
| `canvas` / `colorBgLayout` | `#F2F4F8` | Background raiz da aplicação (`AppShell`) |
| `surface` / `colorBgBase` | `#FFFFFF` | Cards, painéis, inputs, sidebar, header |
| `border-default` / `colorBorder` | `#D9D9D9` | Bordas padrão de inputs, buttons secondary |
| `border-split` / `colorSplit` | `#F0F0F0` | Divisores internos de cards, separadores de seção |

### Cores de status no `Tag` (STATUS_MAP)

| Grupo | Background | Cor texto | Borda |
|-------|-----------|-----------|-------|
| Sucesso (Polar Green) | `#F6FFED` | `#237804` | `#D9F7BE` |
| Warning padrão (Calendula Gold) | `#FFFBE6` | `#874D00` | `#FFE58F` |
| Warning antecipação (Orange) | `#FFF7E6` | `#874D00` | `#FFD591` |
| Erro (Dust Red) | `#FFF1F0` | `#820014` | `#FFCCC7` |
| Neutro | `#F5F5F5` | `rgba(0,0,0,0.45)` | `#D9D9D9` |
| Info (DayBreak Blue) | `#E6F7FF` | `#003A8C` | `#91D5FF` |

### Cores especiais

| Valor | Uso | Componente |
|-------|-----|-----------|
| `#722ED1` | Avatar do usuário (GlobalHeader) e Rolling Reserve highlight | GlobalHeader, agenda/pagamentos |
| `#52C41A` | Valores positivos (entradas, líquido a receber) | Extrato, Agenda |
| `#F5222D` | MDR retido em tabelas (vermelho mais saturado) | Agenda/Por parcela |
| `#237804` | Cor de texto em tags de sucesso | Tag component |

---

## Tipografia

### Família de fontes

```ts
fontFamily: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif"
fontMono: "'Roboto Mono', Menlo, Monaco, 'Fira Code', Consolas, monospace"
```

`Roboto` é a fonte padrão de toda a aplicação. `Roboto Mono` é usada para dados numéricos estruturados (NSU, CNPJ, saldo, contas bancárias).

### Escala de tamanhos (extraída de `tailwind.config.ts`)

| Token | Font-size | Line-height | Uso contextual |
|-------|-----------|-------------|---------------|
| `xs` | 11px | 16px | Tooltips, badges de status em pills, sub-notas de KPI |
| `sm` | 12px | 20px | Tags/badges, labels de KPI, breadcrumb, datas em tabelas, Roboto Mono em IDs |
| `base` | 14px | 22px | Body padrão, colunas de tabela, inputs, buttons `md`, labels de formulário |
| `md` | 16px | 24px | Títulos de seção em cards (`DataTable title`), valores em drawers |
| `lg` | 20px | 28px | Títulos de página (`PageHeader h1`) |
| `xl` | 24px | 32px | Valores principais de KpiCard |
| `2xl` | 30px | 40px | Valor principal do Dashboard KpiCard local |
| `metric` | 38px | 46px | Reservado para métricas de destaque (não usado ainda) |

### Font-weights em uso

| Peso | Uso |
|------|-----|
| 400 | Body padrão, colunas de tabela, labels, Button `md` |
| 500 | Labels de KpiCard, badge de notificação, separadores de seção, filtro ativo |
| 600 | Título de `PageHeader` (20px/600), título de `DataTable` (16px/600), header de drawer |
| 700 | Valor de `KpiCard` (24px/700), total geral de tabelas, valores críticos em verde/laranja |

### Usos específicos documentados no source

| Componente / Contexto | Font-size | Font-weight | Line-height | Color |
|----------------------|-----------|-------------|-------------|-------|
| PageHeader `h1` | 20px | 600 | 28px | `rgba(0,0,0,0.85)` |
| PageHeader tab label | 13px | 400 (normal) / 500 (ativo) | — | `#1890FF` (ativo) / `rgba(0,0,0,0.65)` |
| PageHeader breadcrumb | 12px | 400 | — | `rgba(0,0,0,0.45)` |
| DataTable title | 16px | 600 | — | `rgba(0,0,0,0.85)` |
| DataTable header cell | 14px | 400 | — | `rgba(0,0,0,0.85)` |
| DataTable search input | 14px | 400 | — | `rgba(0,0,0,0.85)` |
| DataTable FilterPill | 14px | 400 (inativo) / 500 (ativo) | — | `#1890FF` (ativo) |
| Input label | 14px | 400 | 22px | `rgba(0,0,0,0.85)` |
| Input value | 14px | 400 | 22px | `rgba(0,0,0,0.85)` |
| Input hint/error | 12px | 400 | 20px | `rgba(0,0,0,0.45)` / `#FF4D4F` |
| Tag text | 12px | 400 | 20px | definido por variante |
| KpiCard label | 12px | 500 | 20px | `rgba(0,0,0,0.45)` |
| KpiCard value | 24px | 700 | 32px | definido por variante |
| KpiCard subLabel | 12px | 400 | 20px | `rgba(0,0,0,0.45)` |
| GlobalHeader logo badge | 12px | 500 | — | `#1890FF` |
| GlobalHeader username | 13px | 400 | — | `rgba(0,0,0,0.65)` |
| Sidebar nav item | 13px | 400 (inativo) / 500 (ativo) | — | `rgba(0,0,0,0.65)` / `#1890FF` |
| Tooltip text | 11px | 400 | 16px | `#fff` |
| Button `sm` | 12px | 400 | — | definido por variante |
| Button `md` | 14px | 400 | — | definido por variante |
| Button `lg` | 16px | 400 | — | definido por variante |
| Badge count | 10px | 500 | — | `#fff` |
| Agenda KPI label | 12px | 500 | — | `rgba(0,0,0,0.65)` |
| Agenda KPI value | 20px | 700 | — | definido por variante |
| Agenda KPI sub | 11px | 400 | — | `rgba(0,0,0,0.45)` |
| NSU / CNPJ / Conta | 11px–12px | 400 | — | `rgba(0,0,0,0.45)–0.65` (Roboto Mono) |

---

## Espaçamentos

### Escala base (Tailwind extend, 4px grid)

| Token | Valor | Uso frequente |
|-------|-------|---------------|
| `1` | 4px | gap entre ícone e texto em Tag, gap entre ícone e label em Sidebar |
| `2` | 8px | gap em Button (ícone+texto), gap interno em badges, gap em toolbar FilterPills |
| `3` | 12px | padding de card de domicílio bancário, padding interno de KpiCard `(14px 18px)` |
| `4` | 16px | padding lateral de KPI row, padding de toolbar DataTable `(12px 21px)`, gap entre KpiCards |
| `5` | 24px | padding de conteúdo de página (todas as páginas usam `padding: 24px`), gap horizontal entre painéis |
| `6` | 32px | — |
| `7` | 48px | GlobalHeader height |
| `8` | 64px | — |

### Padding recorrente por contexto

| Contexto | Valor |
|----------|-------|
| Conteúdo de página (wrapper externo) | `padding: 24px` |
| PageHeader título | `padding: 8px 24px 16px` (sem tabs) / `8px 24px 0` (com tabs) |
| PageHeader breadcrumb | `padding: 12px 24px 0` |
| DataTable title row | `padding: 16px 24px` |
| DataTable toolbar | `padding: 12px 21px` |
| DataTable body (wrapper interno) | `padding: 0 21px` |
| KpiCard | `padding: 14px 18px` |
| GlobalHeader | `padding: 0 24px` |
| Sidebar item | `padding: 0 16px` (aberto) / `0 14px` (fechado) |
| Drawer header | `padding: 16px 24px` |
| Drawer body | `padding: 24px` |
| Drawer footer | `padding: 14px 24px` |
| Login card | `padding: 36px` |

### Gap recorrente

| Contexto | Valor |
|----------|-------|
| Gap entre KpiCards | `16px` |
| Gap entre painéis laterais (Agenda calendário) | `24px` |
| Gap vertical entre seções de página | `16px` (financeiro) / `24px` (dashboard) |
| Gap entre ícone e texto em botões | `6px` |
| Gap entre label e valor em rows de formulário | `4px` |
| Gap entre elementos da toolbar DataTable | `4px` |

---

## Borders

### Border-radius

| Token | Valor | Uso |
|-------|-------|-----|
| `xs` / `borderRadius` | `2px` | **Padrão de toda a aplicação** — cards, inputs, buttons, tags, badges, DataTable. Vem do Ant Design `borderRadius: 2` no `tupiTheme`. |
| `sm` / `borderRadiusSM` | `2px` | Idem (ambos 2px no tema atual) |
| `md` / `borderRadiusLG` | `4px` | Tooltips, dropdowns de FilterPill e PeriodPill |
| `lg` | `8px` | Reservado (não usado nos componentes atuais) |
| Circle | `50%` | Avatares (GlobalHeader), dots de status, Badge `dot` |
| Pill | `99px` | Badge contador, botões de período no calendário |
| `12px` | — | Botões de toggle adquirente no calendário |

### Border-style recorrente

| Estilo | Valor | Contexto |
|--------|-------|---------|
| Padrão de card | `1px solid rgba(0,0,0,0.06)` | DataTable container, painéis brancos de conteúdo |
| Padrão de input/button | `1px solid #D9D9D9` | Input normal, Button secondary, PeriodPill |
| Foco/ativo | `1px solid #1890FF` | Input focus, Button secondary hover |
| Erro | `1px solid #FF4D4F` | Input error state |
| Separador | `1px solid #F0F0F0` | Divisores internos (drawer, DataTable header, card sections) |
| Tab ativa | `2px solid #1890FF` (bottom) | PageHeader tab ativa |
| Sidebar item ativo | `3px solid #1890FF` (right) | Sidebar nav item ativo |
| Borda info (KPI) | `1px solid #91D5FF` | KpiCard info, banners de info |
| Borda success | `1px solid #B7EB8F` | KpiCard success, barra de totais |
| Borda warning | `1px solid #FFE58F` | KpiCard warning |
| Borda error | `1px solid #FFCCC7` | KpiCard error |
| Borda orange | `1px solid #FFD591` | KpiCard orange |
| Borda Tag success | `1px solid #D9F7BE` | Tag Aprovado/Pago/Ativo/etc |

---

## Shadows

| Token | Valor | Uso |
|-------|-------|-----|
| `card` / `boxShadow` | `0 1px 2px rgba(0,0,0,0.03), 0 1px 6px rgba(0,0,0,0.02)` | Cards principais (tema Ant Design) |
| `raised` / `boxShadowSecondary` | `0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)` | Cards elevados (dropdowns) |
| `sidebar` | `2px 0 8px rgba(0,0,0,0.08)` | Sidebar lateral |
| `overlay` | `0 3px 6px -4px rgba(0,0,0,0.12), 0 6px 16px rgba(0,0,0,0.08), 0 9px 28px 8px rgba(0,0,0,0.05)` | Modais, drawers (reservado) |
| GlobalHeader | `0 1px 4px rgba(0,0,0,0.08)` | Barra de topo |
| Login card | `0 2px 8px rgba(0,0,0,0.08)` | Card de login |
| Drawer | `-4px 0 16px rgba(0,0,0,0.15)` | Painéis de detalhe laterais |
| FilterPill dropdown | `0 6px 16px rgba(0,0,0,0.08)` | Dropdown de filtros |
| Tooltip | `0 2px 8px rgba(0,0,0,0.2)` | Tooltip component |
| DataTable | `0 2px 0 rgba(0,0,0,0.02)` | Tabela (sutil) |
| Input focus glow | `0 0 0 2px rgba(24,144,255,0.2)` | Input em foco |
| Input error glow | `0 0 0 2px rgba(255,77,79,0.2)` | Input com erro em foco |

---

## Opacidades (rgba recorrentes)

| Valor | Uso semântico | Componente típico |
|-------|---------------|-------------------|
| `rgba(0,0,0,0.85)` | Texto primário | Títulos, valores de tabela |
| `rgba(0,0,0,0.65)` | Texto secundário | Sidebar labels, GlobalHeader username, datas |
| `rgba(0,0,0,0.45)` | Texto terciário | Labels de KPI, breadcrumb, placeholders |
| `rgba(0,0,0,0.35)` | Ícones inativos | Ícones em inputs, Sidebar ícones inativos |
| `rgba(0,0,0,0.25)` | Texto desabilitado / inativo | Input disabled, valores zero em tabelas |
| `rgba(0,0,0,0.06)` | Borda de card suave | DataTable container |
| `rgba(0,0,0,0.02)` | Shadow de card (mais suave) | DataTable shadow |
| `rgba(24,144,255,0.08)` | Background de item ativo/hover na sidebar | Sidebar nav item |
| `rgba(24,144,255,0.1)` | Background de badge info no header | GlobalHeader badge "Sub-adquirente" |
| `rgba(24,144,255,0.2)` | Glow de foco em input | Input focus shadow |
| `rgba(255,77,79,0.2)` | Glow de erro em input | Input error shadow |
| `rgba(0,0,0,0.45)` / overlay | Background de drawer/modal | Drawer backdrop |

---

## Transições

| Valor | Uso |
|-------|-----|
| `all 0.15s` | Buttons (hover), Input (border/shadow) |
| `width 0.25s cubic-bezier(0.4,0,0.2,1)` | Search expand no GlobalHeader |
| `width 0.2s cubic-bezier(0.645,0.045,0.355,1)` | Sidebar collapse/expand |
| `background 0.2s` | Sidebar item hover |
| `color 0.15s` | PageHeader tab, Sidebar item |
| `left 0.2s` | Toggle switch thumb (AgendaPage agrupado) |
