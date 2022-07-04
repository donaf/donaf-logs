/*
 * @Author: qf
 * @Date: 2022-06-13 17:36:15
 * @LastEditTime: 2022-07-04 16:19:32
 * @LastEditors: qf
 * @Description:
 */
const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

/**
 * 混合对象实现
 * 首先，这个对象是一个函数
 * 其次，这个对象要包括Axios类的所有原型属性和实例属性
 * 先实现一个辅助函数extend
 * extend 方法的实现用到了交叉类型，并且用到了类型断言。
 * extend最终目的是把from里的属性都扩展到to中，包括原型上的属性
 */
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

const objs = {
  id: 'a',
  objs: {
    id: 'b'
  }
}

/**
 * 深拷贝
 * @param objs
 * @returns
 */
export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge({}, val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })
  return result
}
