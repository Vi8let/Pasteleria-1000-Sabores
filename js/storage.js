// Función para obtener productos del LocalStorage
function getProducts() {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
}

// Función para guardar un producto en el LocalStorage
function saveProduct(product) {
    const products = getProducts();
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
}

// Función para actualizar un producto en el LocalStorage
function updateProduct(id, updatedProduct) {
    const products = getProducts();
    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        localStorage.setItem('products', JSON.stringify(products));
    }
}

// Función para eliminar un producto del LocalStorage
function deleteProduct(id) {
    const products = getProducts();
    const filteredProducts = products.filter(product => product.id !== id);
    localStorage.setItem('products', JSON.stringify(filteredProducts));
}

// Función para obtener usuarios del LocalStorage
function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

// Función para guardar un usuario en el LocalStorage
function saveUser(user) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

// Función para obtener el usuario de sesión del LocalStorage
function getSessionUser() {
    return localStorage.getItem('sessionUser') ? JSON.parse(localStorage.getItem('sessionUser')) : null;
}

// Función para establecer el usuario de sesión en el LocalStorage
function setSessionUser(user) {
    localStorage.setItem('sessionUser', JSON.stringify(user));
}

// Función para limpiar la sesión del LocalStorage
function clearSession() {
    localStorage.removeItem('sessionUser');
}

// Función para obtener el carrito del LocalStorage
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Función para guardar el carrito en el LocalStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para limpiar el carrito del LocalStorage
function clearCart() {
    localStorage.removeItem('cart');
}

// Función para inyectar datos iniciales de productos si el LocalStorage está vacío
function seedInitialData() {
    if (getProducts().length === 0) {
        const initialProducts = [
            { id: 'TC001', codigo: 'TC001', categoria: 'Tortas Cuadradas', nombre: 'Torta Cuadrada de Chocolate', precio: 45000, descripcion: 'Deliciosa torta de chocolate.', stock: 10, imagen: 'assets/img/torta_chocolate_TC001.jpg', tamanos: [], personalizable: false },
            { id: 'TC002', codigo: 'TC002', categoria: 'Tortas Cuadradas', nombre: 'Torta Cuadrada de Frutas', precio: 50000, descripcion: 'Torta fresca de frutas.', stock: 10, imagen: 'assets/img/torta_frutas_TC002.jpg', tamanos: [], personalizable: false },
            // Agrega más productos según sea necesario
        ];
        localStorage.setItem('products', JSON.stringify(initialProducts));
    }
}

// Funciones esqueleto para futura conexión a una base de datos
// function fetchProductsFromAPI() {
//     // Implementar lógica para obtener productos desde una API
// }

// function saveProductToDB(product) {
//     // Implementar lógica para guardar un producto en la base de datos
// }