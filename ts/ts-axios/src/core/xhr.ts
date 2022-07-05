/*
 * @Author: qf
 * @Date: 2022-06-13 17:26:22
 * @LastEditTime: 2022-07-05 11:26:45
 * @LastEditors: qf
 * @Description:
 */
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
import { isURLSameOrigin } from '../helpers/url'
import cookie from '../helpers/cookie'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName
    } = config

    // 实例化了一个 XMLHttpRequest 对象
    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    // 调用了它的 open 方法，传入了对应的一些参数
    request.open(method.toUpperCase(), url!, true)

    // 实现获取响应数据逻辑
    // 添加 onreadystatechange 事件处理函数
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }
      // 当出现网络错误或者超时错误的时候，该值都为 0
      if (request.status === 0) {
        return
      }

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
      handleResponse(response)
    }
    /**
     * 异常情况处理
     */

    // 处理网络异常错误
    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }

    // 处理超时错误
    if (timeout) {
      request.timeout = timeout
    }
    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }
    // 处理非 200 状态码
    // 对于一个正常的请求，往往会返回 200-300 之间的 HTTP 状态码，对于不在这个区间的状态码，我们也把它们认为是一种错误的情况做处理。
    Object.keys(headers).forEach(name => {
      // 当我们传入的 data 为空的时候，请求 header 配置 Content-Type 是没有意义的，于是我们把它删除
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    // 取消请求
    if (cancelToken) {
      cancelToken.promise.then(reason => {
        request.abort()
        reject(reason)
      })
    }

    // 携带请求域下的 cookie
    if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
      const xsrfValue = cookie.read(xsrfCookieName)
      if (xsrfValue) {
        headers[xsrfHeaderName!] = xsrfValue
      }
    }

    // 调用 send 方法发送请求
    request.send(data)

    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
