import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import { clearCart } from '../services/cartService.js'
import { logout } from '../services/authService.js'

describe('Navbar', () => {
  let container
  let root

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    root = ReactDOM.createRoot(container)
    localStorage.clear()
    clearCart()
    logout()
  })

  afterEach(() => {
    if (root) {
      root.unmount()
    }
    if (container && container.parentNode) {
      container.parentNode.removeChild(container)
    }
  })

  it('renderiza componente Navbar correctamente', (done) => {
    root.render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    )

    setTimeout(() => {
      const navbar = container.querySelector('.navbar')
      expect(navbar).toBeDefined()
      expect(navbar).not.toBeNull()
      done()
    }, 150)
  })

  it('muestra enlace de Productos en el navbar', (done) => {
    root.render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    )

    setTimeout(() => {
      const productosLink = container.querySelector('a[href="/productos"]')
      expect(productosLink).toBeDefined()
      expect(productosLink.textContent).toContain('Productos')
      done()
    }, 150)
  })
})

