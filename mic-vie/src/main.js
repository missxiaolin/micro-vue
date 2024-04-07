import { createApp } from 'vue'

import './style.css'
import App from './App.vue'
import router from '@/router';

import { isSubMicro, handleMicroData } from '@/utils/subMicro';

// createApp(App).use(router).mount('#vie-app')

let app = null;
function mount() {
    app = createApp(App);
    app.use(router)
    app.mount('#vie-app')
    if (isSubMicro) {
        console.log('微前端环境下，=>', window);
        // 微前端环境下， 处理路由下发跳转
		handleMicroData(router);
    }
}

mount()