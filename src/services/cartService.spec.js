// src/services/cartService.spec.js
import { addToCart, getCart, updateQuantity, clearCart } from './cartService';

describe('cartService - flujo básico', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('agrega producto nuevo con cantidad 1', () => {
    addToCart({ id: 'P1', nombre: 'Prod 1', precio: 1000, imagen: '/x.png' }, 1);
    const cart = getCart();
    expect(cart.length).toBe(1);
    expect(cart[0].id).toBe('P1');
    expect(cart[0].cantidad).toBe(1);
  });

  it('si el producto existe, incrementa la cantidad', () => {
    addToCart({ id: 'P1', nombre: 'Prod 1', precio: 1000, imagen: '/x.png' }, 1);
    addToCart({ id: 'P1', nombre: 'Prod 1', precio: 1000, imagen: '/x.png' }, 2);
    const cart = getCart();
    expect(cart[0].cantidad).toBe(3);
  });

  it('al restar hasta 0, elimina el item usando updateQuantity', () => {
    addToCart({ id: 'P1', nombre: 'Prod 1', precio: 1000, imagen: '/x.png' }, 2);
    updateQuantity('P1', -2);
    const cart = getCart();
    expect(cart.length).toBe(0);
  });

  it('clearCart deja el carrito vacío', () => {
    addToCart({ id: 'P1', nombre: 'Prod 1', precio: 1000, imagen: '/x.png' }, 1);
    clearCart();
    expect(getCart().length).toBe(0);
  });
});
