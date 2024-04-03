import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { microStart } from './plugins/micro'
microStart()

createApp(App).use(store).use(router).mount('#app')
