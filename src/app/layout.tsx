import type { Metadata } from 'next'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'
import ptBR from 'antd/locale/pt_BR'
import { tupiTheme } from '@/lib/antd-theme'
import './globals.css'

export const metadata: Metadata = {
  title: 'TUPI — Portal Sub-adquirente',
  description: 'Portal de gestão para sub-adquirentes da plataforma YBY/TUPI',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AntdRegistry>
          <ConfigProvider theme={tupiTheme} locale={ptBR}>
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}
