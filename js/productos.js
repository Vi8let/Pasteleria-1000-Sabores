// productos.js

const productos = [
    // Tortas Cuadradas
    {
        id: 'TC001',
        codigo: 'TC001',
        categoria: 'Tortas Cuadradas',
        nombre: 'Torta Cuadrada de Chocolate',
        precio: 45000,
        descripcion: 'Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.',
        stock: 10,
        imagen: './assets/img/TC001-Torta Cuadrada de Chocolate.png',
        tamanos: ['Pequeña', 'Mediana', 'Grande'],
        personalizable: true
    },
    {
        id: 'TC002',
        codigo: 'TC002',
        categoria: 'Tortas Cuadradas',
        nombre: 'Torta Cuadrada de Frutas',
        precio: 50000,
        descripcion: 'Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.',
        stock: 8,
        imagen: './assets/img/TC002-Torta Cuadrada de Frutas.png',
        tamanos: ['Pequeña', 'Mediana', 'Grande'],
        personalizable: true
    },
    // Tortas Circulares
    {
        id: 'TT001',
        codigo: 'TT001',
        categoria: 'Tortas Circulares',
        nombre: 'Torta Circular de Vainilla',
        precio: 40000,
        descripcion: 'Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión.',
        stock: 15,
        imagen: './assets/img/TT001-Torta Circular de Vainilla.png',
        tamanos: ['Pequeña', 'Mediana', 'Grande'],
        personalizable: false
    },
    {
        id: 'TT002',
        codigo: 'TT002',
        categoria: 'Tortas Circulares',
        nombre: 'Torta Circular de Manjar',
        precio: 42000,
        descripcion: 'Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos.',
        stock: 12,
        imagen: './assets/img/TT002-Torta Circular de Manjar.png',
        tamanos: ['Pequeña', 'Mediana', 'Grande'],
        personalizable: false
    },
    // Postres Individuales
    {
        id: 'PI001',
        codigo: 'PI001',
        categoria: 'Postres Individuales',
        nombre: 'Mousse de Chocolate',
        precio: 5000,
        descripcion: 'Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate.',
        stock: 20,
        imagen: './assets/img/PI001-Mousse de Chocolate.png',
        tamanos: [],
        personalizable: false
    },
    {
        id: 'PI002',
        codigo: 'PI002',
        categoria: 'Postres Individuales',
        nombre: 'Tiramisú Clásico',
        precio: 5500,
        descripcion: 'Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida.',
        stock: 18,
        imagen: './assets/img/PI002-Tiramisú Clásico.png',
        tamanos: [],
        personalizable: false
    },
    // Productos Sin Azúcar
    {
        id: 'PSA001',
        codigo: 'PSA001',
        categoria: 'Productos Sin Azúcar',
        nombre: 'Torta Sin Azúcar de Naranja',
        precio: 48000,
        descripcion: 'Torta ligera y deliciosa, endulzada naturalmente, ideal para quienes buscan opciones más saludables.',
        stock: 8,
        imagen: './assets/img/PSA001-Torta Sin Azúcar de Naranja.png',
        tamanos: ['Pequeña', 'Mediana', 'Grande'],
        personalizable: true
    },
    {
        id: 'PSA002',
        codigo: 'PSA002',
        categoria: 'Productos Sin Azúcar',
        nombre: 'Cheesecake Sin Azúcar',
        precio: 47000,
        descripcion: 'Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa.',
        stock: 10,
        imagen: './assets/img/PSA002-Cheesecake Sin Azúcar.png',
        tamanos: ['Pequeña', 'Mediana', 'Grande'],
        personalizable: true
    },
    // Pastelería Tradicional
    {
        id: 'PT001',
        codigo: 'PT001',
        categoria: 'Pastelería Tradicional',
        nombre: 'Empanada de Manzana',
        precio: 3000,
        descripcion: 'Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda.',
        stock: 25,
        imagen: './assets/img/PT001-Empanada de Manzana.png',
        tamanos: [],
        personalizable: false
    },
    {
        id: 'PT002',
        codigo: 'PT002',
        categoria: 'Pastelería Tradicional',
        nombre: 'Tarta de Santiago',
        precio: 6000,
        descripcion: 'Tradicional tarta española hecha con almendras, azúcar, y huevos, una delicia para los amantes de los postres clásicos.',
        stock: 15,
        imagen: './assets/img/PT002-Tarta de Santiago.png',
        tamanos: [],
        personalizable: false
    },
    // Productos Sin Gluten
    {
        id: 'PG001',
        codigo: 'PG001',
        categoria: 'Productos Sin Gluten',
        nombre: 'Brownie Sin Gluten',
        precio: 4000,
        descripcion: 'Rico y denso, este brownie es perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor.',
        stock: 20,
        imagen: './assets/img/PG001-Brownie Sin Gluten.png',
        tamanos: [],
        personalizable: false
    },
    {
        id: 'PG002',
        codigo: 'PG002',
        categoria: 'Productos Sin Gluten',
        nombre: 'Pan Sin Gluten',
        precio: 3500,
        descripcion: 'Suave y esponjoso, ideal para sándwiches o para acompañar cualquier comida.',
        stock: 30,
        imagen: './assets/img/PG002-Pan Sin Gluten.png',
        tamanos: [],
        personalizable: false
    },
    // Productos Veganos
    {
        id: 'PV001',
        codigo: 'PV001',
        categoria: 'Productos Veganos',
        nombre: 'Torta Vegana de Chocolate',
        precio: 50000,
        descripcion: 'Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal, perfecta para veganos.',
        stock: 6,
        imagen: './assets/img/PV001-Torta Vegana de Chocolate.png',
        tamanos: ['Pequeña', 'Mediana', 'Grande'],
        personalizable: true
    },
    {
        id: 'PV002',
        codigo: 'PV002',
        categoria: 'Productos Veganos',
        nombre: 'Galletas Veganas de Avena',
        precio: 4500,
        descripcion: 'Crujientes y sabrosas, estas galletas son una excelente opción para un snack saludable y vegano.',
        stock: 40,
        imagen: './assets/img/PV002-Galletas Veganas de Avena.png',
        tamanos: [],
        personalizable: false
    },
    // Tortas Especiales
    {
        id: 'TE001',
        codigo: 'TE001',
        categoria: 'Tortas Especiales',
        nombre: 'Torta Especial de Cumpleaños',
        precio: 55000,
        descripcion: 'Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos.',
        stock: 5,
        imagen: './assets/img/TE001-Torta Especial de Cumpleaños.png',
        tamanos: ['Mediana', 'Grande'],
        personalizable: true
    },
    {
        id: 'TE002',
        codigo: 'TE002',
        categoria: 'Tortas Especiales',
        nombre: 'Torta Especial de Boda',
        precio: 60000,
        descripcion: 'Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda.',
        stock: 3,
        imagen: './assets/img/TE002-Torta Especial de Boda.png',
        tamanos: ['Grande'],
        personalizable: true
    }
];

// Exportar el arreglo de productos para su uso en otras partes de la aplicación
export default productos;