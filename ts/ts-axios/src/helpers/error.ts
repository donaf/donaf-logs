/*
 * @Author: qf
 * @Date: 2022-07-03 17:08:55
 * @LastEditTime: 2022-07-03 17:13:57
 * @LastEditors: qf
 * @Description:
 */
import { AxiosRequestConfig, AxiosResponse } from '../types/index'

/**
 * 实现 AxiosError 类，它是继承于 Error 类
 */
export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse

  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message)

    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true
    /**
     * 这段代码的目的是为了解决 TypeScript 继承一些内置对象的时候的坑
     * https://github.com/Microsoft/TypeScript-wiki/blob/main/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
     */
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

/**
 * @description 为了方便使用，我们对外暴露了一个 createError 的工厂方法。
 * @param message
 * @param config
 * @param code
 * @param request
 * @param response
 * @returns
 */
export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
): AxiosError {
  const error = new AxiosError(message, config, code, request, response)
  return error
}
