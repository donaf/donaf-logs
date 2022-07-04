/*
 * @Author: qf
 * @Date: 2022-07-03 22:14:20
 * @LastEditTime: 2022-07-04 15:44:11
 * @LastEditors: qf
 * @Description:
 */
import { AxiosInstance, AxiosRequestConfig } from './types/index'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'

/**
 * 工厂函数
 * @returns
 */
function createInstance(config: AxiosRequestConfig): AxiosInstance {
  // 实例化了Axios实例context
  const context = new Axios(config)
  // 创建instance指向Axios.prototype.request方法，并绑定上下文
  const instance = Axios.prototype.request.bind(context)
  // 通过extend方法把context中的原型方法和实例方法全部拷贝到instance上，这样就实现了一个混合对象
  extend(instance, context)
  // instance本身是一个函数，又拥有了Axios类的所有原型和实例属性，最终把这个instance返回
  return instance as AxiosInstance
}

/**
 * 这样我们就可以通过createInstance工厂函数创建了axios
 * 当直接调用axios方法，就相当于执行了Axios类的request方法发送请求
 * 我们也可以调用axios.get、axios.post等方法
 */
const axios = createInstance(defaults)
export default axios
