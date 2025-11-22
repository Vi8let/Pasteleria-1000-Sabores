import { apiClient } from './apiClient.js'

// Función auxiliar para mapear productos del backend al formato del frontend
function mapProductFromBackend(product) {
  return {
    id: product.id?.toString(),
    codigo: product.code || `P${product.id}`,
    categoria: product.category || 'Sin categoría',
    nombre: product.name,
    precio: product.price,
    stock: product.stock,
    imagen: product.imageUrl,
    descripcion: product.description
  }
}

// Función auxiliar para mapear productos del frontend al formato del backend
function mapProductToBackend(product) {
  return {
    name: product.nombre,
    description: product.descripcion || '',
    price: product.precio,
    imageUrl: product.imagen,
    category: product.categoria || 'General',
    stock: product.stock
  }
}

/**
 * Obtiene todos los productos del backend
 */
export async function getProducts() {
  try {
    const products = await apiClient.get('/products', false)
    return products.map(mapProductFromBackend)
  } catch (error) {
    console.error('Error al obtener productos:', error)
    // Fallback a datos locales si el backend falla
    return []
  }
}

/**
 * Obtiene un producto por ID
 */
export async function getProductById(id) {
  try {
    // El backend no tiene endpoint por ID, buscamos en la lista
    const products = await getProducts()
    return products.find(p => p.id === id?.toString())
  } catch (error) {
    console.error('Error al obtener producto:', error)
    return null
  }
}

/**
 * Crea un nuevo producto (solo ADMIN)
 */
export async function createProduct(product) {
  try {
    const productData = mapProductToBackend(product)
    const created = await apiClient.post('/products', productData, true)
    return mapProductFromBackend(created)
  } catch (error) {
    console.error('Error al crear producto:', error)
    throw error
  }
}

// Alias para compatibilidad
export const upsertProduct = createProduct

/**
 * Actualiza un producto (solo ADMIN)
 */
export async function updateProduct(id, changes) {
  try {
    const productData = mapProductToBackend(changes)
    const updated = await apiClient.put(`/products/${id}`, productData, true)
    return mapProductFromBackend(updated)
  } catch (error) {
    console.error('Error al actualizar producto:', error)
    throw error
  }
}

/**
 * Elimina un producto (solo ADMIN)
 */
export async function deleteProduct(id) {
  try {
    await apiClient.delete(`/products/${id}`, true)
    return true
  } catch (error) {
    console.error('Error al eliminar producto:', error)
    throw error
  }
}

// Mantener compatibilidad con código existente
export function upsertProductOverride(id, changes) {
  // Para compatibilidad, pero debería usar updateProduct
  return updateProduct(id, changes).catch(() => {
    console.warn('No se pudo actualizar producto en backend, usando localStorage')
  })
}

export function setProductDeleted(id, eliminado) {
  if (eliminado) {
    return deleteProduct(id).catch(() => {
      console.warn('No se pudo eliminar producto en backend')
    })
  }
  // Reactivar no está implementado en el backend, se necesitaría un endpoint
  return Promise.resolve()
}

export function getDeletedProducts() {
  // El backend no tiene endpoint para productos eliminados
  // Se podría implementar con un campo "deleted" o similar
  return Promise.resolve([])
}
