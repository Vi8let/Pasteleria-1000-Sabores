import { useLocation, Link } from 'react-router-dom'

export default function PaymentSuccess() {
    const location = useLocation()
    const { order } = location.state || {}

    if (!order) {
        return (
            <div className="text-center mt-5">
                <h2>No se encontró información del pedido.</h2>
                <Link to="/" className="btn btn-primary mt-3">Volver al Inicio</Link>
            </div>
        )
    }

    return (
        <div className="container mt-5 text-center">
            <div className="card shadow-lg p-5 border-0 rounded-3" style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#FFF5E1' }}>
                <div className="mb-4">
                    <span style={{ fontSize: '4rem' }}>🎉</span>
                </div>
                <h1 className="text-success mb-3">¡Pago Exitoso!</h1>
                <p className="lead">Gracias por tu compra. Tu pedido ha sido procesado correctamente.</p>

                <div className="alert alert-light border mt-4 text-start">
                    <p className="mb-1"><strong>Número de Pedido:</strong> {order.numeroPedido}</p>
                    <p className="mb-1"><strong>Total Pagado:</strong> ${order.total?.toLocaleString('es-CL')}</p>
                    <p className="mb-0"><strong>Fecha:</strong> {new Date(order.fecha).toLocaleString('es-CL')}</p>
                </div>

                <p className="text-muted mt-3">Hemos enviado un correo de confirmación a {order.usuario?.correo}</p>

                <div className="d-grid gap-2 d-md-block mt-4">
                    <Link to="/pedidos" className="btn btn-primary me-md-2" style={{ backgroundColor: '#8B4513', borderColor: '#8B4513' }}>Ver Mis Pedidos</Link>
                    <Link to="/" className="btn btn-outline-secondary">Seguir Comprando</Link>
                </div>
            </div>
        </div>
    )
}
