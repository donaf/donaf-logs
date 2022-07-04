/*
 * @Author: qf
 * @Date: 2022-07-04 15:45:52
 * @LastEditTime: 2022-07-04 16:05:09
 * @LastEditors: qf
 * @Description: 合并方法
 */
import { AxiosRequestConfig } from '../types/index'
import { isPlainObject } from '../helpers/util'

const strats = Object.create(null)

/**
 * 默认合并策略
 * @param val1
 * @param val2
 * @returns
 */
function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

/**
 * 自定义配置合并策略
 * @description 对于 url、params、data 这些属性，默认配置显然是没有意义的，它们是和每个请求强相关的，所以我们只从自定义配置中获取
 * @param val1
 * @param val2
 * @returns
 */
function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

const stratKeysFromVal2 = ['url', 'params', 'data']
stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})

/**
 * 复杂对象合并策略
 * @param val1
 * @param val2
 */
function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  }
}

/**
 * 合并方法
 * @param config1 默认配置
 * @param config2 自定义配置
 * @returns
 */
export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key])
  }

  return config
}
