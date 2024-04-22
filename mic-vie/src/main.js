import { createApp } from 'vue'

import './style.css'
import App from './App.vue'
import router from '@/router';
import '@/utils/permission';
import { isSubMicro, handleMicroData } from '@/utils/subMicro';

// createApp(App).use(router).mount('#vie-app')

let app = null;
function mount() {
    app = createApp(App);
    app.use(router)
    app.mount('#vie-app')
    if (isSubMicro) {
        // 微前端环境下， 处理路由下发跳转
		handleMicroData(router);
    }
}

mount()