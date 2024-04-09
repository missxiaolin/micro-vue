import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
/**
 * 导入路由守卫全局权限
 */
import '@/utils/permission'

import { microStart } from './plugins/micro'
microStart()

createApp(App).use(store).use(router).mount('#app')
