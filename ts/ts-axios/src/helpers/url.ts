/*
 * @Author: qf
 * @Date: 2022-06-13 17:35:53
 * @LastEditTime: 2022-07-03 13:33:07
 * @LastEditors: qf
 * @Description:处理 url 相关的工具函数都放在该文件中
 */
import { isDate, isPlainObject } from './util'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function bulidURL(url: string, params?: any) {
  if (!params) {
    return url
  }

  const parts: string[] = []

  Object.keys(params).forEach(key => {
    let val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values: string[]
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    console.log('key', key)
    console.log('values', values)
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  console.log('parts', parts)

  let serializedParams = parts.join('&')

  if (serializedParams) {
    const markIndex = url.indexOf('#')

    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
      console.log('markIndex', markIndex, url)
    }

    console.log('serializedParams url', url)
    console.log('serializedParams indexof url', url.indexOf('?') === -1 ? '?' : '&')

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  console.log('url', url)
  return url
}
