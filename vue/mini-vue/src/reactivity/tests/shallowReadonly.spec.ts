import { isReadonly, shallowReadonly } from '../reactive';
describe("shallowReadonly", () => {
  test("should notmake mon-reactive properties reactive", () => {
    const props = shallowReadonly({ n: { foo: 1 } })
    expect(isReadonly(props)).toBe(true)
    expect(isReadonly(props.n)).toBe(false)
  })
})