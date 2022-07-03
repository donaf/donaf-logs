/*
 * @Author: qf
 * @Date: 2022-06-13 17:20:48
 * @LastEditTime: 2022-07-03 16:40:43
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
  url: string
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
