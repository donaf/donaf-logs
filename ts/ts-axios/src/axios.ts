/*
 * @Author: qf
 * @Date: 2022-07-03 22:14:20
 * @LastEditTime: 2022-07-05 10:59:40
 * @LastEditors: qf
 * @Description:
 */
import { AxiosStatic, AxiosRequestConfig } from './types/index'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

/**
 * 工厂函数
 * @returns
 */
function createInstance(config: AxiosRequestConfig): AxiosStatic {
  // 实例化了Axios实例context
  const context = new Axios(config)
  // 创建instance指向Axios.prototype.request方法，并绑定上下文
  const instance = Axios.prototype.request.bind(context)
  // 通过extend方法把context中的原型方法和实例方法全部拷贝到instance上，这样就实现了一个混合对象
  extend(instance, context)
  // instance本身是一个函数，又拥有了Axios类的所有原型和实例属性，最终把这个instance返回
  return instance as AxiosStatic
}

/**
 * 这样我们就可以通过createInstance工厂函数创建了axios
 * 当直接调用axios方法，就相当于执行了Axios类的request方法发送请求
 * 我们也可以调用axios.get、axios.post等方法
 */

const axios = createInstance(defaults)

axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

export default axios
