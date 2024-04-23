import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/assets/css/index.scss";
import "normalize.css";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import { isSubMicro, handleMicroData } from './utils/subMicro';
import { loadPlugins } from "@/plugins";

let app = null;

function mount() {
    app = createApp(App);
    app.use(router)
    app.use(store)
    /** 加载插件 */
    loadPlugins(app)
    app.mount('#vue-app')
    if (isSubMicro) {
        // 微前端环境下， 处理路由下发跳转
		handleMicroData(router);
    }
}



mount()