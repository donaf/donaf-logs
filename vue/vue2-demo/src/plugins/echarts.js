/*
 * @Author: qf
 * @Date: 2022-03-05 17:18:03
 * @LastEditTime: 2022-03-05 17:18:04
 * @LastEditors: qf
 * @Description: echarts
 */
import Vue from 'vue'
import eChartFn from '@/components/ChartView/index.js'
import ChartPanel from '@/components/ChartView/index.vue'
Vue.component(ChartPanel.name, ChartPanel)
Vue.prototype.$eChartFn = eChartFn
