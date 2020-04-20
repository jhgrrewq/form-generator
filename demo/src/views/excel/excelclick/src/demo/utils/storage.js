
const toString = Object.prototype.toString

function isObjectAndArray(obj) {
  return toString.call(obj) === '[object Object]' || toString.call(obj) === '[object Array]'
}

function isJSON(val) {
  if (typeof val !== 'string') {
    return false
  }
  try {
    const obj = JSON.parse(val)
    if (isObjectAndArray(obj)) {
      return true
    } else {
      return false
    }
  } catch (e) {
    return false
  }
}

class Storage {
  get(key) {
    return localStorage.getItem(key) && isJSON(localStorage.getItem(key))
      ? JSON.parse(localStorage.getItem(key))
      : localStorage.getItem(key)
  }

  set(key, value) {
    if (isObjectAndArray(value)) {
      localStorage.setItem(key, JSON.stringify(value))
    } else {
      localStorage.setItem(key, value)
    }
  }

  remove(key) {
    localStorage.removeItem(key)
  }
}

export default new Storage()
