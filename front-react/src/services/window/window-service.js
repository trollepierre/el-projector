const getInLocalStorage = (key) => window.localStorage.getItem(key)
const removeInLocalStorage = (key) => window.localStorage.removeItem(key)
const saveInLocalStorage = (key, value) => window.localStorage.setItem(key, value)

export {
  getInLocalStorage,
  removeInLocalStorage,
  saveInLocalStorage,
}
