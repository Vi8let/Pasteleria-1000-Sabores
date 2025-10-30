import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#FFF5E1' }}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="/assets/img/logo.png" alt="Logo Pastelería 1000 Sabores" width="32" height="32" className="align-text-top" />{' '}
          Pastelería 1000 Sabores
        </Link>
        <div className="ms-auto d-flex gap-3">
          <Link className="nav-link" to="/productos">Productos</Link>
          <Link className="nav-link" to="/perfil">Mi Perfil</Link>
          <Link className="nav-link" to="/carrito">🛒 Carrito</Link>
          <Link className="nav-link" to="/login">Iniciar Sesión</Link>
        </div>
      </div>
    </nav>
  )
}


