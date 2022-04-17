<!--
 * @Author: qf
 * @Date: 2022-04-16 21:42:18
 * @LastEditTime: 2022-04-16 22:28:14
 * @LastEditors: qf
 * @Description: 折线图、柱状图
-->
<template>
  <div>
    <chart-view :chart-option="option" />
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
export default {
  data () {
    return {
      option: {}
    }
  },
  mounted () {
    const option = {
      title: {
        text: '2019年销售水量和主营业务收入对比',
        textStyle: {
          align: 'center',
          color: '#fff',
          fontSize: 20
        },
        top: '3%',
        left: '10%'
      },
      backgroundColor: '#0f375f',
      grid: {
        top: '25%',
        bottom: '10%' // 也可设置left和right设置距离来控制图表的大小
      },
      tooltip: {
        trigger: 'axis', // 触发类型。坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
        axisPointer: { // 坐标轴指示器配置项。
          type: 'shadow', // 指示器类型。 阴影指示器
          label: { // 坐标轴指示器的文本标签。
            show: true
          }
        }
      },
      legend: { // 图例组件。
        data: ['销售水量', '主营业务'], // 图例的数据数组。
        top: '15%',
        textStyle: { // 图例的公用文本样式。
          color: '#ffffff'
        }
      },
      /**
       * 直角坐标系 grid 中的 x 轴，
       * 一般情况下单个 grid 组件最多只能放上下两个 x 轴，
       * 多于两个 x 轴需要通过配置 offset 属性防止同个位置多个 x 轴的重叠。
       */
      xAxis: {
        /**
         * 类目数据，在类目轴（type: 'category'）中有效。
         * 如果没有设置 type，但是设置了 axis.data，则认为 type 是 'category'。
         * 如果设置了 type 是 'category'，但没有设置 axis.data，
         * 则 axis.data 的内容会自动从 series.data 中获取，这会比较方便。
         */
        data: [
          '当年完成水量',
          '去年同期水量',
          '滚动目标值水量',
          '全年目标值水量',
          '当年完成金额',
          '去年同期金额',
          '滚动目标金额',
          '全年目标值'
        ],
        axisLine: {
          show: true, // 隐藏X轴轴线
          lineStyle: {
            color: '#01FCE3'
          }
        },
        axisTick: { // 坐标轴轴线相关设置。
          show: true // 隐藏X轴刻度
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#ebf8ac' // X轴文字颜色
          }
        }
      },
      yAxis: [
        {
          type: 'value',
          name: '亿元',
          nameTextStyle: {
            color: '#ebf8ac'
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: true
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#FFFFFF'
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#ebf8ac'
            }
          }
        },
        {
          type: 'value',
          name: '同比',
          nameTextStyle: {
            color: '#ebf8ac'
          },
          position: 'right',
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: true,
            formatter: '{value} %', // 右侧Y轴文字显示
            textStyle: {
              color: '#ebf8ac'
            }
          }
        },
        {
          type: 'value',
          gridIndex: 0,
          min: 50,
          max: 100,
          splitNumber: 8,
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)']
            }
          }
        }
      ],
      series: [
        {
          name: '销售水量',
          type: 'line',
          yAxisIndex: 1, // 使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
          smooth: true, // 平滑曲线显示
          showAllSymbol: true, // 显示所有图形。
          symbol: 'circle', // 标记的图形为实心圆
          symbolSize: 10, // 标记的大小
          itemStyle: {
            // 折线拐点标志的样式
            color: '#058cff'
          },
          lineStyle: {
            color: '#058cff'
          },
          areaStyle: {
            color: 'rgba(5,140,255, 0.2)'
          },
          data: [4.2, 3.8, 4.8, 3.5, 2.9, 2.8, 3, 5]
        },
        {
          name: '主营业务',
          type: 'bar',
          barWidth: 15,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#00FFE3'
                },
                {
                  offset: 1,
                  color: '#4693EC'
                }
              ])
            }
          },
          data: [4.2, 3.8, 4.8, 3.5, 2.9, 2.8, 3, 5]
        }
      ]
    }
    this.option = this.$eChartFn.charts(option)
  },
  methods: {}
}
</script>
