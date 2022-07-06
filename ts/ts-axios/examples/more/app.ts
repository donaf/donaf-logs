import axios, { AxiosError } from '../../src/index'
import qs from 'qs'
import 'nprogress/nprogress.css'

import NProgress from 'nprogress'

// document.cookie = 'a=b'

// axios.get('/more/get').then(res => {
//   console.log(res)
// })

// axios.post('http://127.0.0.1:8088/more/server2', {}, {
//   withCredentials: true
// }).then(res => {
//   console.log(res)
// })

// const instance = axios.create({
//   xsrfCookieName: 'XSRF-TOKEN-D',
//   xsrfHeaderName: 'X-XSRF-TOKEN-D'
// })
// instance.get('/more/get').then(res => {
//   console.log(res)
// })

/**
 * 上传下载
 */
// const instance = axios.create()

// function calculatePercentage(loaded: number, total: number) {
//   return Math.floor(loaded * 1.0) / total
// }

// function loadProgressBar() {
//   const setupStartProgress = () => {
//     instance.interceptors.request.use(config => {
//       NProgress.start()
//       return config
//     })
//   }

//   const setupUpdateProgress = () => {
//     const update = (e: ProgressEvent) => {
//       console.log(e)
//       NProgress.set(calculatePercentage(e.loaded, e.total))
//     }
//     instance.defaults.onDownloadProgress = update
//     instance.defaults.onUploadProgress = update
//   }

//   const setupStopProgress = () => {
//     instance.interceptors.response.use(response => {
//       NProgress.done()
//       return response
//     }, error => {
//       NProgress.done()
//       return Promise.reject(error)
//     })
//   }

//   setupStartProgress()
//   setupUpdateProgress()
//   setupStopProgress()
// }

// loadProgressBar()

// const downloadEl = document.getElementById('download')

// downloadEl!.addEventListener('click', e => {
//   // instance.get('https://img.mukewang.com/5cc01a7b0001a33718720632.jpg')
//   instance.get('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.niutuku.com%2Fdesk%2F1207%2F0839%2Fntk32820.jpg&refer=http%3A%2F%2Fimg2.niutuku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659686797&t=42dd95ec45be54f863da4d5fbf6a48bd')
// })

// const uploadEl = document.getElementById('upload')

// uploadEl!.addEventListener('click', e => {
//   const data = new FormData()
//   const fileEl = document.getElementById('file') as HTMLInputElement
//   if (fileEl.files) {
//     data.append('file', fileEl.files[0])

//     instance.post('/more/upload', data)
//   }
// })

/**
 * http授权
 */
// axios.post('/more/post', {
//   a: 1
// }, {
//   auth: {
//     username: 'Yee',
//     password: '123456'
//   }
// }).then(res => {
//   console.log(res)
// })

/**
 * 自定义合法状态码
 */
axios.get('/more/304').then(res => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message)
})

axios.get('/more/304', {
  validateStatus(status) {
    return status >= 200 && status < 400
  }
}).then(res => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message)
})

// axios.get('/more/get', {
//   params: new URLSearchParams('a=b&c=d')
// }).then(res => {
//   console.log(res)
// })
//
// axios.get('/more/get', {
//   params: {
//     a: 1,
//     b: 2,
//     c: ['a', 'b', 'c']
//   }
// }).then(res => {
//   console.log(res)
// })
//
// const instance = axios.create({
//   paramsSerializer(params) {
//     return qs.stringify(params, { arrayFormat: 'brackets' })
//   }
// })
//
// instance.get('/more/get', {
//   params: {
//     a: 1,
//     b: 2,
//     c: ['a', 'b', 'c']
//   }
// }).then(res => {
//   console.log(res)
// })

// const instance = axios.create({
//   baseURL: 'https://img.mukewang.com/'
// })
//
// instance.get('5cc01a7b0001a33718720632.jpg')
//
// instance.get('https://img.mukewang.com/szimg/5becd5ad0001b89306000338-360-202.jpg')

// function getA() {
//   return axios.get('/more/A')
// }

// function getB() {
//   return axios.get('/more/B')
// }

// axios.all([getA(), getB()])
//   .then(axios.spread(function(resA, resB) {
//     console.log(resA.data)
//     console.log(resB.data)
//   }))

// axios.all([getA(), getB()])
//   .then(([resA, resB]) => {
//     console.log(resA.data)
//     console.log(resB.data)
//   })

// const fakeConfig = {
//   baseURL: 'https://www.baidu.com/',
//   url: '/user/12345',
//   params: {
//     idClient: 1,
//     idTest: 2,
//     testString: 'thisIsATest'
//   }
// }
// console.log(axios.getUri(fakeConfig))
