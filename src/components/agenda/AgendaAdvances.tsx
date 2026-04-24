'use client'

import { Table, Tag } from 'antd'
import KpiCard from '@/components/ui/KpiCard'

const data = [
  { key: '1', id: 'ANT-0041', merchant: 'Restaurante Bom Sabor', valor: 'R$ 24.000', taxa: '2,8%/m', juros: 'R$ 672', vencimento: '15/05/2026', aRecuperar: 'R$ 24.672', status: 'A recuperar' },
  { key: '2', id: 'ANT-0039', merchant: 'Farmácia Saúde Total', valor: 'R$ 18.500', taxa: '2,8%/m', juros: 'R$ 518', vencimento: '10/05/2026', aRecuperar: 'R$ 19.018', status: 'A recuperar' },
  { key: '3', id: 'ANT-0035', merchant: 'Eletrônicos Max', valor: 'R$ 45.000', taxa: '2,5%/m', juros: 'R$ 1.125', vencimento: '30/04/2026', aRecuperar: 'R$ 0', status: 'Recuperado' },
  { key: '4', id: 'ANT-0033', merchant: 'Mercado Boa Vista', valor: 'R$ 62.300', taxa: '2,5%/m', juros: 'R$ 1.558', vencimento: '28/04/2026', aRecuperar: 'R$ 18.900', status: 'A recuperar' },
  { key: '5', id: 'ANT-0030', merchant: 'Auto Peças Centro', valor: 'R$ 11.200', taxa: '3,0%/m', juros: 'R$ 336', vencimento: '20/04/2026', aRecuperar: 'R$ 0', status: 'Recuperado' },
]

const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id', render: (v: string) => <span className="font-mono text-xs text-[#1890FF]">{v}</span> },
  { title: 'Data', key: 'data', render: () => '24/04/2026', width: 110 },
  { title: 'Merchant (EC)', dataIndex: 'merchant', key: 'merchant' },
  { title: 'Valor antecipado', dataIndex: 'valor', key: 'valor', align: 'right' as const, render: (v: string) => <span className="font-semibold text-[#FA8C16]">{v}</span> },
  { title: 'Taxa cobrada', dataIndex: 'taxa', key: 'taxa', align: 'right' as const },
  { title: 'Juros recebidos', dataIndex: 'juros', key: 'juros', align: 'right' as const, render: (v: string) => <span className="text-[#52C41A]">{v}</span> },
  { title: 'Vencimento', dataIndex: 'vencimento', key: 'vencimento' },
  { title: 'A recuperar', dataIndex: 'aRecuperar', key: 'aRecuperar', align: 'right' as const, render: (v: string) => <span className="font-semibold">{v}</span> },
  { title: 'Status', dataIndex: 'status', key: 'status', render: (v: string) => <Tag color={v === 'Recuperado' ? 'success' : 'warning'}>{v}</Tag> },
]

const kpis = [
  { label: 'Total antecipado', value: 'R$ 161.000', variant: 'orange' as const, tooltip: 'Soma dos valores antecipados a merchants (ECs) ativos' },
  { label: 'Juros a receber', value: 'R$ 4.209', variant: 'success' as const },
  { label: 'A recuperar', value: 'R$ 62.590', variant: 'warning' as const, tooltip: 'Saldo ainda não recuperado dos adquirentes via liquidação' },
  { label: 'Recuperado', value: 'R$ 56.200', variant: 'neutral' as const },
]

export default function AgendaAdvances() {
  return (
    <div>
      {/* Info banner */}
      <div className="mb-4 flex items-start gap-3 rounded-sm px-4 py-3" style={{ background: '#E6F7FF', border: '1px solid #91D5FF' }}>
        <p className="text-sm m-0" style={{ color: 'rgba(0,0,0,0.85)' }}>
          <span className="font-medium">Antecipações oferecidas a merchants:</span>{' '}
          O sub-adquirente adianta o recebível do merchant e recupera o valor quando o adquirente liquidar. Esta visão é informacional.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        {kpis.map(k => <KpiCard key={k.label} {...k} />)}
      </div>

      <div className="bg-white rounded-sm border border-[#f0f0f0]" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
        <Table columns={columns} dataSource={data} size="small" pagination={{ pageSize: 10 }} />
        <div className="flex justify-end px-4 py-3 border-t border-[#f0f0f0]" style={{ background: '#F6FFED' }}>
          <div className="flex gap-8">
            <div className="text-right"><div className="text-xs text-[rgba(0,0,0,0.65)]">Total antecipado</div><div className="text-sm font-bold text-[#FA8C16]">R$ 161.000</div></div>
            <div className="text-right"><div className="text-xs text-[rgba(0,0,0,0.65)]">Juros a receber</div><div className="text-sm font-bold text-[#52C41A]">R$ 4.209</div></div>
            <div className="text-right"><div className="text-xs text-[rgba(0,0,0,0.65)]">A recuperar</div><div className="text-sm font-bold text-[#FAAD14]">R$ 62.590</div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
