import { clearCart, addToCart, getCart, updateQuantity, removeItem } from './cartService.js'
import { getProducts } from './productService.js'

describe('cartService', () => {
  beforeEach(() => {
    clearCart()
  })

  it('agrega items y los recupera', () => {
    const p = getProducts()[0]
    addToCart(p, 2)
    const cart = getCart()
    expect(cart.length).toBe(1)
    expect(cart[0].cantidad).toBe(2)
  })

  it('updateQuantity elimina item cuando cantidad llega a 0', () => {
    const p = getProducts()[0]
    addToCart(p, 2)
    updateQuantity(p.id, -2)
    const cart = getCart()
    expect(cart.length).toBe(0)
  })

  it('removeItem elimina un producto específico', () => {
    const p1 = getProducts()[0]
    const p2 = getProducts()[1]
    addToCart(p1, 1)
    addToCart(p2, 1)
    removeItem(p1.id)
    const cart = getCart()
    expect(cart.length).toBe(1)
    expect(cart[0].id).toBe(p2.id)
  })
})


