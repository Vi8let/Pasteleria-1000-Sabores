const CART_KEY = 'cart'

export function getCart(){
  try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]') } catch { return [] }
}

export function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
  const total = cart.reduce((s,i)=> s + i.cantidad, 0)
  window.dispatchEvent(new CustomEvent('cart:updated', { detail: { total } }))
}

export function addToCart(product, cantidad = 1){
  const cart = getCart()
  const idx = cart.findIndex(i => i.id === product.id)
  if (idx >= 0) {
    cart[idx].cantidad += cantidad
  } else {
    cart.push({ id: product.id, nombre: product.nombre, precio: product.precio, imagen: product.imagen, cantidad })
  }
  saveCart(cart)
  return cart
}

export function updateQuantity(id, delta){
  const cart = getCart()
  const idx = cart.findIndex(i => i.id === id)
  if (idx >= 0){
    cart[idx].cantidad += delta
    if (cart[idx].cantidad <= 0) cart.splice(idx, 1)
    saveCart(cart)
  }
  return cart
}

export function removeItem(id){
  const cart = getCart().filter(i => i.id !== id)
  saveCart(cart)
  return cart
}

export function clearCart(){
  saveCart([])
  return []
}


