import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSessionUser } from '../services/authService.js'
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/productService.js'
import { getAllUsers, deleteUser, updatePromotionCode } from '../services/userServiceBackend.js'

export default function Admin(){
  const nav = useNavigate()
  const user = getSessionUser()

  useEffect(()=>{
    if (user?.rol !== 'admin' && user?.role !== 'ADMIN'){
      nav('/', { replace: true })
    }
  }, [user, nav])

  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    imagen: '',
    categoria: 'General'
  })
  const [usuarios, setUsuarios] = useState([])
  const [tab, setTab] = useState('productos')
  
  const categoriasDisponibles = ['General', 'Tortas Cuadradas', 'Tortas Circulares', 'Tortas Especiales', 'Postres Individuales', 'Sin Gluten', 'Sin Azúcar', 'Veganos', 'Tradicionales']

  useEffect(() => {
    async function loadProducts() {
      try {
        const products = await getProducts()
        setProductos(products)
      } catch (error) {
        console.error('Error al cargar productos:', error)
      } finally {
        setLoading(false)
      }
    }
    if (user?.rol === 'admin' || user?.role === 'ADMIN') {
      loadProducts()
      loadUsuarios()
    }
  }, [user])

  async function loadUsuarios() {
    try {
      const users = await getAllUsers()
      setUsuarios(users)
    } catch (error) {
      console.error('Error al cargar usuarios:', error)
      setUsuarios([])
    }
  }

  async function eliminarUsuario(userId) {
    if (!confirm(`¿Eliminar este usuario?`)) return
    try {
      await deleteUser(userId)
      await loadUsuarios()
      alert('Usuario eliminado')
    } catch (error) {
      alert('Error al eliminar usuario: ' + (error.message || 'Error desconocido'))
    }
  }

  async function activarFelices50(userId) {
    if (!confirm(`¿Activar código FELICES50 para este usuario?`)) return
    try {
      await updatePromotionCode(userId, 'FELICES50')
      await loadUsuarios()
      alert('Código FELICES50 activado')
    } catch (error) {
      alert('Error al activar código: ' + (error.message || 'Error desconocido'))
    }
  }
  
  const categorias = useMemo(()=> Array.from(new Set(productos.map(p=>p.categoria))), [productos])

  async function guardarProd(id, precio, stock){
    try {
      const producto = productos.find(p => p.id === id)
      if (!producto) return
      
      await updateProduct(id, { 
        ...producto, 
        precio: Number(precio)||0, 
        stock: Number(stock)||0 
      })
      
      // Recargar productos
      const products = await getProducts()
      setProductos(products)
      alert('Cambios guardados')
    } catch (error) {
      alert('Error al guardar: ' + (error.message || 'Error desconocido'))
      console.error('Error al guardar producto:', error)
    }
  }

  async function eliminarProd(id){
    if (!confirm('¿Eliminar este producto del catálogo?')) return
    try {
      await deleteProduct(id)
      const products = await getProducts()
      setProductos(products)
      alert('Producto eliminado')
    } catch (error) {
      alert('Error al eliminar: ' + (error.message || 'Error desconocido'))
      console.error('Error al eliminar producto:', error)
    }
  }

  async function crearProducto(e){
    e.preventDefault()
    try {
      if (!nuevoProducto.nombre || !nuevoProducto.descripcion || !nuevoProducto.precio || !nuevoProducto.stock || !nuevoProducto.imagen || !nuevoProducto.categoria) {
        alert('Por favor completa todos los campos')
        return
      }
      
      await createProduct({
        nombre: nuevoProducto.nombre,
        descripcion: nuevoProducto.descripcion,
        precio: Number(nuevoProducto.precio),
        stock: Number(nuevoProducto.stock),
        imagen: nuevoProducto.imagen,
        categoria: nuevoProducto.categoria
      })
      
      // Recargar productos
      const products = await getProducts()
      setProductos(products)
      
      // Limpiar formulario
      setNuevoProducto({ nombre: '', descripcion: '', precio: '', stock: '', imagen: '', categoria: 'General' })
      setShowForm(false)
      alert('Producto creado exitosamente')
    } catch (error) {
      alert('Error al crear producto: ' + (error.message || 'Error desconocido'))
      console.error('Error al crear producto:', error)
    }
  }

  if (user?.rol !== 'admin' && user?.role !== 'ADMIN') {
    return null
  }

  if (loading) {
    return (
      <div className="text-center">
        <h1 className="mb-4">Panel de Administración</h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-4">Panel de Administración</h1>

      {/* Tabs */}
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex gap-2">
            <button 
              className={`btn ${tab === 'productos' ? '' : 'btn-outline-primary'}`}
              style={tab === 'productos' ? {backgroundColor:'#8B4513', color:'#fff'} : {}}
              onClick={() => setTab('productos')}>
              Productos
            </button>
            <button 
              className={`btn ${tab === 'usuarios' ? '' : 'btn-outline-primary'}`}
              style={tab === 'usuarios' ? {backgroundColor:'#8B4513', color:'#fff'} : {}}
              onClick={() => setTab('usuarios')}>
              Usuarios
            </button>
          </div>
        </div>
      </div>

      {/* Productos */}
      {tab === 'productos' && (
      <section className="mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Catálogo de Productos</h5>
            <button className="btn btn-sm" style={{backgroundColor:'#8B4513', color:'#fff'}} onClick={() => setShowForm(!showForm)}>
              {showForm ? 'Cancelar' : '+ Agregar Producto'}
            </button>
          </div>
          <div className="card-body">
            {/* Formulario para crear producto */}
            {showForm && (
              <div className="card mb-4" style={{backgroundColor:'#FFF5E1'}}>
                <div className="card-body">
                  <h6 className="mb-3">Nuevo Producto</h6>
                  <form onSubmit={crearProducto}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Nombre del Producto</label>
                        <input type="text" className="form-control" value={nuevoProducto.nombre} 
                          onChange={e => setNuevoProducto({...nuevoProducto, nombre: e.target.value})} required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Categoría</label>
                        <select className="form-select" value={nuevoProducto.categoria} 
                          onChange={e => setNuevoProducto({...nuevoProducto, categoria: e.target.value})} required>
                          {categoriasDisponibles.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">URL de Imagen (ej: /assets/img/logo.png)</label>
                        <input type="text" className="form-control" value={nuevoProducto.imagen} 
                          onChange={e => setNuevoProducto({...nuevoProducto, imagen: e.target.value})} required />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Descripción</label>
                        <textarea className="form-control" rows="2" value={nuevoProducto.descripcion} 
                          onChange={e => setNuevoProducto({...nuevoProducto, descripcion: e.target.value})} required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Precio</label>
                        <input type="number" className="form-control" min="0" step="0.01" value={nuevoProducto.precio} 
                          onChange={e => setNuevoProducto({...nuevoProducto, precio: e.target.value})} required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Stock</label>
                        <input type="number" className="form-control" min="0" value={nuevoProducto.stock} 
                          onChange={e => setNuevoProducto({...nuevoProducto, stock: e.target.value})} required />
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn" style={{backgroundColor:'#8B4513', color:'#fff'}}>Crear Producto</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
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

          </div>
        </div>
      </section>
      )}

      {/* Usuarios */}
      {tab === 'usuarios' && (
      <section className="mb-5">
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Gestión de Usuarios</h5>
          </div>
          <div className="card-body">
            {usuarios.length === 0 ? (
              <div className="alert alert-info">No hay usuarios registrados</div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead style={{backgroundColor:'#FFF5E1'}}>
                    <tr>
                      <th>Nombre</th>
                      <th>Correo</th>
                      <th>Rol</th>
                      <th>Código Promocional</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map(u => (
                      <tr key={u.id || u.correo}>
                        <td>{u.nombre || '-'}</td>
                        <td>{u.correo}</td>
                        <td>
                          <span className={`badge ${u.rol === 'admin' || u.role === 'ADMIN' ? 'bg-danger' : 'bg-primary'}`}>
                            {u.rol || 'usuario'}
                          </span>
                        </td>
                        <td>
                          {u.codigoDescuento ? (
                            <span className="badge bg-success">{u.codigoDescuento}</span>
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            {u.rol !== 'admin' && u.role !== 'ADMIN' && !u.codigoDescuento && (
                              <button 
                                className="btn btn-sm btn-outline-success"
                                onClick={() => activarFelices50(u.id || u.correo)}
                                title="Activar FELICES50">
                                🎉 Activar FELICES50
                              </button>
                            )}
                            {u.rol !== 'admin' && u.role !== 'ADMIN' && (
                              <button 
                                className="btn btn-sm btn-danger"
                                onClick={() => eliminarUsuario(u.id || u.correo)}
                                title="Eliminar usuario">
                                🗑️ Eliminar
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
      )}
    </div>
  )
}


