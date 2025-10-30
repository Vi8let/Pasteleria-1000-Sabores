import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, setSessionUser } from '../services/authService.js'
import { seedUsers, addUser } from '../services/userService.js'
import { getAllRegiones, getComunasByRegion } from '../data/regiones-comunas.js'

export default function Login(){
  const navigate = useNavigate()
  const [tab, setTab] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Registro
  const [reg, setReg] = useState({ nombre:'', correo:'', contrasena:'', run:'', fechaNacimiento:'', region:'', comuna:'', direccion:'', rol:'usuario' })
  const [regiones, setRegiones] = useState([])
  const [comunas, setComunas] = useState([])

  useEffect(()=>{ seedUsers(); setRegiones(getAllRegiones()) }, [])
  useEffect(()=>{ setComunas(getComunasByRegion(reg.region)) }, [reg.region])

  function onSubmitLogin(e){
    e.preventDefault()
    setError('')
    const res = login(email.trim(), password)
    if (res.success){
      alert('Inicio de sesión exitoso')
      navigate('/')
    } else {
      setError(res.message)
    }
  }

  function onChangeReg(e){
    const { name, value } = e.target
    setReg(prev => ({ ...prev, [name]: value }))
  }

  function onSubmitRegister(e){
    e.preventDefault()
    setError('')
    try {
      addUser(reg)
      setSessionUser(reg)
      alert('Registro exitoso')
      navigate('/')
    } catch(err){
      setError(err.message || 'Error al registrar')
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-header" style={{backgroundColor:'#8B4513', color:'#fff'}}>
            <div className="d-flex gap-3">
              <button className={`btn btn-sm ${tab==='login'?'btn-light':'btn-outline-light'}`} onClick={()=>setTab('login')}>Iniciar sesión</button>
              <button className={`btn btn-sm ${tab==='register'?'btn-light':'btn-outline-light'}`} onClick={()=>setTab('register')}>Registrarse</button>
            </div>
          </div>
          <div className="card-body">
            {error && <div className="alert alert-danger">{error}</div>}
            {tab==='login' ? (
              <form onSubmit={onSubmitLogin}>
                <div className="mb-3">
                  <label className="form-label">Correo</label>
                  <input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} required />
                </div>
                <div className="text-end">
                  <button className="btn" style={{backgroundColor:'#8B4513', color:'#fff'}} type="submit">Ingresar</button>
                </div>
              </form>
            ) : (
              <form onSubmit={onSubmitRegister}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nombre Completo</label>
                    <input className="form-control" name="nombre" value={reg.nombre} onChange={onChangeReg} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Correo</label>
                    <input type="email" className="form-control" name="correo" value={reg.correo} onChange={onChangeReg} required />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Contraseña</label>
                    <input type="password" className="form-control" name="contrasena" value={reg.contrasena} onChange={onChangeReg} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">RUN/RUT</label>
                    <input className="form-control" name="run" value={reg.run} onChange={onChangeReg} placeholder="12345678-9" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Fecha de Nacimiento</label>
                    <input type="date" className="form-control" name="fechaNacimiento" value={reg.fechaNacimiento} onChange={onChangeReg} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Dirección</label>
                    <input className="form-control" name="direccion" value={reg.direccion} onChange={onChangeReg} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Región</label>
                    <select className="form-select" name="region" value={reg.region} onChange={onChangeReg}>
                      <option value="">Selecciona una región</option>
                      {regiones.map(r=> <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Comuna</label>
                    <select className="form-select" name="comuna" value={reg.comuna} onChange={onChangeReg} disabled={!reg.region}>
                      <option value="">Selecciona una comuna</option>
                      {comunas.map(c=> <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="text-end">
                  <button className="btn" style={{backgroundColor:'#8B4513', color:'#fff'}} type="submit">Registrarme</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


