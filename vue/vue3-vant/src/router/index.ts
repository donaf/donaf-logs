import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// import routes from 'virtual:generated-pages'
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})

export default router
