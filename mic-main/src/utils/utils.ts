import router from "@/router";
import store from "@/store";
import microApp from "@micro-zoe/micro-app";

/**
 * @method : 是否开启权限校验
 * 1、本地开发模式       ----> false
 * 2、在线打包发布模式    ----> true
 */
export const verifySwitch = process.env.NODE_ENV === "production";

/**
 * 设置服务基本信息：标题、菜单高亮
 * @param {Boolean} isMainServe 是否为主服务
 * @param {Object} currentService 子服务信息
 * @param {String} fullPath 当前页面链接
 * @param {Function} menuStore 菜单store
 * @param {String} pageName 当前页面标题
 * @param {Function} callBack 回调
 * @returns
 */
export const setServiceBasicInfo = ({
  isMainServe,
  currentService,
  fullPath,
  menuStore,
  pageName = "",
  callBack,
  microStore,
}: any) => {
  // 通过浏览器输入url 方式 、刷新浏览器进入
  // TODO:  有权限 但 无子服务信息 判断是否是有效的服务 --> 跳转 404
  if (!isMainServe && !Object.keys(currentService).length) {
    // return router.push({ path: "/error/404" });
  }
  // 执行回调
  if (callBack && typeof callBack === "function") {
    callBack();
  }
  setTimeout(() => {
    store.dispatch("setCurrentService", {
      isMainServe,
      currentService,
      fullPath,
    });
  }, 0);
  setTimeout(() => {
    // 非主服务 则 通知对应的子服务跳转
    // 当 microStore 不存在 ，是子服务内部跳转 来子服务进行
    if (!isMainServe) {
      microApp.setData(currentService.name, {
        path: fullPath,
        openBlank: currentService.openBlank,
        data: new Date().getTime()
      });
    }
  }, 10);
};
