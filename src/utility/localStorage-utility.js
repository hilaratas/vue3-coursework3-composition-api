export function parseLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}

export function setLocalStorage(key, value) {
  console.log('Z тут 3')
  console.log(key, value)
  localStorage.setItem(key, value)
}