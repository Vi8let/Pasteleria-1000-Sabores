import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSessionUser } from '../services/authService.js'
import { getProducts, upsertProductOverride, setProductDeleted, getDeletedProducts } from '../services/productService.js'
import { getUsers, deleteUserByEmail, updateUserByEmail } from '../services/userService.js'

export default function Admin(){
  const nav = useNavigate()
  const user = getSessionUser()

  useEffect(()=>{
    if (user?.rol !== 'admin'){
      nav('/', { replace: true })
    }
  }, [user, nav])

  const [productos, setProductos] = useState(getProducts())
  const [desactivados, setDesactivados] = useState(getDeletedProducts())
  const [usuarios, setUsuarios] = useState(getUsers())
  const categorias = useMemo(()=> Array.from(new Set(getProducts().map(p=>p.categoria))), [])

  function guardarProd(id, precio, stock){
    upsertProductOverride(id, { precio: Number(precio)||0, stock: Number(stock)||0 })
    setProductos(getProducts())
    alert('Cambios guardados')
  }

  function eliminarProd(id){
    if (!confirm('¿Ocultar este producto del catálogo?')) return
    setProductDeleted(id, true)
    setProductos(getProducts())
    setDesactivados(getDeletedProducts())
  }

  function reactivarProd(id){
    setProductDeleted(id, false)
    setProductos(getProducts())
    setDesactivados(getDeletedProducts())
  }

  function eliminarUsuario(correo){
    if (!confirm('¿Eliminar usuario?')) return
    deleteUserByEmail(correo)
    setUsuarios(getUsers())
  }

  function cambiarRol(correo, nuevoRol){
    updateUserByEmail(correo, { rol: nuevoRol })
    setUsuarios(getUsers())
  }

  if (user?.rol !== 'admin') {
    return null
  }

  return (
    <div>
      <h1 className="mb-4">Panel de Administración</h1>

      {/* Productos */}
      <section className="mb-5">
        <div className="card">
          <div className="card-header"><h5 className="mb-0">Catálogo de Productos</h5></div>
          <div className="card-body">
            <div className="row">
              {productos.map(p => (
                <div className="col-md-4 mb-4" key={p.id}>
                  <div className="card h-100">
                    <div style={{position:'relative'}}>
                      <img src={p.imagen} className="card-img-top" alt={p.nombre} style={{height:220, objectFit:'cover'}} />
                      <span className="badge" style={{position:'absolute', top:8, right:8, backgroundColor:'#8B4513'}}>Stock: {p.stock ?? '-'}</span>
                    </div>
                    <div className="card-body">
                      <h6 className="card-title mb-1">{p.nombre}</h6>
                      <div className="text-muted mb-2">{p.categoria} · <span className="badge" style={{backgroundColor:'#FFC0CB', color:'#5D4037'}}>{p.codigo}</span></div>
                      <div className="row g-2 align-items-center">
                        <div className="col-6"><input type="number" className="form-control form-control-sm" defaultValue={p.precio} placeholder="Precio" id={`precio-${p.id}`} /></div>
                        <div className="col-4"><input type="number" className="form-control form-control-sm" defaultValue={p.stock||0} placeholder="Stock" id={`stock-${p.id}`} /></div>
                        <div className="col-2 d-grid gap-1">
                          <button className="btn btn-sm" style={{backgroundColor:'#8B4513', color:'#fff'}} onClick={()=>{
                            const precio = (document.getElementById(`precio-${p.id}`)||{}).value
                            const stock = (document.getElementById(`stock-${p.id}`)||{}).value
                            guardarProd(p.id, precio, stock)
                          }}>Guardar</button>
                          <button className="btn btn-sm btn-danger" onClick={()=>eliminarProd(p.id)}>Eliminar</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h6 className="mt-4">Productos desactivados</h6>
            {desactivados.length===0 ? (
              <div className="text-muted">No hay productos desactivados.</div>
            ) : (
              <table className="table table-sm">
                <thead><tr><th>Código</th><th>Nombre</th><th></th></tr></thead>
                <tbody>
                  {desactivados.map(p=> (
                    <tr key={p.id}>
                      <td>{p.codigo||p.id}</td>
                      <td>{p.nombre||p.id}</td>
                      <td className="text-end"><button className="btn btn-primary btn-sm" onClick={()=>reactivarProd(p.id)}>Reactivar</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>

      {/* Usuarios */}
      <section>
        <div className="card">
          <div className="card-header"><h5 className="mb-0">Usuarios Registrados</h5></div>
          <div className="card-body">
            {usuarios.length===0 ? <div className="text-muted">Sin usuarios registrados.</div> : (
              <table className="table">
                <thead><tr><th>Nombre</th><th>Correo</th><th>Rol</th><th></th></tr></thead>
                <tbody>
                  {usuarios.map(u => (
                    <tr key={u.correo}>
                      <td>{u.nombre}</td>
                      <td>{u.correo}</td>
                      <td>
                        <select className="form-select form-select-sm" defaultValue={u.rol||'usuario'} onChange={e=>cambiarRol(u.correo, e.target.value)}>
                          <option value="usuario">usuario</option>
                          <option value="admin">admin</option>
                        </select>
                      </td>
                      <td className="text-end">
                        <button className="btn btn-danger btn-sm" onClick={()=>eliminarUsuario(u.correo)}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}


