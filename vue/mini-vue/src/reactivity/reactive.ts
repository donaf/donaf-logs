/*
 * @Author: qf
 * @Date: 2022-07-03 07:46:20
 * @LastEditTime: 2022-07-03 07:51:28
 * @LastEditors: qf
 * @Description:
 */
export function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      const res = Reflect.get(target, key)
      // 依赖收集
      return res
    },
    set(target, key, value) {
      const res = Reflect.set(target, key, value)
        //TODO 触发依赖
        return res
    }
  })

}