'use client'

import Icon from '@/components/shared/Icon'
import { useNavStore } from '@/store/nav.store'

export default function GlobalHeader() {
  const toggleSidebar = useNavStore((s) => s.toggleSidebar)

  return (
    <div style={{ width:'100%', height:48, background:'#fff', borderBottom:'1px solid #f0f0f0', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 24px', flexShrink:0, boxShadow:'0 1px 4px rgba(0,0,0,0.08)', zIndex:100 }}>
      <div style={{ display:'flex', alignItems:'center', gap:16 }}>
        <button onClick={toggleSidebar} style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(0,0,0,0.45)', display:'flex', alignItems:'center' }}>
          <Icon name="menu" size={18} />
        </button>
        <img src="/logo-tupi.svg" alt="TUPI" style={{ height:20, display:'block' }} />
        <span style={{ fontSize:12, background:'rgba(24,144,255,0.1)', color:'#1890FF', border:'1px solid #91d5ff', borderRadius:2, padding:'1px 8px', fontWeight:500 }}>Sub-adquirente</span>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:20 }}>
        <div style={{ position:'relative', display:'flex', alignItems:'center' }}>
          <div style={{ position:'absolute', left:10, pointerEvents:'none' }}><Icon name="search" size={14} color="rgba(0,0,0,0.35)" /></div>
          <input placeholder="Buscar..." style={{ border:'1px solid #d9d9d9', borderRadius:2, padding:'4px 12px 4px 32px', fontSize:13, outline:'none', width:200, fontFamily:'Roboto' }} />
        </div>
        <button style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(0,0,0,0.45)', display:'flex', alignItems:'center', position:'relative' }}>
          <Icon name="bell" size={18} />
          <span style={{ position:'absolute', top:-4, right:-4, background:'#ff4d4f', borderRadius:99, width:14, height:14, fontSize:10, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center' }}>5</span>
        </button>
        <div style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer' }}>
          <div style={{ width:28, height:28, borderRadius:'50%', background:'#722ED1', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:11, fontWeight:600 }}>SA</div>
          <span style={{ fontSize:13, color:'rgba(0,0,0,0.65)' }}>Sub Adquirente</span>
          <Icon name="chevronDown" size={12} color="rgba(0,0,0,0.45)" />
        </div>
      </div>
    </div>
  )
}
