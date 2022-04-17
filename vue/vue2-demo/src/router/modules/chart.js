/*
 * @Author: qf
 * @Date: 2022-04-17 09:25:38
 * @LastEditTime: 2022-04-17 09:30:51
 * @LastEditors: qf
 * @Description:
 */

import { ParentView } from '@/components'
const chartRoutes = [
  {
    path: '/chart',
    component: ParentView,
    meta: {
      title: '图表'
    },
    children: [
      {
        path: 'barHr',
        component: () => import('@/views/charts/bar/barHr.vue'),
        meta: {
          title: '横向柱状图'
        }
      }
    ]
  }
]

export default chartRoutes
