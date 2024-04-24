import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { loadPlugins } from "@/plugins";

import "@/assets/css/index.scss";
import "normalize.css";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";

// @ts-ignore
// import loadCompontents from "./libs/UIComponentInit.js";

/**
 * 创建实例基础方法
 * @param {*} renderComponent
 * @param {*} loadFinished
 * @returns
 */
function loadTemplate(renderComponent: any, loadFinished: any) {
  const app = createApp(renderComponent);
  loadFinished(app);
  return app;
}

/**
 * 异步创建实例
 * @param {*} renderComponent
 * @returns
 */
function createBaseAppAsync(renderComponent = {}) {
  return new Promise((resolve, reject) => {
    loadTemplate(renderComponent, (app: any) => {
      resolve(app);
    });
  });
}

/**
 * 导入路由守卫全局权限
 */
import "@/utils/permission";

import { microStart } from "./plugins/micro";
microStart();

const app = createApp(App).use(store).use(router);

/** 加载插件 */
loadPlugins(app);

// 内部需要同样配置的全局window上
// @ts-ignore
window.createBaseAppAsync = createBaseAppAsync;

app.mount("#app");
