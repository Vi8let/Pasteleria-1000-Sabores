import { calcularDescuentos, calcularEdad } from './discountService.js'

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

  it('usuario senior 50+ años aplica descuento 50%', () => {
    const fechaNacimiento = '1970-01-01' // Más de 50 años
    const usuario = { correo: 'senior@test.com', fechaNacimiento }
    const edad = calcularEdad(fechaNacimiento)
    expect(edad).toBeGreaterThanOrEqual(50)
    const { mejor } = calcularDescuentos(usuario, 10000)
    expect(mejor.porcentaje).toBe(50)
    expect(mejor.descripcion).toContain('Senior 50+')
  })
})


