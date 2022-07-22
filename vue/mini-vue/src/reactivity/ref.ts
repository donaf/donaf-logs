import { trackEffects, triggerEffects, isTracking } from './effect';
import { hasChanged, isObject } from './shared/index';
import { reactive } from './reactive';
class RefImpl {
  private _value: any
  private _rawValue: any
  public dep
  constructor(value) {
    this._rawValue = value
    this._value = convert(value)
    this.dep = new Set()
  }
  get value() {
    trackRefValue(this)
    return this._value
  }
  set value(newValue) {
    if (hasChanged(newValue, this._rawValue)) {
      this._rawValue = newValue
      this._value = convert(newValue)
      triggerEffects(this.dep)
    }
  }
}

export function ref(value) {
  return new RefImpl(value)
}

function convert(value) {
  return isObject(value) ? reactive(value) : value
}

function trackRefValue(ref) {
  if (isTracking()) {
    trackEffects(ref.dep)
  }
}