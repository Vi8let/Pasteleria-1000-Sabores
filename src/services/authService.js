import { apiClient } from './apiClient.js'

const SESSION_KEY = 'sessionUser'
const TOKEN_KEY = 'authToken'

/**
 * Obtiene el usuario de la sesión actual
 */
export function getSessionUser(){
  try { 
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null') 
  } catch { 
    return null 
  }
}

/**
 * Guarda el usuario en la sesión
 */
export function setSessionUser(user){
  localStorage.setItem(SESSION_KEY, JSON.stringify(user))
  if (user?.token) {
    localStorage.setItem(TOKEN_KEY, user.token)
  }
  window.dispatchEvent(new CustomEvent('session:changed', { detail: user }))
}

/**
 * Obtiene el token JWT
 */
export function getToken(){
  return localStorage.getItem(TOKEN_KEY) || getSessionUser()?.token
}

/**
 * Cierra la sesión del usuario
 */
export function logout(){
  localStorage.removeItem(SESSION_KEY)
  localStorage.removeItem(TOKEN_KEY)
  window.dispatchEvent(new CustomEvent('session:changed', { detail: null }))
}

/**
 * Obtiene el perfil del usuario autenticado
 */
export async function getProfile(){
  try {
    const response = await apiClient.get('/auth/me', true)
    return {
      correo: response.email,
      email: response.email,
      rol: response.role?.toLowerCase() || 'usuario',
      role: response.role,
      nombre: response.fullName,
      run: response.run || '',
      fechaNacimiento: response.fechaNacimiento || '',
      region: response.region || '',
      comuna: response.comuna || '',
      direccion: response.direccion || '',
      codigoDescuento: response.codigoDescuento || null
    }
  } catch (error) {
    console.error('Error al obtener perfil:', error)
    return null
  }
}

/**
 * Inicia sesión en el backend
 */
export async function login(email, password){
  try {
    const response = await apiClient.post('/auth/login', { email, password }, false)
    
    if (response.ok && response.token) {
      // Obtener perfil completo para tener el nombre
      let profile = null
      try {
        // Guardar token temporalmente para obtener perfil
        localStorage.setItem('authToken', response.token)
        profile = await getProfile()
      } catch (e) {
        console.warn('No se pudo obtener perfil:', e)
      }
      
      const user = {
        correo: response.email,
        email: response.email,
        rol: response.role === 'ADMIN' ? 'admin' : 'usuario',
        role: response.role,
        token: response.token,
        nombre: profile?.nombre || response.email.split('@')[0]
      }
      setSessionUser(user)
      return { success: true, user }
    }
    
    return { success: false, message: 'Credenciales incorrectas' }
  } catch (error) {
    console.error('Error en login:', error)
    return { success: false, message: error.message || 'Error al iniciar sesión' }
  }
}

/**
 * Registra un nuevo usuario
 */
export async function register(userData){
  try {
    const registerData = {
      email: userData.correo || userData.email,
      password: userData.contrasena || userData.password,
      fullName: userData.nombre || userData.fullName,
      run: userData.run || null,
      fechaNacimiento: userData.fechaNacimiento || null,
      region: userData.region || null,
      comuna: userData.comuna || null,
      direccion: userData.direccion || null,
      codigoPromocion: userData.codigoPromocion || null
    }
    
    const response = await apiClient.post('/auth/register', registerData, false)
    
    if (response.ok && response.token) {
      // Obtener perfil completo para tener todos los datos
      let profile = null
      try {
        localStorage.setItem('authToken', response.token)
        profile = await getProfile()
      } catch (e) {
        console.warn('No se pudo obtener perfil:', e)
      }
      
      const user = {
        correo: response.email,
        email: response.email,
        rol: response.role === 'ADMIN' ? 'admin' : 'usuario',
        role: response.role,
        token: response.token,
        nombre: profile?.nombre || registerData.fullName,
        run: profile?.run || userData.run || '',
        fechaNacimiento: profile?.fechaNacimiento || userData.fechaNacimiento || '',
        region: profile?.region || userData.region || '',
        comuna: profile?.comuna || userData.comuna || '',
        direccion: profile?.direccion || userData.direccion || '',
        codigoDescuento: profile?.codigoDescuento || userData.codigoPromocion || null
      }
      setSessionUser(user)
      return { success: true, user }
    }
    
    return { success: false, message: 'Error al registrar usuario' }
  } catch (error) {
    console.error('Error en register:', error)
    return { success: false, message: error.message || 'Error al registrar usuario' }
  }
}
