import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProductById } from '../services/productService.js'
import { addToCart } from '../services/cartService.js'
import { getSessionUser } from '../services/authService.js'

export default function ProductoDetalle(){
  const { id } = useParams()
  const navigate = useNavigate()
  const [producto, setProducto] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProduct() {
      try {
        const product = await getProductById(id)
        setProducto(product)
      } catch (error) {
        console.error('Error al cargar producto:', error)
        setProducto(null)
      } finally {
        setLoading(false)
      }
    }
    loadProduct()
  }, [id])

  function handleAddToCart(){
    const session = getSessionUser()
    if (!session) {
      alert('Debes estar logeado para comprar')
      navigate('/login')
      return
    }
    addToCart(producto, 1)
    alert('Agregado al carrito')
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    )
  }

  if (!producto) {
    return (
      <div className="alert alert-danger">
        Producto no encontrado. <Link to="/productos" className="btn btn-sm btn-primary ms-2">Ver productos</Link>
      </div>
    )
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card product-card shadow-sm">
          <div className="row g-0">
            <div className="col-md-6">
              <img src={producto.imagen} className="img-fluid rounded-start" alt={producto.nombre} style={{height: 400, objectFit: 'cover', width:'100%'}} />
            </div>
            <div className="col-md-6">
              <div className="card-body h-100 d-flex flex-column">
                <h2 className="card-title">{producto.nombre}</h2>
                <p className="card-text text-muted"><strong>Categoría:</strong> {producto.categoria}</p>
                <p className="card-text"><strong>Código:</strong> <span className="badge" style={{backgroundColor:'#FFC0CB', color:'#5D4037'}}>{producto.codigo}</span></p>
                <p className="card-text"><strong>Precio:</strong> <span className="h4" style={{color:'#8B4513'}}>${producto.precio.toLocaleString('es-CL')}</span></p>
                <p className="card-text">{producto.descripcion}</p>
                <div className="mt-auto d-grid gap-2">
                  <button className="btn" style={{backgroundColor:'#8B4513', color:'#fff'}} onClick={handleAddToCart}>🛒 Agregar al carrito</button>
                  <Link to="/productos" className="btn btn-outline-secondary">← Volver a productos</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


