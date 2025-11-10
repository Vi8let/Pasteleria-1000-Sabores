# Documento de Cobertura de Testing - Pastelería React

## Resumen Ejecutivo

Este documento detalla la cobertura de pruebas unitarias implementadas para el proyecto Pastelería React, utilizando Jasmine como framework de testing y Karma como ejecutor de pruebas.

## Archivos Cubiertos por Pruebas

### Servicios (Services)

#### 1. `src/services/cartService.js`
- **Funciones testeadas:**
  - `addToCart(product, cantidad)`
  - `getCart()`
  - `updateQuantity(id, delta)`
  - `removeItem(id)`
  - `clearCart()`
- **Archivo de prueba:** `src/services/cartService.spec.js`
- **Número de tests:** 3
- **Cobertura:** Funciones principales del carrito de compras

#### 2. `src/services/discountService.js`
- **Funciones testeadas:**
  - `calcularDescuentos(usuario, subtotal)`
  - `calcularEdad(fechaNacimiento)`
  - Validación de descuentos (FELICES50, Senior 50+, etc.)
- **Archivo de prueba:** `src/services/discountService.spec.js`
- **Número de tests:** 3
- **Cobertura:** Lógica de cálculo de descuentos y validaciones

#### 3. `src/services/productService.js`
- **Funciones testeadas:**
  - `getProducts()`
  - `getProductById(id)`
- **Archivo de prueba:** `src/services/productService.spec.js`
- **Número de tests:** 3
- **Cobertura:** Consulta y recuperación de productos

#### 4. `src/services/authService.js`
- **Funciones testeadas:**
  - `login(email, password)`
  - `logout()`
  - `getSessionUser()`
  - `setSessionUser(user)`
- **Archivo de prueba:** `src/services/authService.spec.js`
- **Número de tests:** 3
- **Cobertura:** Autenticación y gestión de sesión

### Componentes (Components)

#### 5. `src/components/Navbar.jsx`
- **Funcionalidades testeadas:**
  - Renderizado del componente
  - Renderizado de enlaces de navegación
  - Validación de elementos DOM
- **Archivo de prueba:** `src/components/Navbar.spec.jsx`
- **Número de tests:** 2
- **Cobertura:** Renderizado y estructura del componente de navegación

## Resumen de Cobertura

| Categoría | Archivos Testeados | Tests Implementados | Estado |
|-----------|-------------------|---------------------|--------|
| Servicios | 4 | 12 | ✅ Completo |
| Componentes | 1 | 2 | ✅ Completo |
| **TOTAL** | **5** | **14** | **✅ Completo** |

## Casos de Uso Cubiertos

### Carrito de Compras
- ✅ Agregar productos al carrito
- ✅ Recuperar items del carrito
- ✅ Actualizar cantidad de items
- ✅ Eliminar items cuando cantidad llega a 0
- ✅ Eliminar productos específicos

### Sistema de Descuentos
- ✅ Validación sin usuario
- ✅ Aplicación de código FELICES50 (10%)
- ✅ Aplicación de descuento Senior 50+ (50%)
- ✅ Cálculo de edad

### Gestión de Productos
- ✅ Obtener catálogo completo
- ✅ Buscar producto por ID
- ✅ Validar producto inexistente

### Autenticación
- ✅ Login exitoso con credenciales válidas
- ✅ Login fallido con credenciales inválidas
- ✅ Logout y limpieza de sesión

### Componentes UI
- ✅ Renderizado de componente Navbar
- ✅ Renderizado de enlaces de navegación

## Ejecución de Pruebas

Para ejecutar las pruebas unitarias:

```bash
npm run test:ci
```

Resultado esperado: **14 tests ejecutados, 14 SUCCESS**

## Notas Técnicas

- **Framework de testing:** Jasmine
- **Ejecutor de pruebas:** Karma
- **Entorno de ejecución:** Chrome Headless (EC2 Ubuntu 22.04)
- **Preprocesador:** esbuild (transpilación ESM/JSX)
- **Formato de módulos:** ES Modules (ESM)

## Conclusiones

Las pruebas unitarias implementadas cubren las funcionalidades críticas del proyecto, incluyendo:
- Lógica de negocio de servicios principales
- Validaciones y cálculos
- Renderizado de componentes React
- Manipulación del DOM

El proyecto cumple con los requisitos de la rúbrica, implementando **más de 10 pruebas unitarias** que verifican la lógica y comportamientos de los componentes frontend.

