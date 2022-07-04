/*
 * @Author: qf
 * @Date: 2022-04-20 15:59:16
 * @LastEditTime: 2022-07-03 23:07:10
 * @LastEditors: qf
 * @Description:
 */
import axios from '../../src/index'

axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  }
})

axios.request({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hello'
  }
})

axios.get('/extend/get')

axios.options('/extend/options')

axios.delete('/extend/delete')

axios.head('/extend/head')

axios.post('/extend/post', { msg: 'post' })

axios.put('/extend/put', { msg: 'put' })

axios.patch('/extend/patch', { msg: 'patch' })

axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  }
})

axios('/extend/post', {
  method: 'post',
  data: {
    msg: 'hello'
  }
})

// interface ResponseData<T = any> {
//   code: number
//   result: T
//   message: string
// }

// interface User {
//   name: string
//   age: number
// }

// function getUser<T>() {
//   return axios<ResponseData<T>>('/extend/user')
//     .then(res => res.data)
//     .catch(err => console.error(err))
// }


// async function test() {
//   const user = await getUser<User>()
//   if (user) {
//     console.log(user.result.name)
//   }
// }

// test()
