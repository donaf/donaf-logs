// import { track, trigger } from './effect'
import { mutableHandlers, readonlyHandlers } from './baseHandlers';


export function reactive(raw) {
  return createActiveObject(raw, mutableHandlers)
}

export function readonly(raw) {
  return createActiveObject(raw, createActiveObject)

}

function createActiveObject(raw: any, baseHandlers: any) {
  return new Proxy(raw, baseHandlers)
}