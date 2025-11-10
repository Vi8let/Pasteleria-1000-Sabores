const SESSION_KEY = 'sessionUser'
import { getUsers } from './userService.js'

export function getSessionUser(){
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null') } catch { return null }
}

export function setSessionUser(user){
  localStorage.setItem(SESSION_KEY, JSON.stringify(user))
  window.dispatchEvent(new CustomEvent('session:changed', { detail: user }))
}

export function logout(){
  localStorage.removeItem(SESSION_KEY)
  window.dispatchEvent(new CustomEvent('session:changed', { detail: null }))
}

export function login(email, password){
  const users = getUsers()
  const user = users.find(u => u.correo === email && u.contrasena === password)
  if (user){
    setSessionUser(user)
    return { success:true, user }
  }
  return { success:false, message:'Credenciales incorrectas' }
}


