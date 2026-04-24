'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Icon from '@/components/shared/Icon'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      router.push('/dashboard')
    }, 900)
  }

  return (
    <div style={{ width:'100vw', height:'100vh', background:'#F2F4F8', display:'flex', flexDirection:'column' }}>
      <div style={{ width:'100%', height:104, background:'#fff', borderBottom:'1px solid #f0f0f0', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 60px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <img src="/logo-tupi.svg" alt="TUPI" style={{ height:28, display:'block' }} />
          <span style={{ fontSize:12, background:'rgba(114,46,209,0.1)', color:'#722ED1', border:'1px solid #b37feb', borderRadius:2, padding:'1px 8px', fontWeight:500 }}>Sub-adquirente</span>
        </div>
      </div>
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ width:420, background:'#fff', borderRadius:2, padding:36, boxShadow:'0 2px 8px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize:24, fontWeight:600, color:'rgba(0,0,0,0.85)', marginBottom:4 }}>Entrar</h2>
          <p style={{ fontSize:14, color:'rgba(0,0,0,0.65)', marginBottom:24 }}>Acesse o painel Sub-adquirente</p>
          <div style={{ marginBottom:16 }}>
            <label style={{ display:'block', fontSize:13, fontWeight:500, color:'rgba(0,0,0,0.85)', marginBottom:4 }}>E-mail <span style={{ color:'#ff4d4f' }}>*</span></label>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="seu@email.com"
              style={{ width:'100%', border:'1px solid #d9d9d9', borderRadius:2, padding:'7px 12px', fontSize:14, outline:'none', fontFamily:'Roboto' }}
              onFocus={e=>(e.target as HTMLInputElement).style.border='1px solid #1890FF'}
              onBlur={e=>(e.target as HTMLInputElement).style.border='1px solid #d9d9d9'}
              onKeyDown={e=>e.key==='Enter'&&handleLogin()} />
          </div>
          <div style={{ marginBottom:8 }}>
            <label style={{ display:'block', fontSize:13, fontWeight:500, color:'rgba(0,0,0,0.85)', marginBottom:4 }}>Senha <span style={{ color:'#ff4d4f' }}>*</span></label>
            <div style={{ position:'relative' }}>
              <input type={showPass?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Sua senha"
                style={{ width:'100%', border:'1px solid #d9d9d9', borderRadius:2, padding:'7px 36px 7px 12px', fontSize:14, outline:'none', fontFamily:'Roboto' }}
                onFocus={e=>(e.target as HTMLInputElement).style.border='1px solid #1890FF'}
                onBlur={e=>(e.target as HTMLInputElement).style.border='1px solid #d9d9d9'}
                onKeyDown={e=>e.key==='Enter'&&handleLogin()} />
              <button onClick={()=>setShowPass(!showPass)} style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'rgba(0,0,0,0.35)' }}>
                <Icon name={showPass?'eyeOff':'eye'} size={16} />
              </button>
            </div>
          </div>
          <button onClick={handleLogin} disabled={loading}
            style={{ width:'100%', background:loading?'#69b1ff':'#1890FF', color:'#fff', border:'none', borderRadius:2, padding:'8px 0', fontSize:14, fontWeight:500, cursor:loading?'not-allowed':'pointer', marginTop:16, fontFamily:'Roboto' }}>
            {loading?'Entrando...':'Entrar'}
          </button>
        </div>
      </div>
      <div style={{ height:52, display:'flex', alignItems:'center', justifyContent:'center', gap:24, fontSize:13, color:'rgba(0,0,0,0.45)' }}>
        <span>© 2025 TUPI — Todos os direitos reservados</span>
        <a href="#" style={{ color:'rgba(0,0,0,0.45)', textDecoration:'none' }}>Política de Privacidade</a>
        <a href="#" style={{ color:'rgba(0,0,0,0.45)', textDecoration:'none' }}>Termos de Uso</a>
      </div>
    </div>
  )
}
