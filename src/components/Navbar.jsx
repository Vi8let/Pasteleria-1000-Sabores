import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCart } from '../services/cartService.js'
import { getSessionUser, logout } from '../services/authService.js'

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0)
  const [user, setUser] = useState(getSessionUser())

  useEffect(()=>{
    const initial = getCart().reduce((s,i)=> s + i.cantidad, 0)
    setCartCount(initial)
    const onCart = (e)=> setCartCount(e.detail?.total ?? 0)
    const onSession = ()=> setUser(getSessionUser())
    window.addEventListener('cart:updated', onCart)
    window.addEventListener('session:changed', onSession)
    return ()=>{
      window.removeEventListener('cart:updated', onCart)
      window.removeEventListener('session:changed', onSession)
    }
  }, [])

  const isAdmin = user?.rol === 'admin'

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="/assets/img/logo.png" alt="Logo Pastelería 1000 Sabores" width="32" height="32" className="logo-svg" />{' '}
          Pastelería 1000 Sabores
        </Link>
        <div className="ms-auto d-flex gap-3 align-items-center">
          <Link className="nav-link" to="/productos">Productos</Link>
          {!isAdmin && <Link className="nav-link" to="/perfil">Mi Perfil</Link>}
          {!isAdmin && (
            <Link className="nav-link" to="/carrito">{cartCount>0? `🛒 Carrito (${cartCount})` : '🛒 Carrito'}</Link>
          )}
          {isAdmin && <Link className="nav-link" to="/admin">Admin</Link>}
          {user ? (
            <button className="btn btn-link nav-link" onClick={logout}>Cerrar Sesión</button>
          ) : (
            <Link className="nav-link" to="/login">Iniciar Sesión</Link>
          )}
        </div>
      </div>
    </nav>
  )
}


