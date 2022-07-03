import axios from '../../src/index'

// 希望最终的请求url是/base/get?a=1&b=2
// 实际上把params对象的key和value拼接到url上

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     a: 1,
//     b: 2
//   }
// })


// 参数值为数组
// 最终请求的 url 是 /base/get?foo[]=bar&foo[]=baz'
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: ['bar', 'baz']
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: {
//       bar: 'baz'
//     }
//   }
// })

// const date = new Date()

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     date
//   }
// })

// 特殊字符支持
// 对于字符 @、:、$、,、、[、]，我们是允许出现在 url 中的，不希望被 encode。
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: '@:$, '
//   }
// })

// 空值忽略
// 对于值为 null 或者 undefined 的属性，我们是不会添加到 url 参数中的。

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: 'bar',
//     baz: null
//   }
// })

// 丢弃 url 中的哈希标记
// axios({
//   method: 'get',
//   url: '/base/get#hash',
//   params: {
//     foo: 'bar'
//   }
// })

// // 保留url中已存在的参数
// axios({
//   method: 'get',
//   url: '/base/get?foo=bar',
//   params: {
//     bar: 'baz'
//   }
// })

axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
})

// axios({
//   method: 'post',
//   url: '/base/post',
//   headers: {
//     'content-type': 'application/json;charset=utf-8'
//   },
//   data: {
//     a: 1,
//     b: 2
//   }
// })

// const arr = new Int32Array([21, 31])

// axios({
//   method: 'post',
//   url: '/base/buffer',
//   data: arr
// })

// const paramsString = 'q=URLUtils.searchParams&topic=api'
// const searchParams = new URLSearchParams(paramsString)

// axios({
//   method: 'post',
//   url: '/base/post',
//   data: searchParams
// })

// axios({
//   method: 'post',
//   url: '/base/post',
//   data: {
//     a: 1,
//     b: 2
//   }
// }).then(res => {
//   console.log(res)
// })

// axios({
//   method: 'post',
//   url: '/base/post',
//   responseType: 'json',
//   data: {
//     a: 3,
//     b: 4
//   }
// }).then(res => {
//   console.log(res)
// })
