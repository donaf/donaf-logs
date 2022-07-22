export const extend = Object.assign;

export function isObject(val) {
  return val !== null && typeof val === 'object'
}

export function hasChanged(val, newVaule) {
  return !Object.is(val, newVaule)
}