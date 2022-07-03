/*
 * @Author: qf
 * @Date: 2022-05-27 10:24:31
 * @LastEditTime: 2022-07-03 16:24:38
 * @LastEditors: qf
 * @Description:
 */
import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { bulidURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'

// 整个库的入口文件
function axios(config: AxiosRequestConfig): void {
  // 发送请求逻辑,模块化的编程思想，把这个功能拆分到一个单独的模块中。
  processConfig(config)
  xhr(config)
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

function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

export default axios
