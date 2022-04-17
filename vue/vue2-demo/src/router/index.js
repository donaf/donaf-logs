/*
 * @Author: qf
 * @Date: 2022-04-16 21:37:33
 * @LastEditTime: 2022-04-13 10:11:33
 * @LastEditors: qf
 * @Description:
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

// 导入路由模块
const modulesFiles = require.context('./modules', true, /.js$/)
const modules = []
modulesFiles.keys().forEach((item) => {
  modules.push(...modulesFiles(item).default)
})

console.log(modules)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  ...modules
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
