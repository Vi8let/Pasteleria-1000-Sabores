import { calcularDescuentos } from './discountService.js'

describe('discountService', () => {
  it('sin usuario no hay descuentos', () => {
    const { descuentos, mejor } = calcularDescuentos(null, 10000)
    expect(descuentos.length).toBe(0)
    expect(mejor.porcentaje).toBe(0)
  })

  it('FELICES50 aplica 10%', () => {
    const usuario = { correo: 'x@y.com', fechaNacimiento: '2000-01-01', codigoDescuento: 'FELICES50' }
    const { mejor } = calcularDescuentos(usuario, 20000)
    expect(mejor.porcentaje).toBe(10)
  })
})


