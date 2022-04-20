/*
 * @Author: qf
 * @Date: 2022-03-25 11:09:45
 * @LastEditTime: 2022-04-17 14:41:51
 * @LastEditors: qf
 * @Description: 加载高德地图
 */
import AMapLoader from '@amap/amap-jsapi-loader'
import { mapKey } from '@/settings'

export default function loadAMap () {
  return new Promise((resolve, reject) => {
    window._AMapSecurityConfig = {
      securityJsCode: 'c7893a48d831dd8bf89d18263ab99c37'
    }
    AMapLoader.load({
      key: mapKey, // 设置您的key
      // version: '1.4.15',
      version: '2.0',
      plugins: [],
      AMapUI: {
        version: '1.1',
        plugins: []
      },
      Loca: {
        version: '2.0'
      }
    })
      .then((AMap) => {
        resolve(AMap)
      })
      .catch((e) => {
        reject(e)
      })
  })
}
