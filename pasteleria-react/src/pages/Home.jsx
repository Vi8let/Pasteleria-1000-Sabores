import { Link } from 'react-router-dom'
import { getProducts } from '../services/productService.js'
import { addToCart } from '../services/cartService.js'
import { getSessionUser } from '../services/authService.js'

export default function Home(){
  const productos = getProducts().slice(0,3)
  const isAdmin = (getSessionUser()?.rol === 'admin')

  function onAgregar(p){
    addToCart(p, 1)
    alert(`¡${p.nombre} agregado al carrito!`)
  }

  return (
    <div>
      {/* Hero */}
      <section className="text-center py-5" style={{background: 'linear-gradient(135deg, #FFF5E1 0%, #FFE0E6 100%)'}}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-5 fw-bold mb-3" style={{color:'#5D4037'}}>Bienvenidos a Pastelería 1000 Sabores</h1>
              <p className="lead mb-4" style={{color:'#8B4513'}}>Dulces momentos, sabores únicos. Descubre nuestra exquisita selección de tortas y postres artesanales.</p>
              <div className="d-flex gap-3 justify-content-center">
                <Link to="/productos" className="btn btn-primary btn-lg">Ver Productos</Link>
                <Link to="/login" className="btn btn-outline-primary btn-lg">Registrarse</Link>
              </div>
            </div>
            <div className="col-lg-6">
              <img src="/assets/img/logo.png" alt="Logo Pastelería" className="img-fluid" style={{maxHeight: 220}} />
            </div>
          </div>
        </div>
      </section>

      {/* Destacados */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-4" style={{color:'#5D4037'}}>Nuestros Productos Destacados</h2>
          <div className="row">
            {productos.map(p => (
              <div className="col-md-4 mb-4" key={p.id}>
                <div className="card h-100">
                  <img src={p.imagen} className="card-img-top" alt={p.nombre} style={{height:250, objectFit:'cover'}} />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{p.nombre}</h5>
                    <p className="card-text">{p.descripcion}</p>
                    <p className="card-text"><strong>Precio:</strong> ${p.precio.toLocaleString('es-CL')}</p>
                    <div className="mt-auto d-flex gap-2">
                      {!isAdmin && <button className="btn btn-sm" style={{backgroundColor:'#8B4513', color:'#fff'}} onClick={()=>onAgregar(p)}>🛒 Agregar</button>}
                      <Link to={`/producto/${p.id}`} className="btn btn-sm" style={{backgroundColor:'#FFC0CB', color:'#5D4037'}}>Ver detalle</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-3">
            <Link to="/productos" className="btn btn-primary">Ver todos los productos</Link>
          </div>
        </div>
      </section>
    </div>
  )
}


