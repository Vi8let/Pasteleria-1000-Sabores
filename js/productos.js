// productos.js

const productos = [
    {
        id: 'TC001',
        codigo: 'TC001',
        categoria: 'Tortas Cuadradas',
        nombre: 'Torta Cuadrada de Chocolate',
        precio: 45000,
        descripcion: 'Deliciosa torta cuadrada de chocolate, perfecta para cualquier ocasión.',
        stock: 10,
        imagen: './assets/img/torta_chocolate.png',
        tamanos: ['Pequeña', 'Mediana', 'Grande'],
        personalizable: true
    },
    {
        id: 'TC002',
        codigo: 'TC002',
        categoria: 'Tortas Cuadradas',
        nombre: 'Torta Cuadrada de Frutas',
        precio: 50000,
        descripcion: 'Fresca torta cuadrada de frutas, ideal para los amantes de lo natural.',
        stock: 8,
        imagen: './assets/img/torta_frutas.png',
        tamanos: ['Pequeña', 'Mediana', 'Grande'],
        personalizable: true
    },
    {
        id: 'TT001',
        codigo: 'TT001',
        categoria: 'Tortas Circulares',
        nombre: 'Torta Circular de Vainilla',
        precio: 40000,
        descripcion: 'Clásica torta circular de vainilla, suave y esponjosa.',
        stock: 15,
        imagen: './assets/img/torta_vainilla.png',
        tamanos: ['Pequeña', 'Mediana', 'Grande'],
        personalizable: false
    },
    {
        id: 'PI001',
        codigo: 'PI001',
        categoria: 'Postres Individuales',
        nombre: 'Mousse de Chocolate',
        precio: 5000,
        descripcion: 'Suave y cremoso mousse de chocolate, un postre que encanta.',
        stock: 20,
        imagen: './assets/img/mousse_chocolate.png',
        tamanos: [],
        personalizable: false
    }
];

// Exportar el arreglo de productos para su uso en otras partes de la aplicación
export default productos;