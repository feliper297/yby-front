'use client'

import { Select as AntSelect, type SelectProps } from 'antd'

/**
 * AppSelect — wrapper padronizado do Select do Ant Design.
 *
 * Segue o design system Figma (node 42622-8):
 * - Single e multi-select com tags
 * - Busca integrada (showSearch)
 * - Scrollbar no dropdown para listas longas
 * - Estilos consistentes com #1890FF primary, border-radius 2px
 *
 * Usar sempre este componente em vez do <select> nativo ou do Select do antd diretamente.
 */
export type AppSelectProps<T = string> = SelectProps<T> & {
  label?: string
  hint?: string
  error?: string
}

export default function AppSelect<T = string>({
  label,
  hint,
  error,
  style,
  ...props
}: AppSelectProps<T>) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {label && (
        <label style={{
          fontSize: 13,
          color: 'rgba(0,0,0,0.85)',
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 400,
        }}>
          {label}
        </label>
      )}

      <AntSelect<T>
        {...props}
        style={{
          width: '100%',
          fontSize: 13,
          ...style,
        }}
        status={error ? 'error' : undefined}
        // Defaults sensatos que o DS exige
        allowClear={props.allowClear ?? (props.mode === 'multiple')}
        maxTagCount={props.maxTagCount ?? 'responsive'}
      />

      {error && (
        <span style={{ fontSize: 12, color: '#ff4d4f', fontFamily: 'Roboto, sans-serif' }}>
          {error}
        </span>
      )}
      {!error && hint && (
        <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)', fontFamily: 'Roboto, sans-serif' }}>
          {hint}
        </span>
      )}
    </div>
  )
}

// Re-export da Option para facilitar o uso inline
export const { Option } = AntSelect
