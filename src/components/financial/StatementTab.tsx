'use client'

import { Table, Tag } from 'antd'
import KpiCard from '@/components/ui/KpiCard'

const data = [
  { key: '1', data: '24/04/2026', descricao: 'Liquidação Cielo', tipo: 'Crédito', valor: 'R$ 46.754', saldo: 'R$ 312.430' },
  { key: '2', data: '24/04/2026', descricao: 'Liquidação Rede', tipo: 'Crédito', valor: 'R$ 69.937', saldo: 'R$ 382.367' },
  { key: '3', data: '23/04/2026', descricao: 'Antecipação — Restaurante Bom Sabor', tipo: 'Débito', valor: '− R$ 24.000', saldo: 'R$ 312.430' },
  { key: '4', data: '23/04/2026', descricao: 'Liquidação Adiq', tipo: 'Crédito', valor: 'R$ 26.355', saldo: 'R$ 336.430' },
  { key: '5', data: '23/04/2026', descricao: 'Liquidação Getnet', tipo: 'Crédito', valor: 'R$ 40.371', saldo: 'R$ 310.075' },
  { key: '6', data: '22/04/2026', descricao: 'Tarifa mensal', tipo: 'Débito', valor: '− R$ 120', saldo: 'R$ 269.704' },
  { key: '7', data: '22/04/2026', descricao: 'Liquidação Cielo', tipo: 'Crédito', valor: 'R$ 93.896', saldo: 'R$ 269.824' },
]

const columns = [
  { title: 'Data', dataIndex: 'data', key: 'data', width: 120 },
  { title: 'Descrição', dataIndex: 'descricao', key: 'descricao' },
  { title: 'Tipo', dataIndex: 'tipo', key: 'tipo', render: (v: string) => <Tag color={v === 'Crédito' ? 'success' : 'error'}>{v}</Tag> },
  {
    title: 'Valor', dataIndex: 'valor', key: 'valor', align: 'right' as const,
    render: (v: string) => <span className="font-semibold" style={{ color: v.startsWith('−') ? '#FF4D4F' : '#52C41A' }}>{v}</span>
  },
  {
    title: 'Saldo', dataIndex: 'saldo', key: 'saldo', align: 'right' as const,
    render: (v: string) => <span className="font-mono text-xs font-medium">{v}</span>
  },
]

const kpis = [
  { label: 'Saldo atual', value: 'R$ 382.367', variant: 'success' as const },
  { label: 'Entradas (mês)', value: 'R$ 1.287.420', variant: 'info' as const },
  { label: 'Saídas (mês)', value: 'R$ 905.053', variant: 'error' as const },
  { label: 'Variação líquida', value: '+R$ 382.367', variant: 'neutral' as const },
]

export default function StatementTab() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {kpis.map(k => <KpiCard key={k.label} {...k} />)}
      </div>

      <div className="bg-white rounded-sm border border-[#f0f0f0]" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
        <div className="px-4 py-3 border-b border-[#f0f0f0]">
          <h3 className="text-sm font-medium" style={{ color: 'rgba(0,0,0,0.85)' }}>Extrato de movimentações</h3>
        </div>
        <Table columns={columns} dataSource={data} size="small" pagination={{ pageSize: 20 }} />
      </div>
    </div>
  )
}
