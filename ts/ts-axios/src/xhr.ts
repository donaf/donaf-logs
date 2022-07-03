/*
 * @Author: qf
 * @Date: 2022-06-13 17:26:22
 * @LastEditTime: 2022-07-03 16:47:01
 * @LastEditors: qf
 * @Description:
 */
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'
import { parseHeaders } from './helpers/headers'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise(resolve => {
    const { data = null, url, method = 'get', headers, responseType } = config

    // 实例化了一个 XMLHttpRequest 对象
    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    // 调用了它的 open 方法，传入了对应的一些参数
    request.open(method.toUpperCase(), url, true)

    // 实现获取响应数据逻辑
    // 添加 onreadystatechange 事件处理函数
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      /**
       * 通过 XMLHttpRequest 对象的 getAllResponseHeaders 方法获取到的值是如下一段字符串：
       */
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData =
        responseType && responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      resolve(response)
    }

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
  })
}
