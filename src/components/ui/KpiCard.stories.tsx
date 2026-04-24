import type { Meta, StoryObj } from '@storybook/react'
import KpiCard, { type KpiVariant } from './KpiCard'

const meta: Meta<typeof KpiCard> = {
  title: 'Design System/Molecules/KpiCard',
  component: KpiCard,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'orange', 'error', 'success', 'warning', 'neutral'],
      description: 'Esquema de cor semântico do card',
    },
    label: {
      control: 'text',
      description: 'Label acima do valor (12px, cinza)',
    },
    value: {
      control: 'text',
      description: 'Valor principal em destaque (24px bold)',
    },
    subLabel: {
      control: 'text',
      description: 'Subtítulo abaixo do valor (12px, cinza claro)',
    },
    tooltip: {
      control: 'text',
      description: 'Tooltip de contexto exibido no ícone info',
    },
    loading: {
      control: 'boolean',
      description: 'Estado de carregamento (skeleton no valor)',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 24, background: '#F2F4F8', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof KpiCard>

// --- Default controlável ---
export const Default: Story = {
  args: {
    label: 'Total processado',
    value: 'R$ 124.500',
    subLabel: 'Últimos 30 dias',
    variant: 'neutral',
  },
}

// --- Todas as variantes semânticas ---
export const TodasVariantes: Story = {
  name: 'Todas as variantes de cor',
  render: () => {
    const cards: Array<{ variant: KpiVariant; label: string; value: string; subLabel?: string }> = [
      { variant: 'info',    label: 'Volume total',      value: 'R$ 124.500',  subLabel: '↑ 12% vs mês anterior' },
      { variant: 'success', label: 'Aprovadas',          value: '2.341',       subLabel: '94% de aprovação' },
      { variant: 'warning', label: 'Pendentes',          value: '87',          subLabel: 'Aguardando liquidação' },
      { variant: 'error',   label: 'Chargebacks',        value: '14',          subLabel: '0,6% do total' },
      { variant: 'orange',  label: 'Antecipações',       value: 'R$ 18.200',   subLabel: '3 merchants' },
      { variant: 'neutral', label: 'Ticket médio',       value: 'R$ 53,20',    subLabel: 'Por transação' },
    ]
    return (
      <>
        {cards.map((c) => (
          <KpiCard key={c.variant} {...c} />
        ))}
      </>
    )
  },
}

// --- Estado de loading ---
export const Loading: Story = {
  name: 'Estado loading (skeleton)',
  render: () => (
    <>
      <KpiCard label="Volume total"  value="—" variant="info"    loading />
      <KpiCard label="Aprovadas"     value="—" variant="success" loading />
      <KpiCard label="Chargebacks"   value="—" variant="error"   loading />
    </>
  ),
}

// --- Com tooltip ---
export const ComTooltip: Story = {
  name: 'Com tooltip de contexto',
  args: {
    label: 'Taxa de aprovação',
    value: '94,3%',
    subLabel: 'Últimos 7 dias',
    variant: 'success',
    tooltip: 'Percentual de transações aprovadas sobre o total enviado ao adquirente no período selecionado.',
  },
}

// --- Variante info (primária) isolada ---
export const InfoCard: Story = {
  name: 'Info — volume financeiro',
  args: {
    label: 'Volume processado',
    value: 'R$ 1.240.500',
    subLabel: '↑ 8,4% vs mês anterior',
    variant: 'info',
  },
}

export const SuccessCard: Story = {
  name: 'Success — aprovações',
  args: {
    label: 'Aprovadas',
    value: '23.412',
    subLabel: '98,2% de aprovação',
    variant: 'success',
  },
}

export const ErrorCard: Story = {
  name: 'Error — chargebacks',
  args: {
    label: 'Chargebacks',
    value: '142',
    subLabel: '0,6% do total',
    variant: 'error',
    tooltip: 'Total de chargebacks no período. Acima de 1% aciona alerta automático.',
  },
}

// --- Grid de dashboard ---
export const GridDashboard: Story = {
  name: 'Uso real — grid do dashboard',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, width: '100%' }}>
      <KpiCard label="Volume total"    value="R$ 1.240.500" subLabel="↑ 8,4% vs mês anterior" variant="info" />
      <KpiCard label="Aprovadas"       value="23.412"       subLabel="98,2% de aprovação"       variant="success" />
      <KpiCard label="Pendentes"       value="341"          subLabel="Aguardando liquidação"     variant="warning" />
      <KpiCard label="Chargebacks"     value="142"          subLabel="0,6% do total"             variant="error"
        tooltip="Total de chargebacks no período." />
      <KpiCard label="Antecipações"    value="R$ 98.000"    subLabel="12 merchants"              variant="orange" />
      <KpiCard label="Ticket médio"    value="R$ 52,90"     subLabel="Por transação"             variant="neutral" />
    </div>
  ),
  decorators: [
    (Story) => (
      <div style={{ padding: 24, background: '#F2F4F8', width: '720px' }}>
        <Story />
      </div>
    ),
  ],
}
