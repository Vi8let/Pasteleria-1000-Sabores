# ERS-v1.md

# Especificación de Requisitos del Sistema (ERS) - Pastelería 1000 Sabores

## 1. Introducción
Este documento describe los requisitos funcionales y no funcionales del proyecto "Pastelería 1000 Sabores". El objetivo es crear una aplicación web que permita a los usuarios interactuar con la pastelería, realizar compras y gestionar su cuenta.

## 2. Requisitos Funcionales

### 2.1. Páginas Principales
- **index.html**: Página principal con navegación, hero y productos destacados.
- **login.html**: Página de inicio de sesión para usuarios.
- **registro.html**: Página para el registro de nuevos usuarios.
- **nosotros.html**: Información sobre la pastelería, su misión y visión.
- **contacto.html**: Formulario de contacto para consultas.
- **blogs.html**: Listado de artículos de blog.
- **blog-detalle-1.html** y **blog-detalle-2.html**: Detalles de artículos de blog.
- **productos.html**: Listado de todos los productos disponibles.
- **producto-detalle.html**: Detalle de un producto específico.
- **carrito.html**: Página que muestra los productos en el carrito de compras.

### 2.2. Funcionalidades
- **Autenticación**: Registro y login de usuarios con validaciones específicas.
- **Gestión de Productos**: Listado, creación, edición y eliminación de productos en el panel de administración.
- **Carrito de Compras**: Permitir a los usuarios añadir productos al carrito, editar cantidades y confirmar pedidos.
- **Validaciones**: Implementar validaciones en formularios de registro, login y contacto.
- **Descuentos**: Aplicar descuentos según reglas específicas (edad, cupones).

## 3. Requisitos No Funcionales

### 3.1. Usabilidad
- La interfaz debe ser intuitiva y fácil de navegar.
- Todos los formularios deben tener etiquetas adecuadas y mensajes de error claros.

### 3.2. Accesibilidad
- Implementar atributos ARIA donde sea necesario.
- Asegurar que todos los elementos sean accesibles mediante teclado.

### 3.3. Rendimiento
- La aplicación debe cargar rápidamente y ser responsiva en dispositivos móviles y de escritorio.

### 3.4. Seguridad
- Proteger las rutas del panel de administración para que solo usuarios autenticados puedan acceder.

## 4. Estructura de Datos

### 4.1. Productos
Cada producto debe tener los siguientes atributos:
- id
- código
- categoría
- nombre
- precio (número)
- descripción
- stock (inicial)
- imagen (ruta)
- tamaños (si aplica)
- personalizable (booleano)

### 4.2. Usuarios
Cada usuario debe tener los siguientes atributos:
- RUN
- nombre
- apellidos
- correo
- fecha de nacimiento (opcional)
- tipo de usuario (Administrador, Vendedor, Cliente)

## 5. Preparación para Base de Datos
Se deben incluir funciones esqueleto comentadas para futuras conexiones a una base de datos, tales como:
- `fetchProductsFromAPI()`
- `saveProductToDB()`

## 6. Conclusiones
Este documento establece los requisitos necesarios para el desarrollo de la aplicación "Pastelería 1000 Sabores". Se debe seguir esta especificación para asegurar que el producto final cumpla con las expectativas y necesidades de los usuarios.