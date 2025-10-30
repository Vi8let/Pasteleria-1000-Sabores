// Base en memoria (usamos imágenes desde public/assets/img)
const BASE = [
    { id:'TC001', codigo:'TC001', categoria:'Tortas Cuadradas', nombre:'Torta Cuadrada de Chocolate', precio:45000, stock:10, imagen:'/assets/img/TC001-Torta Cuadrada de Chocolate.png', descripcion:'Deliciosa torta de chocolate con capas de ganache.' },
    { id:'TC002', codigo:'TC002', categoria:'Tortas Cuadradas', nombre:'Torta Cuadrada de Frutas', precio:50000, stock:8, imagen:'/assets/img/TC002-Torta Cuadrada de Frutas.png', descripcion:'Mezcla de frutas frescas y crema chantilly.' },
    { id:'TT001', codigo:'TT001', categoria:'Tortas Circulares', nombre:'Torta Circular de Vainilla', precio:40000, stock:15, imagen:'/assets/img/TT001-Torta Circular de Vainilla.png', descripcion:'Bizcocho de vainilla clásico con crema pastelera.' },
    { id:'TT002', codigo:'TT002', categoria:'Tortas Circulares', nombre:'Torta Circular de Manjar', precio:42000, stock:12, imagen:'/assets/img/TT002-Torta Circular de Manjar.png', descripcion:'Tradicional con manjar y nueces.' },
    { id:'PI001', codigo:'PI001', categoria:'Postres Individuales', nombre:'Mousse de Chocolate', precio:5000, stock:20, imagen:'/assets/img/PI001-Mousse de Chocolate.png', descripcion:'Postre individual cremoso y suave.' },
    { id:'PI002', codigo:'PI002', categoria:'Postres Individuales', nombre:'Tiramisú Clásico', precio:5500, stock:18, imagen:'/assets/img/PI002-Tiramisú Clásico.png', descripcion:'Capas de café, mascarpone y cacao.' },
    { id:'PSA001', codigo:'PSA001', categoria:'Productos Sin Azúcar', nombre:'Torta Sin Azúcar de Naranja', precio:48000, stock:12, imagen:'/assets/img/PSA001-Torta Sin Azúcar de Naranja.png', descripcion:'Endulzada naturalmente.' },
    { id:'PSA002', codigo:'PSA002', categoria:'Productos Sin Azúcar', nombre:'Cheesecake Sin Azúcar', precio:47000, stock:10, imagen:'/assets/img/PSA002-Cheesecake Sin Azúcar.png', descripcion:'Suave y cremoso.' },
]

const LS_KEY = 'productos' // overrides admin

function getOverrides(){
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]') } catch { return [] }
}
function saveOverrides(list){ localStorage.setItem(LS_KEY, JSON.stringify(list)) }

export function getProducts() {
  const overrides = getOverrides()
  const mezclados = BASE.map(p => {
    const ov = overrides.find(o=>o.id===p.id)
    return ov ? { ...p, ...ov } : p
  }).filter(p => !p.eliminado)
  return mezclados
}

export function getProductById(id) {
  return getProducts().find(p => p.id === id)
}

// ADMIN: actualizar precio/stock u otros campos
export function upsertProductOverride(id, changes){
  const overrides = getOverrides()
  const idx = overrides.findIndex(o=>o.id===id)
  if (idx>=0) overrides[idx] = { ...overrides[idx], ...changes, id }
  else {
    const base = BASE.find(p=>p.id===id) || { id }
    overrides.push({ ...base, ...changes, id })
  }
  saveOverrides(overrides)
}

export function setProductDeleted(id, eliminado){
  upsertProductOverride(id, { eliminado: !!eliminado })
}

export function getDeletedProducts(){
  return getOverrides().filter(p=>p.eliminado)
}


