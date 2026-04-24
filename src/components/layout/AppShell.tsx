'use client'

import GlobalHeader from './GlobalHeader'
import Sidebar from './Sidebar'

interface Props {
  children: React.ReactNode
}

export default function AppShell({ children }: Props) {
  return (
    <div style={{ width:'100vw', height:'100vh', display:'flex', flexDirection:'column', background:'#F2F4F8' }}>
      <GlobalHeader />
      <div style={{ flex:1, display:'flex', overflow:'hidden' }}>
        <Sidebar />
        <div style={{ flex:1, overflow:'auto', display:'flex', flexDirection:'column' }}>
          {children}
        </div>
      </div>
    </div>
  )
}
