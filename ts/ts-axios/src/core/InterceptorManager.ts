/*
 * @Author: qf
 * @Date: 2022-07-04 14:58:15
 * @LastEditTime: 2022-07-05 17:04:51
 * @LastEditors: qf
 * @Description:
 */
import { ResolvedFn, RejectedFn } from '../types/index'

interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

/**
 * 拦截器管理类
 * 定义了一个InterceptorManager泛型类
 * 内部维护了一个私有属性interceptors，它是一个数组，用来存储拦截器
 */
export default class InterceptorManager<T> {
  private interceptors: Array<Interceptor<T> | null>
  constructor() {
    this.interceptors = []
  }

  // 添加拦截器到interceptors中，返回一个id用于删除
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }

  /**
   * 遍历interceptors
   * @param fn
   */
  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        // 每一个interceptor作为该函数的参数传入
        fn(interceptor)
      }
    })
  }

  // 删除一个拦截器，通过传入拦截器的id删除
  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}
