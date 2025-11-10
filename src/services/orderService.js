const ORDERS_KEY = 'ordenes'

export function getOrders(){
  try { return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]') } catch { return [] }
}

export function saveOrder(order){
  const orders = getOrders()
  orders.push(order)
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
}

export function generateOrderNumber(){
  return `PED-${Date.now()}-${Math.floor(Math.random()*1000)}`
}


