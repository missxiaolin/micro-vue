import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { microStart } from './plugins/micro'
microStart()

createApp(App).mount('#app')
