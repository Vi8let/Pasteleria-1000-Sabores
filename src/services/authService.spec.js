import { login, logout, getSessionUser, setSessionUser } from './authService.js'
import { seedUsers } from './userService.js'

describe('authService', () => {
  beforeEach(() => {
    localStorage.clear()
    seedUsers()
  })

  it('login exitoso con credenciales válidas', () => {
    const resultado = login('admin@pasteleria.com', 'admin123')
    expect(resultado.success).toBe(true)
    expect(resultado.user).toBeDefined()
    expect(resultado.user.correo).toBe('admin@pasteleria.com')
  })

  it('login fallido con credenciales inválidas', () => {
    const resultado = login('admin@pasteleria.com', 'password-incorrecto')
    expect(resultado.success).toBe(false)
    expect(resultado.message).toBe('Credenciales incorrectas')
  })

  it('logout limpia la sesión', () => {
    setSessionUser({ correo: 'test@test.com', nombre: 'Test' })
    expect(getSessionUser()).toBeDefined()
    logout()
    expect(getSessionUser()).toBeNull()
  })
})

