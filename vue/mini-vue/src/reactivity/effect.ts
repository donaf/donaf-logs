/*
 * @Author: qf
 * @Date: 2022-07-03 07:52:25
 * @LastEditTime: 2022-07-03 07:57:37
 * @LastEditors: qf
 * @Description:
 */
class ReactiveEffect {
  private _fn: any
  constructor(fn: any) {
    this._fn = fn
  }
  run() {
    this._fn()
  }

}

export function effect(fn) {
  // fn
  const _effect = new ReactiveEffect(fn)
  _effect.run()
}