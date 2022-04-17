/*
 * @Author: qf
 * @Date: 2022-03-05 17:01:25
 * @LastEditTime: 2022-03-09 15:32:25
 * @LastEditors: qf
 * @Description:
 */

const pie = (data) => {
  const defaultConfig = {
    title: {
      text: '',
      subtext: '',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      bottom: 0
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: '50%',
        data: [],
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1
        },
        label: {
          alignTo: 'edge',
          formatter: '{name|{b}}\n{value|{c}个}',
          minMargin: 5,
          edgeDistance: 10,
          lineHeight: 15,
          rich: {
            time: {
              fontSize: 10,
              color: '#999'
            }
          }
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }

  const opt = Object.assign({}, defaultConfig, data)
  return opt
}

export default {
  pie
}
