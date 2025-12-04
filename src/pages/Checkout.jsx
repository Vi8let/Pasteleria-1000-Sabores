import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCart, clearCart } from '../services/cartService.js'
import { getSessionUser } from '../services/authService.js'
import { calcularDescuentos } from '../services/discountService.js'
import { saveOrder, generateOrderNumber } from '../services/orderService.js'
import { createPayment } from '../services/paymentService.js'
import PaymentForm from '../components/Payment/PaymentForm.jsx'

export default function Checkout() {
    const navigate = useNavigate()
    const [cart, setCart] = useState([])
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const items = getCart()
        if (items.length === 0) {
            navigate('/carrito')
        }
        setCart(items)
    }, [navigate])

    const subtotal = cart.reduce((s, i) => s + i.precio * i.cantidad, 0)
    const usuario = getSessionUser()
    const { mejor } = calcularDescuentos(usuario, subtotal)
    const total = subtotal - (mejor?.monto || 0)

    const handlePaymentSubmit = async (paymentData) => {
        setIsProcessing(true)
        setError(null)

        try {
            if (!usuario) {
                throw new Error('Debes iniciar sesión para continuar.')
            }

            // 1. Crear la orden (PENDIENTE)
            const fecha = new Date().toISOString()
            const ordenData = {
                numeroPedido: generateOrderNumber(), // Fallback si el backend no lo genera
                fecha,
                usuario: {
                    nombre: usuario?.nombre,
                    correo: usuario?.correo,
                    direccion: usuario?.direccion,
                    comuna: usuario?.comuna,
                    region: usuario?.region
                },
                productos: cart,
                subtotal,
                descuento: mejor?.monto || 0,
                descuentoInfo: mejor,
                total
            }

            const savedOrder = await saveOrder(ordenData)

            // 2. Procesar el pago
            // En un flujo real, aquí enviaríamos el token de la tarjeta, etc.
            // Para simulación, enviamos los datos del formulario y el ID de la orden.
            await createPayment({
                orderId: savedOrder.id,
                amount: savedOrder.total,
                method: 'credit_card', // Simulado
                cardDetails: {
                    // No enviar datos sensibles reales al backend si no es necesario/seguro
                    // Aquí enviamos solo para simulación
                    last4: paymentData.cardNumber.slice(-4),
                    holder: paymentData.cardName
                }
            })

            // 3. Éxito
            clearCart()
            navigate('/checkout/success', { state: { order: savedOrder } })

        } catch (err) {
            console.error('Error en checkout:', err)
            setError(err.message || 'Ocurrió un error al procesar el pago.')
            // Opcional: navegar a failure si es un error fatal de pago
            // navigate('/checkout/failure')
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <div className="container">
            <h1 className="mb-4">Finalizar Compra</h1>

            <div className="row">
                <div className="col-md-7">
                    <h4 className="mb-3">Resumen del Pedido</h4>
                    <ul className="list-group mb-3">
                        {cart.map(item => (
                            <li className="list-group-item d-flex justify-content-between lh-sm" key={item.id}>
                                <div>
                                    <h6 className="my-0">{item.nombre}</h6>
                                    <small className="text-muted">Cantidad: {item.cantidad}</small>
                                </div>
                                <span className="text-muted">${(item.precio * item.cantidad).toLocaleString('es-CL')}</span>
                            </li>
                        ))}
                        {mejor?.monto > 0 && (
                            <li className="list-group-item d-flex justify-content-between bg-light">
                                <div className="text-success">
                                    <h6 className="my-0">Descuento</h6>
                                    <small>{mejor.descripcion}</small>
                                </div>
                                <span className="text-success">-${mejor.monto.toLocaleString('es-CL')}</span>
                            </li>
                        )}
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Total (CLP)</span>
                            <strong>${total.toLocaleString('es-CL')}</strong>
                        </li>
                    </ul>

                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                </div>

                <div className="col-md-5">
                    <PaymentForm onSubmit={handlePaymentSubmit} isProcessing={isProcessing} />
                </div>
            </div>
        </div>
    )
}
