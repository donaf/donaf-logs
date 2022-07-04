/*
 * @Author: qf
 * @Date: 2022-06-13 17:20:48
 * @LastEditTime: 2022-07-04 17:45:03
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
  /**
   * 将请求数据发送到服务器之前对其进行修改
   * 这只适用于请求方法 put、post 和 patch
   * 如果值是数组，则数组中的最后一个函数必须返回一个字符串或FormData、URLSearchParams、Blob等类型作为xhr.send方法的参数
   */
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  // 把响应数据传递给 then 或者 catch 之前对它们进行修改
  transformResponse?: AxiosTransformer | AxiosTransformer[]
  [propName: string]: any
}

export interface AxiosTransformer {
  (data: any, headers: any): any
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
  defaults: AxiosRequestConfig
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
