// Auth Handlers
export function isAuthenticated() {
  return getToken() !== null
}

// Token Handlers
export function getToken() {
  return localStorage.getItem('token')
}

export function setToken(token: string) {
  localStorage.setItem('token', token)
}

export function removeToken() {
  localStorage.removeItem('token')
}

// User Handlers
export function getUser() {
  return localStorage.getItem('user')
}
