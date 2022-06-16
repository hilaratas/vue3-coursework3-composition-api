export function parseLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}

export function setLocalStorage(key, value) {
  localStorage.setItem(key, value)
}