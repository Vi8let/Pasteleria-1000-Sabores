import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSessionUser } from '../services/authService.js'
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/productService.js'

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
    imagen: ''
  })

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
    }
  }, [user])
  
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
      if (!nuevoProducto.nombre || !nuevoProducto.descripcion || !nuevoProducto.precio || !nuevoProducto.stock || !nuevoProducto.imagen) {
        alert('Por favor completa todos los campos')
        return
      }
      
      await createProduct({
        nombre: nuevoProducto.nombre,
        descripcion: nuevoProducto.descripcion,
        precio: Number(nuevoProducto.precio),
        stock: Number(nuevoProducto.stock),
        imagen: nuevoProducto.imagen
      })
      
      // Recargar productos
      const products = await getProducts()
      setProductos(products)
      
      // Limpiar formulario
      setNuevoProducto({ nombre: '', descripcion: '', precio: '', stock: '', imagen: '' })
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

      {/* Productos */}
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
    </div>
  )
}


