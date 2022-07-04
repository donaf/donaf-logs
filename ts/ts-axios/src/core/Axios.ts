/*
 * @Author: qf
 * @Date: 2022-07-03 22:24:59
 * @LastEditTime: 2022-07-03 23:05:46
 * @LastEditors: qf
 * @Description:
 */
import { AxiosRequestConfig, AxiosPromise, Method } from '../types'
import dispatchRequest from './dispatchRequest'

export default class Axios {
  // 我们虽然修改了 request 的实现，支持了 2 种参数，
  // 但是我们对外提供的 request 接口仍然不变，
  // 可以理解为这仅仅是内部的实现的修改，与对外接口不必一致，
  // 只要保留实现兼容接口即可。
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
    return dispatchRequest(config)
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
