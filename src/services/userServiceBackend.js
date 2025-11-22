import { apiClient } from './apiClient.js'

/**
 * Obtiene todos los usuarios (solo ADMIN)
 */
export async function getAllUsers() {
  try {
    const users = await apiClient.get('/users', true)
    return users.map(user => ({
      id: user.id || user.email,
      correo: user.email,
      nombre: user.fullName,
      rol: user.role?.toLowerCase() || 'usuario',
      role: user.role,
      run: user.run || '',
      fechaNacimiento: user.fechaNacimiento || '',
      region: user.region || '',
      comuna: user.comuna || '',
      direccion: user.direccion || '',
      codigoDescuento: user.codigoDescuento || null
    }))
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    return []
  }
}

/**
 * Elimina un usuario (solo ADMIN)
 */
export async function deleteUser(userId) {
  try {
    await apiClient.delete(`/users/${userId}`, true)
    return true
  } catch (error) {
    console.error('Error al eliminar usuario:', error)
    throw error
  }
}

/**
 * Actualiza el código promocional de un usuario (solo ADMIN)
 */
export async function updatePromotionCode(userId, codigoPromocion) {
  try {
    const updated = await apiClient.patch(`/users/${userId}/promotion-code`, { codigoPromocion }, true)
    return {
      id: updated.id || updated.email,
      correo: updated.email,
      nombre: updated.fullName,
      rol: updated.role?.toLowerCase() || 'usuario',
      role: updated.role,
      run: updated.run || '',
      fechaNacimiento: updated.fechaNacimiento || '',
      region: updated.region || '',
      comuna: updated.comuna || '',
      direccion: updated.direccion || '',
      codigoDescuento: updated.codigoDescuento || null
    }
  } catch (error) {
    console.error('Error al actualizar código promocional:', error)
    throw error
  }
}

