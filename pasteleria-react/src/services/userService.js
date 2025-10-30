const USERS_KEY = 'usuarios'

export function getUsers(){
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]') } catch { return [] }
}

export function saveUsers(list){
  localStorage.setItem(USERS_KEY, JSON.stringify(list))
}

export function findByEmail(correo){
  return getUsers().find(u => u.correo === correo)
}

export function addUser(user){
  const users = getUsers()
  if (users.some(u => u.correo === user.correo)){
    throw new Error('El correo ya está registrado')
  }
  users.push(user)
  saveUsers(users)
  return user
}

export function seedUsers(){
  const existing = getUsers()
  if (existing.length>0) return
  const seeds = [
    { nombre:'Admin General', correo:'admin@pasteleria.com', contrasena:'admin123', rol:'admin' },
    { nombre:'Vendedor Oficial', correo:'vendedor@gmail.com', contrasena:'vendedor123', rol:'vendedor' },
    { nombre:'Cliente Gmail', correo:'cliente@gmail.com', contrasena:'cliente123', rol:'usuario', fechaNacimiento:'1970-01-15' }
  ]
  saveUsers(seeds)
}


