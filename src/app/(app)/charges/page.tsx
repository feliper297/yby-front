'use client'

import { useState } from 'react'
import PageHeader from '@/components/shared/PageHeader'
import Tag from '@/components/shared/Tag'
import DataTable, { type ColumnType } from '@/components/ui/DataTable'

const TRANSACTIONS = [
  { id:'#TXN-9001', merchant:'Mercado Livre',   date:'22/04/2026', value:'R$ 3.450,00', method:'Visa',       installments:'1x',  status:'Aprovado'   },
  { id:'#TXN-9002', merchant:'Amazon Brasil',   date:'22/04/2026', value:'R$ 1.280,90', method:'Mastercard', installments:'3x',  status:'Aprovado'   },
  { id:'#TXN-9003', merchant:'Rappi Brasil',    date:'21/04/2026', value:'R$ 87,50',    method:'PIX',        installments:'1x',  status:'Aprovado'   },
  { id:'#TXN-9004', merchant:'iFood Ltda',      date:'21/04/2026', value:'R$ 430,00',   method:'Elo',        installments:'2x',  status:'Em análise' },
  { id:'#TXN-9005', merchant:'Shopee Brasil',   date:'20/04/2026', value:'R$ 760,00',   method:'Mastercard', installments:'6x',  status:'Recusado'   },
  { id:'#TXN-9006', merchant:'Magazine Luiza',  date:'20/04/2026', value:'R$ 2.100,00', method:'Visa',       installments:'12x', status:'Aprovado'   },
  { id:'#TXN-9007', merchant:'Americanas S.A.', date:'19/04/2026', value:'R$ 999,00',   method:'Visa',       installments:'1x',  status:'Pendente'   },
]

type Transaction = typeof TRANSACTIONS[0]

const ALL_STATUSES = ['Aprovado', 'Pendente', 'Em análise', 'Recusado']
const ALL_METHODS  = ['Visa', 'Mastercard', 'Elo', 'PIX', 'Boleto']

export default function ChargesPage() {
  const [search, setSearch]           = useState('')
  const [statusFilter, setStatusFilter] = useState<string[]>(ALL_STATUSES)
  const [methodFilter, setMethodFilter] = useState<string[]>(ALL_METHODS)

  const filtered = TRANSACTIONS.filter(r =>
    statusFilter.includes(r.status) &&
    methodFilter.includes(r.method) &&
    (!search || r.merchant.toLowerCase().includes(search.toLowerCase()) || r.id.includes(search))
  )

  const columns: ColumnType<Transaction>[] = [
    {
      title: 'ID', dataIndex: 'id', key: 'id',
      render: v => <span style={{ color: '#1890FF', fontFamily: 'Roboto Mono', fontSize: 12 }}>{v}</span>,
    },
    {
      title: 'Merchant', dataIndex: 'merchant', key: 'merchant',
      sorter: (a, b) => a.merchant.localeCompare(b.merchant),
    },
    {
      title: 'Data', dataIndex: 'date', key: 'date', width: 110,
      render: v => <span style={{ color: 'rgba(0,0,0,0.65)' }}>{v}</span>,
    },
    {
      title: 'Valor', dataIndex: 'value', key: 'value',
      render: v => <span style={{ fontWeight: 500, color: 'rgba(0,0,0,0.85)' }}>{v}</span>,
    },
    {
      title: 'Método', dataIndex: 'method', key: 'method', width: 120,
      render: v => <span style={{ color: 'rgba(0,0,0,0.65)' }}>{v}</span>,
    },
    {
      title: 'Parcelas', dataIndex: 'installments', key: 'installments', width: 90,
      render: v => <span style={{ color: 'rgba(0,0,0,0.65)' }}>{v}</span>,
    },
    {
      title: 'Status', dataIndex: 'status', key: 'status', width: 110,
      render: v => <Tag status={v} />,
    },
  ]

  return (
    <div style={{ flex:1, overflow:'auto', display:'flex', flexDirection:'column' }}>
      <PageHeader title="Cobranças" breadcrumb="Sub-adquirente / Cobranças" onBack={() => {}} />

      <div style={{ padding:24 }}>
        <DataTable<Transaction>
          columns={columns}
          dataSource={filtered}
          rowKey="id"
          searchPlaceholder="Buscar merchant ou transação..."
          searchValue={search}
          onSearch={setSearch}
          filters={[
            {
              label: 'Status',
              options: ALL_STATUSES.map(s => ({ label: s, value: s })),
              value: statusFilter,
              onChange: setStatusFilter,
            },
            {
              label: 'Método',
              options: ALL_METHODS.map(m => ({ label: m, value: m })),
              value: methodFilter,
              onChange: setMethodFilter,
            },
          ]}
          onExport={() => {}}
          pageSize={10}
        />
      </div>
    </div>
  )
}
