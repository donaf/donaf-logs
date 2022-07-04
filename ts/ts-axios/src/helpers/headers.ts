/*
 * @Author: qf
 * @Date: 2022-07-03 13:38:47
 * @LastEditTime: 2022-07-04 16:24:50
 * @LastEditors: qf
 * @Description:
 */
import { isPlainObject, deepMerge } from './util'
import { Method } from '../types/index'

function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

/**
 * 将header解析成一个对象结构
 * @param headers
 * @returns
 */
export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }
  /**
   * 通过 XMLHttpRequest 对象的 getAllResponseHeaders 方法获取到的值是一段字符串
   * 每一行都是以回车符和换行符 \r\n 结束，它们是每个 header 属性的分隔符。
   * 希望最终解析成一个对象结构
   */
  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })
  return parsed
}

/**
 * 把 common、post 的属性拷贝到 headers 这一级，然后再把 common、post 这些属性删掉
 * @param headers
 * @param method
 * @returns
 */
export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return
  }
  headers = deepMerge(headers.common || {}, headers[method] || {}, headers)
  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']
  methodsToDelete.forEach(method => {
    delete headers[method]
  })
  return headers
}
