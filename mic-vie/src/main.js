import { createApp } from 'vue'

import './style.css'
import App from './App.vue'
import router from '@/router';
import '@/utils/permission';
import "@/assets/css/index.scss";
import "normalize.css";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import { isSubMicro, handleMicroData } from '@/utils/subMicro';
import { loadPlugins } from "@/plugins";

let app = null;
function mount() {
    app = createApp(App);
    app.use(router)
    app.mount('#vie-app')
    /** 加载插件 */
    loadPlugins(app)
    if (isSubMicro) {
        // 微前端环境下， 处理路由下发跳转
		handleMicroData(router);
    }
}

mount()