import { apiClient } from './apiClient.js'

/**
 * Procesa un pago para una orden
 */
export async function createPayment(paymentData) {
    try {
        // paymentData debe incluir: orderId, amount, paymentMethod, etc.
        // El backend espera POST /payments/create
        const response = await apiClient.post('/payments/create', paymentData, true)
        return response
    } catch (error) {
        console.error('Error al procesar el pago:', error)
        throw error
    }
}
