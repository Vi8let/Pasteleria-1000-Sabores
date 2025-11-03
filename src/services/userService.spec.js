import { seedUsers, addUser } from './userService';

describe('userService - registro', () => {
  beforeEach(() => {
    localStorage.clear();
    seedUsers();
  });

  it('arroja error si correo ya existe', () => {
    expect(() => addUser({ nombre: 'X', correo: 'cliente@gmail.com', contrasena: 'x', rol: 'usuario' }))
      .toThrow();
  });
});