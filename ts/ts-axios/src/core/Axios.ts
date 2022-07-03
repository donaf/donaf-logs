/*
 * @Author: qf
 * @Date: 2022-07-03 22:24:59
 * @LastEditTime: 2022-07-03 22:59:16
 * @LastEditors: qf
 * @Description:
 */
import { AxiosRequestConfig, AxiosPromise, Method } from '../types'
import dispatchRequest from './dispatchRequest'

export default class Axios {
  request(config: AxiosRequestConfig): AxiosPromise {
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
