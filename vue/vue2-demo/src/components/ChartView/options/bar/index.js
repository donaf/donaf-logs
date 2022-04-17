/*
 * @Author: qf
 * @Date: 2022-03-05 16:58:42
 * @LastEditTime: 2022-03-09 16:43:29
 * @LastEditors: qf
 * @Description:
 */
const bar = (data) => {
  const defaultConfig = {
    title: {
      text: '',
      subtext: '',
      left: 'center'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar'
    }]
  }

  const opt = Object.assign({}, defaultConfig, data)
  return opt
}

export default {
  bar
}
