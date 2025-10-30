const CART_KEY = 'cart'

export function getCart(){
  try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]') } catch { return [] }
}

export function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
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


