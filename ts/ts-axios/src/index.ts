/*
 * @Author: qf
 * @Date: 2022-03-18 11:47:11
 * @LastEditTime: 2022-04-20 17:16:21
 * @LastEditors: qf
 * @Description:
 */
import { AxiosRequestConfig, AxiosPromise } from './types/index'

import xhr from './xhr'

import { buildURL } from './helps/url'
import { transformRequest } from './helps/data'
import { processHeaders } from './helps/headers'

function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformData(config)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

function transformData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

export default axios
