import { useEffect, useState } from 'react'
import { getSessionUser, setSessionUser } from '../services/authService.js'
import { getAllRegiones, getComunasByRegion } from '../data/regiones-comunas.js'

export default function Perfil(){
  const [user, setUser] = useState(getSessionUser() || { nombre:'', correo:'', run:'', fechaNacimiento:'', region:'', comuna:'', direccion:'', rol:'usuario' })
  const [regiones, setRegiones] = useState([])
  const [comunas, setComunas] = useState([])

  useEffect(()=>{
    setRegiones(getAllRegiones())
  }, [])

  useEffect(()=>{
    setComunas(getComunasByRegion(user.region))
  }, [user.region])

  function onChange(e){
    const { name, value } = e.target
    setUser(prev => ({ ...prev, [name]: value }))
  }

  function guardar(){
    setSessionUser(user)
    alert('Datos guardados')
  }

  function activarFelices(){
    setUser(prev => ({ ...prev, codigoDescuento: 'FELICES50' }))
    setSessionUser({ ...user, codigoDescuento: 'FELICES50' })
    alert('Código FELICES50 activado')
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


