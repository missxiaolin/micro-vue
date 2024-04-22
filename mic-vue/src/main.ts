import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { isSubMicro, handleMicroData } from './utils/subMicro';

let app = null;

function mount() {
    app = createApp(App);
    app.use(router)
    app.use(store)
    app.mount('#vue-app')
    if (isSubMicro) {
        // 微前端环境下， 处理路由下发跳转
		handleMicroData(router);
    }
    // createApp(App).use(store).use(router).mount('#vue-app')
}



mount()