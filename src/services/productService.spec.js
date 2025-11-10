import { getProducts, getProductById } from './productService.js'

describe('productService', () => {
  it('debe retornar catálogo con al menos 1 producto', () => {
    const lista = getProducts()
    expect(Array.isArray(lista)).toBeTrue()
    expect(lista.length).toBeGreaterThan(0)
  })

  it('debe encontrar por id', () => {
    const lista = getProducts()
    const uno = lista[0]
    const byId = getProductById(uno.id)
    expect(byId).toBeDefined()
    expect(byId.id).toBe(uno.id)
  })
})


