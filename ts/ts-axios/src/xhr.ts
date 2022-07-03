/*
 * @Author: qf
 * @Date: 2022-06-13 17:26:22
 * @LastEditTime: 2022-07-03 16:33:48
 * @LastEditors: qf
 * @Description:
 */
import { AxiosRequestConfig } from './types/index'
export default function xhr(config: AxiosRequestConfig): void {
  const { data = null, url, method = 'get', headers } = config

  // 实例化了一个 XMLHttpRequest 对象
  const request = new XMLHttpRequest()

  // 调用了它的 open 方法，传入了对应的一些参数
  request.open(method.toUpperCase(), url, true)

  Object.keys(headers).forEach(name => {
    // 当我们传入的 data 为空的时候，请求 header 配置 Content-Type 是没有意义的，于是我们把它删除
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })

  // 调用 send 方法发送请求
  request.send(data)
}
