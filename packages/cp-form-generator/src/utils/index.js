const toString = Object.prototype.toString
export function deepClone(o) {
  const c = toString.call(o) === '[object Array]' ? [] : {}
  for (const i in o) {
    if (toString.call(o[i]) === '[object Object]') {
      c[i] = deepClone(o[i])
    } else if (Array.isArray(o[i])) {
      c[i] = deepClone(o[i])
    } else {
      c[i] = o[i]
    }
  }
  return c
}
