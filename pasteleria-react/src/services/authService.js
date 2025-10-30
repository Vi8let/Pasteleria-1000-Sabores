const SESSION_KEY = 'sessionUser'

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


