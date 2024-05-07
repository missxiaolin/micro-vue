import router from "@/router";
import store from "@/store";
import { setServiceBasicInfo } from "@/utils/utils";
const whiteList = ["/login"]; // 不需要重定向的白名单

// 全局路由守卫 动态更新权限
router.beforeEach(async (to, from, next) => {
  if (whiteList.indexOf(to.path) !== -1) {
    next();
  } else {
    const checkHasconfigure = async () => {
      const apps = store.getters.getmicroApps;
      if (Object.keys(apps).length) {
        const { fullPath, path, query, name } = to;
        const service = await store.dispatch("checkService", fullPath),
          isMainServe = service.isMainServe,
          currentService = service.currentService;
        let pageName = to.name;
        setServiceBasicInfo({
          isMainServe,
          currentService,
          fullPath,
          pageName: to.name,
          callBack: next,
        });
      } else {
        setTimeout(() => {
          checkHasconfigure();
        }, 10);
      }
    };
    checkHasconfigure();
  }
});
