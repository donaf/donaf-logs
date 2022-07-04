/*
 * @Author: qf
 * @Date: 2022-06-13 17:20:48
 * @LastEditTime: 2022-07-04 15:30:46
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
   */
  responseType?: XMLHttpRequestResponseType
  timeout?: number // 超时实践，默认0（永不过时）
}

// 从代码层面来处理服务端响应
export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

// 定义一个 AxiosPromise 接口，它继承于 Promise<AxiosResponse> 这个泛型接口

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

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
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}
export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  // 重载
  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

/**
 * 拦截器管理类对外接口
 */
export interface AxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number

  eject(id: number): void
}

export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}
