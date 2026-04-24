import type { Meta, StoryObj } from '@storybook/react'
import Tag from './Tag'

const meta: Meta<typeof Tag> = {
  title: 'Design System/Atoms/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: [
        'Aprovado', 'Pago', 'Pendente', 'Recusado', 'Cancelado',
        'Em análise', 'Ativo', 'Suspenso', 'Inativo',
        'Antecipado', 'Chargeback', 'Erro', 'Info',
      ],
      description: 'Status que define cor e texto padrão do badge',
    },
    label: {
      control: 'text',
      description: 'Texto alternativo (sobrescreve o status key)',
    },
  },
  parameters: {
    backgrounds: { default: 'white' },
  },
}

export default meta
type Story = StoryObj<typeof Tag>

// --- Estados individuais ---

export const Aprovado: Story = { args: { status: 'Aprovado' } }
export const Pago: Story = { args: { status: 'Pago' } }
export const Pendente: Story = { args: { status: 'Pendente' } }
export const Recusado: Story = { args: { status: 'Recusado' } }
export const Cancelado: Story = { args: { status: 'Cancelado' } }
export const EmAnalise: Story = { name: 'Em análise', args: { status: 'Em análise' } }
export const Ativo: Story = { args: { status: 'Ativo' } }
export const Suspenso: Story = { args: { status: 'Suspenso' } }
export const Inativo: Story = { args: { status: 'Inativo' } }
export const Antecipado: Story = { args: { status: 'Antecipado' } }
export const Chargeback: Story = { args: { status: 'Chargeback' } }
export const Erro: Story = { args: { status: 'Erro' } }
export const Info: Story = { args: { status: 'Info' } }

// --- Galeria completa ---

export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, padding: 16, background: '#fff' }}>
      {[
        'Aprovado', 'Pago', 'Ativo',
        'Pendente', 'Suspenso', 'Antecipado',
        'Recusado', 'Chargeback', 'Erro',
        'Cancelado', 'Inativo',
        'Em análise', 'Info',
      ].map((s) => (
        <Tag key={s} status={s} />
      ))}
    </div>
  ),
}

// --- Uso real — tabela de cobranças ---

export const UsoRealTabela: Story = {
  name: 'Uso real — linha de tabela',
  render: () => (
    <table style={{ borderCollapse: 'collapse', fontFamily: 'Roboto, sans-serif', fontSize: 14, width: '100%' }}>
      <thead>
        <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
          {['ID', 'Merchant', 'Valor', 'Status'].map((h) => (
            <th key={h} style={{ padding: '8px 16px', textAlign: 'left', color: 'rgba(0,0,0,0.45)', fontWeight: 500, fontSize: 12 }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[
          { id: '#001', merchant: 'Loja Alpha', value: 'R$ 1.200,00', status: 'Pago' },
          { id: '#002', merchant: 'Restaurante Beta', value: 'R$ 340,00', status: 'Pendente' },
          { id: '#003', merchant: 'Posto Gama', value: 'R$ 890,00', status: 'Chargeback' },
          { id: '#004', merchant: 'Farmácia Delta', value: 'R$ 56,00', status: 'Cancelado' },
          { id: '#005', merchant: 'Supermercado Épsilon', value: 'R$ 2.100,00', status: 'Antecipado' },
        ].map((row) => (
          <tr key={row.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
            <td style={{ padding: '12px 16px', color: 'rgba(0,0,0,0.65)' }}>{row.id}</td>
            <td style={{ padding: '12px 16px', color: 'rgba(0,0,0,0.85)' }}>{row.merchant}</td>
            <td style={{ padding: '12px 16px', color: 'rgba(0,0,0,0.85)' }}>{row.value}</td>
            <td style={{ padding: '12px 16px' }}><Tag status={row.status} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
}

// --- Label customizado ---

export const LabelCustomizado: Story = {
  name: 'Label customizado',
  args: { status: 'Pago', label: 'Liquidado' },
}
