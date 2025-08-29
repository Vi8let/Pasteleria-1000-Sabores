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
            { id: 'TC001', codigo: 'TC001', categoria: 'Tortas Cuadradas', nombre: 'Torta Cuadrada de Chocolate', precio: 45000, descripcion: 'Deliciosa torta de chocolate.', stock: 10, imagen: 'assets/img/torta_chocolate_TC001.jpg', tamanos: ['Pequeña', 'Mediana', 'Grande'], personalizable: true },
            { id: 'TC002', codigo: 'TC002', categoria: 'Tortas Cuadradas', nombre: 'Torta Cuadrada de Frutas', precio: 50000, descripcion: 'Torta fresca de frutas.', stock: 10, imagen: 'assets/img/torta_frutas_TC002.jpg', tamanos: ['Pequeña', 'Mediana', 'Grande'], personalizable: true }
            // Agrega más productos según sea necesario
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