'use client'

export type TagVariant =
  | 'Aprovado'
  | 'Pago'
  | 'Pendente'
  | 'Recusado'
  | 'Cancelado'
  | 'Em análise'
  | 'Ativo'
  | 'Suspenso'
  | 'Inativo'
  | 'Antecipado'
  | 'Chargeback'
  | 'Erro'
  | 'Info'

const STATUS_MAP: Record<string, { bg: string; color: string; border: string }> = {
  // Sucesso — Polar Green
  Aprovado:    { bg: '#F6FFED', color: '#237804', border: '#D9F7BE' },
  Pago:        { bg: '#F6FFED', color: '#237804', border: '#D9F7BE' },
  Ativo:       { bg: '#F6FFED', color: '#237804', border: '#D9F7BE' },

  // Warning — Calendula Gold
  Pendente:    { bg: '#FFFBE6', color: '#874D00', border: '#FFE58F' },
  Suspenso:    { bg: '#FFFBE6', color: '#874D00', border: '#FFE58F' },
  Antecipado:  { bg: '#FFF7E6', color: '#874D00', border: '#FFD591' },

  // Erro — Dust Red
  Recusado:    { bg: '#FFF1F0', color: '#820014', border: '#FFCCC7' },
  Chargeback:  { bg: '#FFF1F0', color: '#820014', border: '#FFCCC7' },
  Erro:        { bg: '#FFF1F0', color: '#820014', border: '#FFCCC7' },

  // Neutro
  Cancelado:   { bg: '#F5F5F5', color: 'rgba(0,0,0,0.45)', border: '#D9D9D9' },
  Inativo:     { bg: '#F5F5F5', color: 'rgba(0,0,0,0.45)', border: '#D9D9D9' },

  // Info — DayBreak Blue
  'Em análise': { bg: '#E6F7FF', color: '#003A8C', border: '#91D5FF' },
  Info:          { bg: '#E6F7FF', color: '#003A8C', border: '#91D5FF' },
}

interface TagProps {
  status: string
  /** Override do label exibido (se diferente do status key) */
  label?: string
}

export default function Tag({ status, label }: TagProps) {
  const s = STATUS_MAP[status] ?? STATUS_MAP['Pendente']
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        borderRadius: 2,
        padding: '0 7px',
        fontSize: 12,
        lineHeight: '20px',
        display: 'inline-block',
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 400,
        whiteSpace: 'nowrap',
      }}
    >
      {label ?? status}
    </span>
  )
}
