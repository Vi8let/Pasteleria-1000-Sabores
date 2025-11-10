export function esUsuarioDuoc(correo){
  return correo && (correo.includes('@duoc.cl') || correo.includes('@profesor.duoc.cl'))
}

export function esCumpleanos(fechaNacimiento){
  if (!fechaNacimiento) return false
  const hoy = new Date()
  const nacimiento = new Date(fechaNacimiento)
  return hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() === nacimiento.getDate()
}

export function calcularEdad(fechaNacimiento){
  if (!fechaNacimiento) return 0
  const hoy = new Date()
  const nacimiento = new Date(fechaNacimiento)
  let edad = hoy.getFullYear() - nacimiento.getFullYear()
  const mes = hoy.getMonth() - nacimiento.getMonth()
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) edad--
  return edad
}

// Devuelve lista de descuentos posibles y luego el mejor.
export function calcularDescuentos(usuario, subtotal){
  const descuentos = []
  if (!usuario || subtotal <= 0) return { descuentos, mejor: { porcentaje:0, monto:0, descripcion:'' } }

  if (usuario.codigoDescuento === 'FELICES50'){
    descuentos.push({ tipo:'felices50', porcentaje:10, monto: subtotal*0.1, descripcion:'🎉 FELICES50 (10%)' })
  }

  if (esUsuarioDuoc(usuario.correo) && esCumpleanos(usuario.fechaNacimiento)){
    // En esta base simple, consideramos 1 torta gratis equivalente al 20% del subtotal si existe
    descuentos.push({ tipo:'cumpleanos', porcentaje:20, monto: subtotal*0.2, descripcion:'🎂 Cumpleaños DUOC (torta gratis aprox.)' })
  }

  if (calcularEdad(usuario.fechaNacimiento) >= 50){
    descuentos.push({ tipo:'senior', porcentaje:50, monto: subtotal*0.5, descripcion:'👴 Senior 50+ (50%)' })
  }

  const mejor = descuentos.reduce((max, d) => d.porcentaje > max.porcentaje ? d : max, { porcentaje:0, monto:0, descripcion:'' })
  return { descuentos, mejor }
}


