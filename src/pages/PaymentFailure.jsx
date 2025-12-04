import { Link } from 'react-router-dom'

export default function PaymentFailure() {
    return (
        <div className="container mt-5 text-center">
            <div className="card shadow-lg p-5 border-0 rounded-3" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div className="mb-4">
                    <span style={{ fontSize: '4rem' }}>❌</span>
                </div>
                <h1 className="text-danger mb-3">Pago Fallido</h1>
                <p className="lead">Lo sentimos, no pudimos procesar tu pago. Por favor intenta nuevamente.</p>

                <div className="d-grid gap-2 d-md-block mt-4">
                    <Link to="/checkout" className="btn btn-primary me-md-2">Intentar Nuevamente</Link>
                    <Link to="/carrito" className="btn btn-outline-secondary">Volver al Carrito</Link>
                </div>
            </div>
        </div>
    )
}
