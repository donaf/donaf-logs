/*
 * @Author: qf
 * @Date: 2022-03-18 14:35:27
 * @LastEditTime: 2022-03-18 14:38:11
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
