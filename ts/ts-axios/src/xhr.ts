import { AxiosRequestConfig } from './types/index'
export default function xhr(config: AxiosRequestConfig): void {
  const { data = null, url, method = 'get' } = config

  // 实例化了一个 XMLHttpRequest 对象
  const request = new XMLHttpRequest()

  // 调用了它的 open 方法，传入了对应的一些参数
  request.open(method.toUpperCase(), url, true)

  // 调用 send 方法发送请求
  request.send(data)
}
