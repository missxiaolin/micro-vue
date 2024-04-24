import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { loadPlugins } from "@/plugins";

import "@/assets/css/index.scss";
import "normalize.css";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";

/**
 * 导入路由守卫全局权限
 */
import "@/utils/permission";

import { microStart } from "./plugins/micro";
microStart();

const app = createApp(App).use(store).use(router);

/** 加载插件 */
loadPlugins(app);

app.mount("#app");
