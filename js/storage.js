// storage.js

// Productos
function getProducts() {
    const products = localStorage.getItem('productos');
    return products ? JSON.parse(products) : [];
}

function saveProduct(product) {
    const products = getProducts();
    products.push(product);
    localStorage.setItem('productos', JSON.stringify(products));
}

function updateProduct(id, updatedProduct) {
    const products = getProducts();
    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        localStorage.setItem('productos', JSON.stringify(products));
    }
}

function deleteProduct(id) {
    const products = getProducts();
    const filteredProducts = products.filter(product => product.id !== id);
    localStorage.setItem('productos', JSON.stringify(filteredProducts));
}

// Usuarios
function getUsers() {
    const users = localStorage.getItem('usuarios');
    return users ? JSON.parse(users) : [];
}

function saveUser(user) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('usuarios', JSON.stringify(users));
}

// Sesión
function getSessionUser() {
    return localStorage.getItem('sessionUser') ? JSON.parse(localStorage.getItem('sessionUser')) : null;
}

function setSessionUser(user) {
    localStorage.setItem('sessionUser', JSON.stringify(user));
}

function clearSession() {
    localStorage.removeItem('sessionUser');
}

// Carrito
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function clearCart() {
    localStorage.removeItem('cart');
}

// Semilla inicial de productos si el LocalStorage está vacío
function seedInitialData() {
    if (getProducts().length === 0) {
        const initialProducts = [
            { id: 'TC001', codigo: 'TC001', categoria: 'Tortas Cuadradas', nombre: 'Torta Cuadrada de Chocolate', precio: 45000, descripcion: 'Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.', stock: 10, imagen: 'assets/img/TC001-Torta Cuadrada de Chocolate.png', tamanos: ['Pequeña', 'Mediana', 'Grande'], personalizable: true },
            { id: 'TC002', codigo: 'TC002', categoria: 'Tortas Cuadradas', nombre: 'Torta Cuadrada de Frutas', precio: 50000, descripcion: 'Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.', stock: 8, imagen: 'assets/img/TC002-Torta Cuadrada de Frutas.png', tamanos: ['Pequeña', 'Mediana', 'Grande'], personalizable: true },
            { id: 'TT001', codigo: 'TT001', categoria: 'Tortas Circulares', nombre: 'Torta Circular de Vainilla', precio: 40000, descripcion: 'Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión.', stock: 15, imagen: 'assets/img/TT001-Torta Circular de Vainilla.png', tamanos: ['Pequeña', 'Mediana', 'Grande'], personalizable: false },
            { id: 'TT002', codigo: 'TT002', categoria: 'Tortas Circulares', nombre: 'Torta Circular de Manjar', precio: 42000, descripcion: 'Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos.', stock: 12, imagen: 'assets/img/TT002-Torta Circular de Manjar.png', tamanos: ['Pequeña', 'Mediana', 'Grande'], personalizable: false },
            { id: 'PI001', codigo: 'PI001', categoria: 'Postres Individuales', nombre: 'Mousse de Chocolate', precio: 5000, descripcion: 'Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate.', stock: 20, imagen: 'assets/img/PI001-Mousse de Chocolate.png', tamanos: [], personalizable: false },
            { id: 'PI002', codigo: 'PI002', categoria: 'Postres Individuales', nombre: 'Tiramisú Clásico', precio: 5500, descripcion: 'Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida.', stock: 18, imagen: 'assets/img/PI002-Tiramisú Clásico.png', tamanos: [], personalizable: false }
        ];
        localStorage.setItem('productos', JSON.stringify(initialProducts));
    }
}

// Exportar funciones para uso en otros módulos
export {
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct,
    getUsers,
    saveUser,
    getSessionUser,
    setSessionUser,
    clearSession,
    getCart,
    saveCart,
    clearCart,
    seedInitialData
};