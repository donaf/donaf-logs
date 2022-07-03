/*
 * @Author: qf
 * @Date: 2022-06-13 18:48:56
 * @LastEditTime: 2022-07-03 13:31:52
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
