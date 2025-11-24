import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyOrders } from '../services/orderService.js'
import { getSessionUser } from '../services/authService.js'

export default function Pedidos(){
  const navigate = useNavigate()
  const [pedidos, setPedidos] = useState([])
  const [loading, setLoading] = useState(true)
  const session = getSessionUser()

  useEffect(() => {
    if (!session) {
      navigate('/login')
      return
    }
    
    async function loadPedidos() {
      try {
        const orders = await getMyOrders()
        // Mapear las órdenes del backend al formato del frontend
        const mappedOrders = orders.map(order => {
          // Calcular subtotal sumando los items
          const subtotal = (order.items || []).reduce((sum, item) => 
            sum + (item.unitPrice || 0) * (item.quantity || 0), 0)
          
          return {
            id: order.id,
            numeroPedido: `PED-${order.id}`,
            fecha: order.createdAt || order.date,
            status: order.status || 'PENDIENTE',
            subtotal: subtotal,
            descuento: order.discountAmount || 0,
            descuentoInfo: {
              porcentaje: order.discountPercentage || 0,
              descripcion: order.discountDescription || ''
            },
            total: order.total || 0,
            items: (order.items || []).map(item => ({
              productId: item.productId,
              productName: item.productName || `Producto ${item.productId}`,
              quantity: item.quantity || item.quantity,
              unitPrice: item.unitPrice || 0
            }))
          }
        })
        setPedidos(mappedOrders)
      } catch (error) {
        console.error('Error al cargar pedidos:', error)
        setPedidos([])
      } finally {
        setLoading(false)
      }
    }
    
    loadPedidos()
  }, [session, navigate])

  function getStatusBadge(status) {
    const statusMap = {
      'PENDIENTE': { class: 'bg-warning', text: 'Pendiente' },
      'CONFIRMADO': { class: 'bg-info', text: 'Confirmado' },
      'EN_PREPARACION': { class: 'bg-primary', text: 'En Preparación' },
      'LISTO': { class: 'bg-success', text: 'Listo' },
      'ENTREGADO': { class: 'bg-success', text: 'Entregado' },
      'CANCELADO': { class: 'bg-danger', text: 'Cancelado' }
    }
    const statusInfo = statusMap[status] || { class: 'bg-secondary', text: status }
    return <span className={`badge ${statusInfo.class}`}>{statusInfo.text}</span>
  }

  function formatDate(dateString) {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('es-CL', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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

  return (
    <div>
      <h1 className="mb-4">Mis Pedidos</h1>

      {pedidos.length === 0 ? (
        <div className="alert alert-info">
          <h5>No tienes pedidos aún</h5>
          <p>Cuando realices una compra, aparecerá aquí con su estado.</p>
        </div>
      ) : (
        <div className="row">
          {pedidos.map(pedido => (
            <div className="col-md-6 mb-4" key={pedido.id}>
              <div className="card h-100">
                <div className="card-header d-flex justify-content-between align-items-center" style={{backgroundColor:'#FFF5E1'}}>
                  <div>
                    <strong>Pedido #{pedido.numeroPedido}</strong>
                  </div>
                  {getStatusBadge(pedido.status)}
                </div>
                <div className="card-body">
                  <p className="card-text"><strong>Fecha:</strong> {formatDate(pedido.fecha)}</p>
                  {pedido.subtotal && (
                    <p className="card-text"><strong>Subtotal:</strong> ${pedido.subtotal.toLocaleString('es-CL')}</p>
                  )}
                  {pedido.descuento > 0 && (
                    <p className="card-text text-success">
                      <strong>Descuento ({pedido.descuentoInfo?.porcentaje || 0}%):</strong> -${pedido.descuento.toLocaleString('es-CL')}
                      {pedido.descuentoInfo?.descripcion && (
                        <small className="d-block text-muted">{pedido.descuentoInfo.descripcion}</small>
                      )}
                    </p>
                  )}
                  <p className="card-text"><strong>Total:</strong> <span className="h5" style={{color:'#8B4513'}}>${pedido.total.toLocaleString('es-CL')}</span></p>
                  
                  {pedido.items && pedido.items.length > 0 && (
                    <div className="mt-3">
                      <strong>Productos:</strong>
                      <ul className="list-unstyled mt-2">
                        {pedido.items.map((item, idx) => (
                          <li key={idx} className="mb-1">
                            • {item.productName || `Producto ${item.productId}`} x{item.quantity} 
                            {item.unitPrice > 0 && <span className="text-muted"> (${(item.unitPrice * item.quantity).toLocaleString('es-CL')})</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

