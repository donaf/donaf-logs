<!--
 * @Author: qf
 * @Date: 2022-04-17 14:07:10
 * @LastEditTime: 2022-04-20 14:47:31
 * @LastEditors: qf
 * @Description:
-->
<template>
  <div id="container"></div>
</template>

<script>
import loadAMap from '@/plugins/loadAMap'

export default {
  mounted () {
    loadAMap().then((AMap) => {
      this.$nextTick(() => this.initMap(AMap))
    })
  },
  methods: {
    initMap (AMap) {
      this.map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: 6,
        mapStyle: `amap://styles/${this.mapStyle}` // 设置地图的显示样式
      })

      AMap.plugin(['AMap.DistrictSearch', 'AMap.Polygon', 'Map3D'], () => {
        const opts = {
          viewMode: '3D', // 开启 3D 模式
          subdistrict: 1,
          extensions: 'all',
          level: 'province'
        }
        const district = new AMap.DistrictSearch(opts)
        district.search('湖北省', (status, result) => {
          const bounds = result.districtList[0].boundaries
          for (let i = 0; i < bounds.length; i += 1) {
            // 绘制版块
            const polygon = new AMap.Polygon({
              map: this.map,
              path: bounds[i],
              strokeColor: '#0dcdd1',
              fillColor: '#3D6BB1',
              fillOpacity: 1
            })
            this.map.add(polygon)
          }
        })
      })
    }
  }
}
</script>

<style scoped>
#container {
  width: 100%;
  height: 100vh;
}
</style>
