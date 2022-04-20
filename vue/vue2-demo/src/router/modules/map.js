/*
 * @Author: qf
 * @Date: 2022-04-17 14:07:30
 * @LastEditTime: 2022-04-17 14:40:36
 * @LastEditors: qf
 * @Description:
 */

import { ParentView } from '@/components'
const chartRoutes = [
  {
    path: '/map',
    component: ParentView,
    meta: {
      title: '地图'
    },
    children: [
      {
        path: 'city3D',
        component: () => import('@/views/map/city3D.vue'),
        meta: {
          title: '城市3D'
        }
      },
      {
        path: 'loca',
        component: () => import('@/views/map/loca.vue'),
        meta: {
          title: 'loca可视化'
        }
      }
    ]
  }
]

export default chartRoutes
