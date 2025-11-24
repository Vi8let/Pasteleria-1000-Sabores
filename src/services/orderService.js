import { apiClient } from './apiClient.js'

/**
 * Obtiene todas las órdenes (solo ADMIN)
 */
export async function getOrders() {
  try {
    const orders = await apiClient.get('/orders', true)
    return orders
  } catch (error) {
    console.error('Error al obtener órdenes:', error)
    return []
  }
}

/**
 * Obtiene las órdenes del usuario actual
 */
export async function getMyOrders() {
  try {
    const orders = await apiClient.get('/orders/mine', true)
    return orders
  } catch (error) {
    console.error('Error al obtener mis órdenes:', error)
    return []
  }
}

/**
 * Crea una nueva orden
 */
export async function saveOrder(orderData) {
  try {
    // Convertir el formato del frontend al formato del backend
    const items = orderData.productos?.map(item => ({
      productId: parseInt(item.id) || parseInt(item.productId),
      quantity: item.cantidad || item.quantity
    })) || []

    const orderRequest = {
      items: items,
      discountAmount: orderData.descuento || 0,
      discountPercentage: orderData.descuentoInfo?.porcentaje || 0,
      discountDescription: orderData.descuentoInfo?.descripcion || null
    }

    const createdOrder = await apiClient.post('/orders', orderRequest, true)
    
    // El backend devuelve la orden con ID, fecha, etc.
    return {
      ...orderData,
      id: createdOrder.id,
      numeroPedido: `PED-${createdOrder.id}`,
      fecha: createdOrder.createdAt || new Date().toISOString(),
      status: createdOrder.status || 'PENDIENTE',
      descuento: createdOrder.discountAmount || 0,
      descuentoInfo: {
        porcentaje: createdOrder.discountPercentage || 0,
        descripcion: createdOrder.discountDescription || ''
      }
    }
  } catch (error) {
    console.error('Error al crear orden:', error)
    throw error
  }
}

/**
 * Genera un número de pedido (ya no se usa, el backend lo genera)
 */
export function generateOrderNumber() {
  return `PED-${Date.now()}-${Math.floor(Math.random()*1000)}`
}

/**
 * Actualiza el estado de una orden (solo ADMIN)
 */
export async function updateOrderStatus(orderId, status) {
  try {
    const updated = await apiClient.patch(`/orders/${orderId}/status`, { status }, true)
    return updated
  } catch (error) {
    console.error('Error al actualizar estado de orden:', error)
    throw error
  }
}
