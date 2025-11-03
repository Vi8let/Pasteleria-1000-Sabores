import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renderiza el enlace Carrito', (done) => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const root = ReactDOM.createRoot(div);
    root.render(<BrowserRouter><Navbar /></BrowserRouter>);
    setTimeout(() => {
      expect(div.textContent).toContain('Carrito');
      root.unmount();
      document.body.removeChild(div);
      done();
    }, 100);
  });
});