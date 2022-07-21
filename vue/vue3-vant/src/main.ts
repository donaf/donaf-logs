// windicss
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'
// 支持SVG
import 'virtual:svg-icons-register'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import piniaStore from './store'

const app = createApp(App)
app.use(router)
app.use(piniaStore)
app.mount('#app')
