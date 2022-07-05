/*
 * @Author: qf
 * @Date: 2022-07-05 09:43:52
 * @LastEditTime: 2022-07-05 10:59:46
 * @LastEditors: qf
 * @Description:
 */
export default class Cancel {
  message?: string

  constructor(message?: string) {
    this.message = message
  }
}

/**
 * 通过 instanceof 来判断传入的值是不是一个 Cancel 对象。
 * @param value
 * @returns
 */
export function isCancel(value: any): boolean {
  return value instanceof Cancel
}
