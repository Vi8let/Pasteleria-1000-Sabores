import { useEffect, useState } from 'react'
import { getCart, updateQuantity, removeItem, clearCart } from '../services/cartService.js'
import { getSessionUser } from '../services/authService.js'
import { calcularDescuentos } from '../services/discountService.js'

export default function Carrito(){
  const [cart, setCart] = useState([])

  useEffect(()=>{ setCart(getCart()) }, [])

  function cambiarCantidad(id, delta){
    const nuevo = updateQuantity(id, delta)
    setCart([...nuevo])
  }

  function eliminar(id){
    const nuevo = removeItem(id)
    setCart([...nuevo])
  }

  function vaciar(){
    if (!cart.length) return
    if (confirm('¿Vaciar carrito?')) setCart(clearCart())
  }

  const subtotal = cart.reduce((s,i)=> s + i.precio * i.cantidad, 0)
  const usuario = getSessionUser()
  const { mejor } = calcularDescuentos(usuario, subtotal)
  const total = subtotal - (mejor?.monto || 0)

  if (cart.length === 0){
    return (
      <div className="text-center">
        <h1 className="mb-3">Carrito</h1>
        <div className="alert alert-info">Tu carrito está vacío.</div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-4">Carrito</h1>

      {cart.map(item => (
        <div className="card mb-3" key={item.id}>
          <div className="row g-0 align-items-center">
            <div className="col-md-2 col-4 p-2">
              <img src={item.imagen} alt={item.nombre} className="img-fluid rounded" style={{height:120, width:'100%', objectFit:'cover'}} />
            </div>
            <div className="col-md-6 col-8">
              <div className="card-body p-3">
                <h5 className="card-title mb-2">{item.nombre}</h5>
                <p className="card-text mb-1"><strong>Precio:</strong> ${item.precio.toLocaleString('es-CL')}</p>
                <div className="d-flex align-items-center gap-2">
                  <strong>Cantidad:</strong>
                  <button className="btn btn-sm btn-outline-secondary" onClick={()=>cambiarCantidad(item.id, -1)}>-</button>
                  <span className="fw-bold">{item.cantidad}</span>
                  <button className="btn btn-sm btn-outline-secondary" onClick={()=>cambiarCantidad(item.id, 1)}>+</button>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6 text-center">
              <h5 className="text-primary mb-1">${(item.precio*item.cantidad).toLocaleString('es-CL')}</h5>
              <small className="text-muted">Subtotal</small>
            </div>
            <div className="col-md-1 col-6 text-end p-2">
              <button className="btn btn-danger btn-sm" onClick={()=>eliminar(item.id)}>🗑️</button>
            </div>
          </div>
        </div>
      ))}

      <div className="card">
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <div><strong>Subtotal:</strong> ${subtotal.toLocaleString('es-CL')}</div>
            {mejor?.monto>0 && (
              <div className="text-success">
                <strong>Descuento ({mejor.porcentaje}%):</strong> -${mejor.monto.toLocaleString('es-CL')}<br/>
                <small>{mejor.descripcion}</small>
              </div>
            )}
            <div className="h5" style={{color:'#8B4513'}}><strong>Total:</strong> ${total.toLocaleString('es-CL')}</div>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-danger" onClick={vaciar}>Vaciar carrito</button>
            <button className="btn btn-primary" onClick={()=>alert(`Compra confirmada por $${total.toLocaleString('es-CL')}`)}>Finalizar compra</button>
          </div>
        </div>
      </div>
    </div>
  )
}


