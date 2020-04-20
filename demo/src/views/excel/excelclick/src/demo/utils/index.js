const toString = Object.prototype.toString
function isPlaintObject(obj) {
  return toString.call(obj) === '[object Object]'
}
export function deepClone() {
  // deepClone(target, obj1, ....)
  let src, copyIsArray, copy, name, options, clone
  let target = arguments[0] || {}
  let i = 1
  const length = arguments.length
  let deep = false // 默认浅拷贝

    // 处理 拷贝情况
    if (typeof target === 'boolean') {
      // 第一个参数是布尔值，目标对象从第二个参数开始
      deep = target

      target = arguments[1] || {}
      i++
    }

    // 处理 target 是字符串或者其他的情况
    if (typeof target !== 'object' && !typeof target !== 'function') {
      target = {}
    }

    for(;i < length; i++){
      // 只处理 非null或undefined数据
      if ((options = arguments[i]) != null) {
          // 扩展基本对象
        for (name in options) {
          src = target[name]
          copy = options[name]

          // 防止死循环
          if (target === copy) {
            continue
          }

          if (deep && copy && (isPlaintObject(copy) || (copyIsArray = Array.isArray(copy)))) {
            // 拷贝对象子属性是数组
            // 目标对象子属性需要也同样要是数组
            if (copyIsArray) {
              copyIsArray = false
              clone = src && Array.isArray(src) ? src : []
            } else {
              // 拷贝对象子属性还是对象
              // 目标对象子属性需要也同样要是对象
              clone = src && isPlaintObject(src) ? src : {}
            }

            // 递归深拷贝
            target[name] = deepClone(deep, clone, copy)
          } else if (copy !== undefined) {
            // 不为undeined的基本数据类型直接赋值
            target[name] = copy
          }
        }
      }
    }

    // 返回修改后的target
    return target
}

export function serializeData(obj){
	let str='?'
  Object.keys(obj).forEach(key => {
    str += `${key}=${obj[key]}&`
  })

  const reg=/&$/gi
  str = str.replace(reg, "") //清除最后一个&符号
  return str
}

export function findChildren(children, componentName) {
  let result
  if (!(children && children.length)) {
    return
  }
  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    const name = child.$options.componentName
    if (name === componentName) {
      result = child
      break
    } else if (child.$children && child.$children.length > 0) {
      result = findChildren(child.$children, componentName)
      if (result) return result // 关键代码：如果找到，就直接返回，结束后面的循环
    }
  }
  return result
}
