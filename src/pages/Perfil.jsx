import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSessionUser, setSessionUser } from '../services/authService.js'
import { getAllRegiones, getComunasByRegion } from '../data/regiones-comunas.js'
import { updateUserByEmail } from '../services/userService.js'

export default function Perfil(){
  const navigate = useNavigate()
  const [user, setUser] = useState(()=> getSessionUser())
  const [regiones, setRegiones] = useState([])
  const [comunas, setComunas] = useState([])

  useEffect(()=>{
    setRegiones(getAllRegiones())
  }, [])

  useEffect(()=>{
    if (user?.region){
      setComunas(getComunasByRegion(user.region))
    } else {
      setComunas([])
    }
  }, [user?.region])

  useEffect(()=>{
    if (!user){
      navigate('/login', { replace: true })
    }
  }, [user, navigate])

  function onChange(e){
    const { name, value } = e.target
    setUser(prev => ({ ...prev, [name]: value }))
  }

  function guardar(){
    if (!user?.correo){
      alert('No encontramos una sesión activa. Inicia sesión nuevamente.')
      navigate('/login', { replace: true })
      return
    }
    updateUserByEmail(user.correo, user)
    setSessionUser(user)
    alert('Datos guardados')
  }

  function activarFelices(){
    if (!user?.correo){
      alert('No encontramos una sesión activa. Inicia sesión nuevamente.')
      navigate('/login', { replace: true })
      return
    }
    const actualizado = { ...user, codigoDescuento: 'FELICES50' }
    setUser(actualizado)
    updateUserByEmail(actualizado.correo, actualizado)
    setSessionUser(actualizado)
    alert('Código FELICES50 activado')
  }

  if (!user){
    return null
  }

  return (
    <div>
      <h1 className="mb-4">Mi Perfil</h1>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Nombre Completo</label>
              <input className="form-control" name="nombre" value={user.nombre||''} onChange={onChange} />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Correo</label>
              <input className="form-control" value={user.correo||''} readOnly />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">RUN/RUT</label>
              <input className="form-control" value={user.run||''} readOnly />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Fecha de Nacimiento</label>
              <input type="date" className="form-control" name="fechaNacimiento" value={user.fechaNacimiento||''} onChange={onChange} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Región</label>
              <select className="form-select" name="region" value={user.region||''} onChange={onChange}>
                <option value="">Selecciona una región</option>
                {regiones.map(r=> <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Comuna</label>
              <select className="form-select" name="comuna" value={user.comuna||''} onChange={onChange} disabled={!user.region}>
                <option value="">Selecciona una comuna</option>
                {comunas.map(c=> <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Dirección</label>
            <input className="form-control" name="direccion" value={user.direccion||''} onChange={onChange} />
          </div>

          <div className="mb-3">
            <h6>Descuentos disponibles</h6>
            {user.codigoDescuento === 'FELICES50' ? (
              <div className="alert alert-success mb-2"><small>🎉 FELICES50 activo: 10% de descuento</small></div>
            ) : (
              <button className="btn btn-outline-primary btn-sm" onClick={activarFelices}>Activar FELICES50</button>
            )}
          </div>

          <div className="text-end">
            <button className="btn" style={{backgroundColor:'#8B4513', color:'#fff'}} onClick={guardar}>Guardar Cambios</button>
          </div>
        </div>
      </div>
    </div>
  )
}


