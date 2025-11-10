import { clearCart, addToCart, getCart } from './cartService.js'
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
})


