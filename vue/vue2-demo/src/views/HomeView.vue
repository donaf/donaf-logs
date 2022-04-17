<!--
 * @Author: qf
 * @Date: 2022-04-16 21:37:33
 * @LastEditTime: 2022-04-14 10:26:24
 * @LastEditors: qf
 * @Description:
-->
<template>
  <div class="home">
    <div>{{ dateStart }}</div>
    <div>{{ dateEnd }}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import dayjs from 'dayjs'

const localeObject = {
  weekStart: 1
}
const updateLocale = require('dayjs/plugin/updateLocale')
dayjs.extend(updateLocale)
dayjs.updateLocale('en', localeObject)
export default {
  name: 'HomeView',
  components: {},
  data () {
    return {
      dateStart: '',
      dateEnd: ''
    }
  },
  created () {
    // this.dateStart = dayjs().startOf('week').format('YYYY-MM-DD')
    // this.dateEnd = dayjs().endOf('week').format('YYYY-MM-DD')

    this.dateStart = dayjs().startOf('month').format('YYYY-MM-DD')
    this.dateEnd = dayjs().endOf('month').format('YYYY-MM-DD')
  }
}
</script>
