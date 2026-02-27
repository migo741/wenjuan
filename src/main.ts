import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/css/index.scss'
// 引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
})
app.use(createPinia())
app.use(router)
app.use(Antd)
app.use(ElementPlus)
app.mount('#app')
