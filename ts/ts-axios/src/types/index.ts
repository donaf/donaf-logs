/*
import { AxiosResponse } from './index';
 * @Author: qf
 * @Date: 2022-06-13 17:20:48
 * @LastEditTime: 2022-07-03 23:03:46
 * @LastEditors: qf
 * @Description:
 */
/**
 * 公共类型定义
 */

//  字符串字面量类型
export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'Delete'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

// 从网络层面是可以收到服务端的响应
export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any // post、patch 等类型请求的数据
  params?: any // get、head 等类型请求的数据，拼接到 url 的 query string 中的
  headers?: any
  /**
   * responseType 的类型是一个 XMLHttpRequestResponseType 类型
   * 它的定义是 "" | "arraybuffer" | "blob" | "document" | "json" | "text" 字符串字面量类型
   *
   */
  responseType?: XMLHttpRequestResponseType
  timeout?: number // 超时实践，默认0（永不过时）
}

// 从代码层面来处理服务端响应
export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

// 定义一个 AxiosPromise 接口，它继承于 Promise<AxiosResponse> 这个泛型接口

export interface AxiosPromise extends Promise<AxiosResponse> {}

export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}

/**
 * 混合对象axios本身是一个函数，再实现一个包括它属性方法的类
 * 然后把这个类的原型属性和自身属性再拷贝到axios上
 * 先给axios混合对象定义接口
 * 首先，定义一个Axios类型接口，它描述了Axios类中的公共方法
 * 接着定义了AxiosInstance接口继承Axios
 * 它就是一个混合类型的接口
 */
export interface Axios {
  request(config: AxiosRequestConfig): AxiosPromise
  get(url: string, config?: AxiosRequestConfig): AxiosPromise
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise
  head(url: string, config?: AxiosRequestConfig): AxiosPromise
  options(url: string, config?: AxiosRequestConfig): AxiosPromise
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
}
export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise
  // 重载
  (url: string, config?: AxiosRequestConfig): AxiosPromise
}
