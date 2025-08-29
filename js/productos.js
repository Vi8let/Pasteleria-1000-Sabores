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
        imagen: 'assets/img/torta_chocolate_TC001.jpg',
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
        imagen: 'assets/img/torta_frutas_TC002.jpg',
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
        imagen: 'assets/img/torta_vainilla_TT001.jpg',
        tamanos: ['Pequeña', 'Mediana', 'Grande'],
        personalizable: false
    },
    {
        id: 'TT002',
        codigo: 'TT002',
        categoria: 'Tortas Circulares',
        nombre: 'Torta Circular de Manjar',
        precio: 42000,
        descripcion: 'Irresistible torta circular de manjar, un deleite para los sentidos.',
        stock: 5,
        imagen: 'assets/img/torta_manjar_TT002.jpg',
        tamanos: ['Pequeña', 'Mediana', 'Grande'],
        personalizable: true
    },
    {
        id: 'PI001',
        codigo: 'PI001',
        categoria: 'Postres Individuales',
        nombre: 'Mousse de Chocolate',
        precio: 5000,
        descripcion: 'Suave y cremoso mousse de chocolate, un postre que encanta.',
        stock: 20,
        imagen: 'assets/img/mousse_chocolate_PI001.jpg',
        tamanos: [],
        personalizable: false
    },
    {
        id: 'PI002',
        codigo: 'PI002',
        categoria: 'Postres Individuales',
        nombre: 'Tiramisú Clásico',
        precio: 5500,
        descripcion: 'Tradicional tiramisú, un clásico italiano que no puedes dejar pasar.',
        stock: 18,
        imagen: 'assets/img/tiramisu_PI002.jpg',
        tamanos: [],
        personalizable: false
    },
    {
        id: 'PSA001',
        codigo: 'PSA001',
        categoria: 'Productos Sin Azúcar',
        nombre: 'Torta Sin Azúcar de Naranja',
        precio: 48000,
        descripcion: 'Deliciosa torta sin azúcar, con un toque de naranja.',
        stock: 12,
        imagen: 'assets/img/torta_sin_azucar_naranja_PSA001.jpg',
        tamanos: ['Pequeña', 'Mediana', 'Grande'],
        personalizable: true
    },
    {
        id: 'PSA002',
        codigo: 'PSA002',
        categoria: 'Productos Sin Azúcar',
        nombre: 'Cheesecake Sin Azúcar',
        precio: 47000,
        descripcion: 'Un cheesecake cremoso sin azúcar, ideal para cuidar la línea.',
        stock: 10,
        imagen: 'assets/img/cheesecake_sin_azucar_PSA002.jpg',
        tamanos: ['Pequeña', 'Mediana'],
        personalizable: true
    },
    {
        id: 'PT001',
        codigo: 'PT001',
        categoria: 'Pastelería Tradicional',
        nombre: 'Empanada de Manzana',
        precio: 3000,
        descripcion: 'Empanada de manzana, un clásico de la repostería tradicional.',
        stock: 25,
        imagen: 'assets/img/empanada_manzana_PT001.jpg',
        tamanos: [],
        personalizable: false
    },
    {
        id: 'PT002',
        codigo: 'PT002',
        categoria: 'Pastelería Tradicional',
        nombre: 'Tarta de Santiago',
        precio: 6000,
        descripcion: 'Deliciosa tarta de Santiago, con un sabor único.',
        stock: 15,
        imagen: 'assets/img/tarta_santiago_PT002.jpg',
        tamanos: [],
        personalizable: false
    },
    {
        id: 'PG001',
        codigo: 'PG001',
        categoria: 'Productos Sin Gluten',
        nombre: 'Brownie Sin Gluten',
        precio: 4000,
        descripcion: 'Brownie delicioso, sin gluten y lleno de sabor.',
        stock: 30,
        imagen: 'assets/img/brownie_sin_gluten_PG001.jpg',
        tamanos: [],
        personalizable: false
    },
    {
        id: 'PG002',
        codigo: 'PG002',
        categoria: 'Productos Sin Gluten',
        nombre: 'Pan Sin Gluten',
        precio: 3500,
        descripcion: 'Pan fresco y sin gluten, ideal para todos.',
        stock: 20,
        imagen: 'assets/img/pan_sin_gluten_PG002.jpg',
        tamanos: [],
        personalizable: false
    },
    {
        id: 'PV001',
        codigo: 'PV001',
        categoria: 'Productos Vegana',
        nombre: 'Torta Vegana de Chocolate',
        precio: 50000,
        descripcion: 'Torta vegana de chocolate, deliciosa y saludable.',
        stock: 8,
        imagen: 'assets/img/torta_vegana_chocolate_PV001.jpg',
        tamanos: ['Pequeña', 'Mediana', 'Grande'],
        personalizable: true
    },
    {
        id: 'PV002',
        codigo: 'PV002',
        categoria: 'Productos Vegana',
        nombre: 'Galletas Veganas de Avena',
        precio: 4500,
        descripcion: 'Galletas de avena veganas, perfectas para un snack.',
        stock: 25,
        imagen: 'assets/img/galletas_veganas_PV002.jpg',
        tamanos: [],
        personalizable: false
    },
    {
        id: 'TE001',
        codigo: 'TE001',
        categoria: 'Tortas Especiales',
        nombre: 'Torta Especial de Cumpleaños',
        precio: 55000,
        descripcion: 'Torta especial para cumpleaños, personalizable con mensaje.',
        stock: 5,
        imagen: 'assets/img/torta_cumpleanos_TE001.jpg',
        tamanos: ['Pequeña', 'Mediana', 'Grande'],
        personalizable: true
    },
    {
        id: 'TE002',
        codigo: 'TE002',
        categoria: 'Tortas Especiales',
        nombre: 'Torta Especial de Boda',
        precio: 60000,
        descripcion: 'Torta especial para bodas, un toque de elegancia.',
        stock: 3,
        imagen: 'assets/img/torta_boda_TE002.jpg',
        tamanos: ['Pequeña', 'Mediana', 'Grande'],
        personalizable: true
    }
];

// Exportar el arreglo de productos para su uso en otras partes de la aplicación
export default productos;