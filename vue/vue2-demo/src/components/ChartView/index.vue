<!--
 * @Author: qf
 * @Date: 2022-03-05 15:34:00
 * @LastEditTime: 2022-04-16 21:57:57
 * @LastEditors: qf
 * @Description:
-->
<template>
  <div class="chart">
    <div ref="chart" :style="{ height: height, width: width }" />
  </div>
</template>
<script>
// import resize from './mixins/resize'

// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, PieChart, LineChart, GaugeChart, RadarChart, CustomChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  PolarComponent
} from 'echarts/components'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  PieChart,
  CustomChart,
  LineChart,
  GaugeChart,
  RadarChart,
  LegendComponent,
  CanvasRenderer,
  ToolboxComponent,
  PolarComponent
])

export default {
  name: 'ChartView',
  // mixins: [resize],
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartOption: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      default: 'canvas'
    }
  },
  data () {
    return {
      chart: null
    }
  },
  watch: {
    chartOption: {
      deep: true,
      handler (newVal) {
        this.setOptions(newVal)
      }
    }
  },
  mounted () {
    this.initChart()
    if (this.autoResize) {
      window.addEventListener('resize', this.resizeHandler)
    }
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.resizeHandler)
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    resizeHandler () {
      this.chart.resize()
    },
    initChart () {
      this.chart = echarts.init(this.$refs.chart, '', {
        renderer: this.type
      })
      this.chart.setOption(this.chartOption)
      this.chart.on('click', this.handleClick)
    },
    handleClick (params) {
      this.$emit('click', params)
    },
    setOptions (option) {
      this.clearChart()
      this.resizeHandler()
      if (this.chart) {
        this.chart.setOption(option)
      }
    },
    refresh () {
      this.setOptions(this.chartOption)
    },
    clearChart () {
      this.chart && this.chart.clear()
    }
  }
}
</script>
