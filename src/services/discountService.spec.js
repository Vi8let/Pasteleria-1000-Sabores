import { calcularDescuentos } from './discountService';

describe('discountService - FELICES50', () => {
  it('aplica 10% si el código está activo', () => {
    const u = { correo: 'a@b.com', fechaNacimiento: '2000-01-01', codigoDescuento: 'FELICES50' };
    const { mejor } = calcularDescuentos(u, 10000);
    expect(mejor.porcentaje).toBe(10);
  });
});

describe('discountService - Senior', () => {
  it('aplica 50% si edad >= 50', () => {
    const u = { correo: 'x@y.com', fechaNacimiento: '1970-01-15' };
    const { mejor } = calcularDescuentos(u, 20000);
    expect(mejor.porcentaje).toBe(50);
  });
});

describe('discountService - Cumpleaños DUOC', () => {
  it('aplica descuento si es cumpleaños y correo DUOC', () => {
    const u = { 
      correo: 'alumno@duoc.cl', 
      fechaNacimiento: '1995-10-31'  // HOY ES 31/10 → ¡CUMPLEAÑOS!
    };
    const { mejor } = calcularDescuentos(u, 20000);
    expect(mejor.porcentaje).toBeGreaterThan(0);
  });
});