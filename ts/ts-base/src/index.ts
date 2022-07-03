
class Demo {
  constructor(callbackfn: any, thisArg: any) {
    let T, k
    if (this == null) {
      throw new TypeError('this is null or not defined');
    }
    var O = Object(this);
    console.log(O)
    var len = O.length >>> 0;
    console.log(len)
    if (typeof callbackfn !== 'function') {
      throw new TypeError();
    }
    console.log(callbackfn)
    console.log(arguments.length)
    if (arguments.length > 1) {
      T = thisArg
      console.log('T', T)
    }
    k = 0
    while (k < len) {
      let kValue
      if (k in O) {
        kValue = O[k]
      }
      let testResult = callbackfn.call(T, kValue, k, O)
      if (!testResult) {
        return false
      }
      k++
    }
    return true
  }
}
let p = new Demo(() => { }, 'a')

let arr = [{ id: 1, name: 'apple' }, { id: 2, name: 'pear' }]

console.log(arr.every(item => item.name !== ''))