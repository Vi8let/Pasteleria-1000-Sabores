import { useState } from 'react'

export default function PaymentForm({ onSubmit, isProcessing }) {
    const [formData, setFormData] = useState({
        cardNumber: '',
        cardName: '',
        expiry: '',
        cvv: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <div className="card">
            <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Datos de Pago</h5>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="cardName" className="form-label">Nombre en la tarjeta</label>
                        <input
                            type="text"
                            className="form-control"
                            id="cardName"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleChange}
                            required
                            placeholder="Juan Pérez"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cardNumber" className="form-label">Número de tarjeta</label>
                        <input
                            type="text"
                            className="form-control"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            required
                            placeholder="0000 0000 0000 0000"
                            maxLength="19"
                        />
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="expiry" className="form-label">Vencimiento (MM/YY)</label>
                            <input
                                type="text"
                                className="form-control"
                                id="expiry"
                                name="expiry"
                                value={formData.expiry}
                                onChange={handleChange}
                                required
                                placeholder="MM/YY"
                                maxLength="5"
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="cvv" className="form-label">CVV</label>
                            <input
                                type="password"
                                className="form-control"
                                id="cvv"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleChange}
                                required
                                placeholder="123"
                                maxLength="4"
                            />
                        </div>
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-success btn-lg" disabled={isProcessing}>
                            {isProcessing ? 'Procesando...' : 'Pagar Ahora'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
