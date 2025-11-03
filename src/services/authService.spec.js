import { login } from './authService';
import { seedUsers } from './userService';

describe('authService - login', () => {
  beforeEach(() => {
    localStorage.clear();
    seedUsers();
  });

  it('retorna success=true para credenciales válidas', () => {
    const res = login('cliente@gmail.com', 'cliente123');
    expect(res.success).toBeTrue();
    expect(res.user.correo).toBe('cliente@gmail.com');
  });
});