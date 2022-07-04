/*
 * @Author: qf
 * @Date: 2022-07-03 22:24:59
 * @LastEditTime: 2022-07-04 15:25:56
 * @LastEditors: qf
 * @Description:
 */
import {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosPromise,
  Method,
  ResolvedFn,
  RejectedFn
} from '../types/index'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './InterceptorManager'
interface Interceptors {
  // 请求拦截器管理类实例
  request: InterceptorManager<AxiosRequestConfig>
  // 响应拦截器管理类实例
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectedFn
}

export default class Axios {
  interceptors: Interceptors

  constructor() {
    // 初始化 interceptors 实例属性
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }
  // 我们虽然修改了 request 的实现，支持了 2 种参数，
  // 但是我们对外提供的 request 接口仍然不变，
  // 可以理解为这仅仅是内部的实现的修改，与对外接口不必一致，
  // 只要保留实现兼容接口即可。
  // 添加拦截器链式调用的逻辑
  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      // 如果 url 不是字符串类型，则说明我们传入的就是单个参数，且 url 就是 config
      config = url
    }
    // 构造一个 PromiseChain 类型的数组 chain
    // 把 dispatchRequest 函数赋值给 resolved 属性
    const chain: PromiseChain[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    // 遍历请求拦截器插入到 chain 的前面
    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })
    // 遍历响应拦截器插入到 chain 后面
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })
    // 定义一个已经 resolve 的 promise，循环这个 chain，拿到每个拦截器对象
    // 把它们的 resolved 函数和 rejected 函数添加到 promise.then 的参数中
    // 这样就相当于通过 Promise 的链式调用方式，实现了拦截器一层层的链式调用的效果。
    let promise = Promise.resolve(config)
    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }
    return promise
  }

  /**
   * 对外提供的语法糖
   * 内部都是通过调用request方法实现发送请求
   * 调用之前对config做了一层合并处理
   */
  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }
  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }
  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('post', url, config)
  }
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('put', url, config)
  }
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('patch', url, config)
  }

  _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }
  _requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
}
