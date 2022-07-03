/*
 * @Author: qf
 * @Date: 2022-05-27 10:24:31
 * @LastEditTime: 2022-07-03 22:14:34
 * @LastEditors: qf
 * @Description:
 */
import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { bulidURL } from './helpers/url'
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'
import { AxiosPromise, AxiosResponse } from './types/index'

// 整个库的入口文件
function axios(config: AxiosRequestConfig): AxiosPromise {
  // 发送请求逻辑,模块化的编程思想，把这个功能拆分到一个单独的模块中。
  processConfig(config)
  return xhr(config).then(res => {
    // 把响应的 data 字段从字符串解析成 JSON 对象结构
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return bulidURL(url, params)
}

/**
 * 处理请求headers
 */
function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

/**
 * 处理请求data
 * @param config
 * @returns
 */
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

/**
 * 处理相应data
 * @param res 把响应的 data 字段从字符串解析成 JSON 对象结构
 * @returns
 */
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}

export default axios
