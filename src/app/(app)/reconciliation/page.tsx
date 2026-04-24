'use client'

import PageHeader from '@/components/shared/PageHeader'
import Icon from '@/components/shared/Icon'

export default function ReconciliationPage() {
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column' }}>
      <PageHeader title="Conciliação" breadcrumb="Sub-adquirente / Conciliação" onBack={() => {}} />
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16, color:'rgba(0,0,0,0.25)' }}>
        <Icon name="barChart" size={48} color="rgba(0,0,0,0.1)" />
        <span style={{ fontSize:16 }}>Em desenvolvimento</span>
      </div>
    </div>
  )
}
