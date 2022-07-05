/*
 * @Author: qf
 * @Date: 2022-07-04 16:47:01
 * @LastEditTime: 2022-07-05 17:07:14
 * @LastEditors: qf
 * @Description:
 */
import { AxiosTransformer } from '../types/index'

/**
 *
 * @param data
 * @param headers
 * @param fns 一个或多个转换函数
 * @returns
 */
export default function transform(
  data: any,
  headers: any,
  fns?: AxiosTransformer | AxiosTransformer[]
): any {
  if (!fns) {
    return data
  }
  if (!Array.isArray(fns)) {
    fns = [fns]
  }
  fns.forEach(fn => {
    data = fn(data, headers)
  })
  return data
}
