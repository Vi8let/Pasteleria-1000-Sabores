import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../services/productService.js'
import { addToCart } from '../services/cartService.js'

export default function Productos(){
  const productos = getProducts()
  const categorias = useMemo(()=> ['Todas', ...Array.from(new Set(productos.map(p=>p.categoria)))], [productos])
  const [categoria, setCategoria] = useState('Todas')
  const visibles = useMemo(()=> categoria==='Todas' ? productos : productos.filter(p=>p.categoria===categoria), [productos, categoria])

  function onAgregar(p){
    addToCart(p, 1)
    alert(`¡${p.nombre} agregado al carrito!`)
  }

  return (
    <div>
      <h1 className="mb-4">Productos</h1>

      {/* Filtros por categoría */}
      <div className="card mb-3">
        <div className="card-body">
          <div className="row g-2">
            {categorias.map(cat => (
              <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={cat}>
                <button
                  className={`btn w-100 ${categoria===cat ? '' : 'btn-outline-primary'}`}
                  style={categoria===cat? {backgroundColor:'#8B4513', color:'#fff', borderColor:'#8B4513'} : {}}
                  onClick={()=> setCategoria(cat)}>
                  {cat}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contador */}
      <p className="text-muted">Mostrando <strong>{visibles.length}</strong> productos</p>
      <div className="row">
        {visibles.map(p => (
          <div className="col-md-4 mb-4" key={p.id}>
            <div className="card h-100">
              <img src={p.imagen} className="card-img-top" alt={p.nombre} style={{ height: 250, objectFit: 'cover' }} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.nombre}</h5>
                <p className="card-text"><strong>Código:</strong> <span className="badge" style={{ backgroundColor:'#FFC0CB', color:'#5D4037' }}>{p.codigo}</span></p>
                <p className="card-text">{p.descripcion}</p>
                <p className="card-text"><strong>Precio:</strong> ${p.precio.toLocaleString('es-CL')}</p>
                <div className="mt-auto d-flex gap-2">
                  <button className="btn btn-sm" style={{backgroundColor:'#8B4513', color:'#fff'}} onClick={()=>onAgregar(p)}>🛒 Agregar</button>
                  <Link to={`/producto/${p.id}`} className="btn btn-sm" style={{backgroundColor:'#FFC0CB', color:'#5D4037'}}>Ver detalle</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


