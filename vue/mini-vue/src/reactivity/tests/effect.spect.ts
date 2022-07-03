/*
 * @Author: qf
 * @Date: 2022-07-03 07:39:58
 * @LastEditTime: 2022-07-03 07:52:02
 * @LastEditors: qf
 * @Description:
 */
import { reactive } from '../reactive'
describe('effect', () => {
  it.skip('happy path', () => {
    const user = reactive({
      age: 10
    })
    let nextAge
    effect(() => {
      nextAge = user.age + 1
    })
    expect(nextAge).toBe(11)
    // update
    user.age++
    expect(nextAge).toBe(12)
  })
})