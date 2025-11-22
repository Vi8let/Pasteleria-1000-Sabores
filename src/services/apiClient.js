import { API_BASE_URL } from '../config/api.js'
import { getSessionUser } from './authService.js'

/**
 * Cliente HTTP para comunicarse con el backend
 */
class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL
  }

  /**
   * Obtiene el token JWT del usuario autenticado
   */
  getToken() {
    // Primero intentar desde localStorage directo
    const token = localStorage.getItem('authToken')
    if (token) return token
    
    // Luego desde el usuario en sesión
    const user = getSessionUser()
    return user?.token || null
  }

  /**
   * Construye los headers para las peticiones
   */
  getHeaders(includeAuth = true) {
    const headers = {
      'Content-Type': 'application/json',
    }

    if (includeAuth) {
      const token = this.getToken()
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }
    }

    return headers
  }

  /**
   * Maneja errores de respuesta
   */
  async handleResponse(response) {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: response.statusText }))
      throw new Error(error.message || `Error ${response.status}: ${response.statusText}`)
    }
    return response.json()
  }

  /**
   * Realiza una petición GET
   */
  async get(endpoint, requireAuth = true) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'GET',
      headers: this.getHeaders(requireAuth),
    })
    return this.handleResponse(response)
  }

  /**
   * Realiza una petición POST
   */
  async post(endpoint, data, requireAuth = true) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(requireAuth),
      body: JSON.stringify(data),
    })
    return this.handleResponse(response)
  }

  /**
   * Realiza una petición PUT
   */
  async put(endpoint, data, requireAuth = true) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(requireAuth),
      body: JSON.stringify(data),
    })
    return this.handleResponse(response)
  }

  /**
   * Realiza una petición PATCH
   */
  async patch(endpoint, data, requireAuth = true) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PATCH',
      headers: this.getHeaders(requireAuth),
      body: JSON.stringify(data),
    })
    return this.handleResponse(response)
  }

  /**
   * Realiza una petición DELETE
   */
  async delete(endpoint, requireAuth = true) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(requireAuth),
    })
    if (response.status === 204) {
      return null
    }
    return this.handleResponse(response)
  }
}

// Instancia única del cliente API
export const apiClient = new ApiClient(API_BASE_URL)

