/*
 * @Author: qf
 * @Date: 2022-06-13 18:48:56
 * @LastEditTime: 2022-07-03 16:49:34
 * @LastEditors: qf
 * @Description:
 */
import { isPlainObject } from './util'

export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

/**
 * 处理相应data
 * @description 当服务端返回给我们的数据是字符串类型，我们可以尝试去把它转换成一个 JSON 对象
 * @param data
 * @returns
 */
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      //
    }
  }
  return data
}
