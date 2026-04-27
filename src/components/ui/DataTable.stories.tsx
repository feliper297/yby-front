import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import DataTable, { PERIOD_OPTIONS, type ColumnType } from './DataTable'

const meta: Meta<typeof DataTable> = {
  title: 'Design System/Organisms/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 24, background: '#F2F4F8' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof DataTable>

type SampleRow = { key: string; nome: string; status: string; valor: string; data: string }

const columns: ColumnType<SampleRow>[] = [
  { title: 'Nome',   dataIndex: 'nome',   key: 'nome' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
  { title: 'Valor',  dataIndex: 'valor',  key: 'valor' },
  { title: 'Data',   dataIndex: 'data',   key: 'data' },
]

const dataSource: SampleRow[] = [
  { key: '1', nome: 'Merchant Alpha',   status: 'Aprovado',  valor: 'R$ 1.200,00', data: '27/04/2026' },
  { key: '2', nome: 'Merchant Beta',    status: 'Pendente',  valor: 'R$ 850,00',   data: '26/04/2026' },
  { key: '3', nome: 'Merchant Gamma',   status: 'Recusado',  valor: 'R$ 430,00',   data: '25/04/2026' },
  { key: '4', nome: 'Merchant Delta',   status: 'Aprovado',  valor: 'R$ 2.100,00', data: '24/04/2026' },
  { key: '5', nome: 'Merchant Epsilon', status: 'Aprovado',  valor: 'R$ 670,00',   data: '23/04/2026' },
]

export const Simples: Story = {
  name: 'Simples — sem toolbar',
  render: () => (
    <DataTable columns={columns} dataSource={dataSource} rowKey="key" />
  ),
}

export const ComTitulo: Story = {
  name: 'Com título',
  render: () => (
    <DataTable
      columns={columns}
      dataSource={dataSource}
      rowKey="key"
      title="Transações"
    />
  ),
}

export const ComTituloEExportar: Story = {
  name: 'Com título + botão exportar',
  render: () => (
    <DataTable
      columns={columns}
      dataSource={dataSource}
      rowKey="key"
      title="Transações"
      onExport={() => alert('Exportando...')}
    />
  ),
}

export const ComPeriodo: Story = {
  name: 'Com seletor de período',
  render: () => (
    <DataTable
      columns={columns}
      dataSource={dataSource}
      rowKey="key"
      title="Transações"
      periodOptions={PERIOD_OPTIONS}
      defaultPeriod="mes"
      onExport={() => alert('Exportando...')}
    />
  ),
}

export const ComBusca: Story = {
  name: 'Com barra de busca',
  render: () => {
    const [search, setSearch] = useState('')
    const filtered = dataSource.filter(r =>
      r.nome.toLowerCase().includes(search.toLowerCase())
    )
    return (
      <DataTable
        columns={columns}
        dataSource={filtered}
        rowKey="key"
        title="Transações"
        searchPlaceholder="Pesquisar merchant..."
        searchValue={search}
        onSearch={setSearch}
      />
    )
  },
}

export const ComFiltros: Story = {
  name: 'Com filtros de status',
  render: () => {
    const [statusFilter, setStatusFilter] = useState<string[]>([])
    const filtered = statusFilter.length === 0
      ? dataSource
      : dataSource.filter(r => statusFilter.includes(r.status))
    return (
      <DataTable
        columns={columns}
        dataSource={filtered}
        rowKey="key"
        title="Transações"
        onSearch={() => {}}
        filters={[{
          label: 'Status',
          options: [
            { label: 'Aprovado', value: 'Aprovado' },
            { label: 'Pendente', value: 'Pendente' },
            { label: 'Recusado', value: 'Recusado' },
          ],
          value: statusFilter,
          onChange: setStatusFilter,
        }]}
      />
    )
  },
}

export const Loading: Story = {
  name: 'Estado loading',
  render: () => (
    <DataTable
      columns={columns}
      dataSource={[]}
      rowKey="key"
      title="Transações"
      loading
    />
  ),
}

export const SemPaginacao: Story = {
  name: 'Sem paginação',
  render: () => (
    <DataTable
      columns={columns}
      dataSource={dataSource}
      rowKey="key"
      showPagination={false}
    />
  ),
}
