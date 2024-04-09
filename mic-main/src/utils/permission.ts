import router from "@/router";
import store from "@/store";
import { setServiceBasicInfo } from '@/utils/utils'

// 全局路由守卫 动态更新权限
router.beforeEach(async (to, from, next) => {
  const { fullPath, path, query, name } = to;
  const service = await store.dispatch("checkService", fullPath),
    isMainServe = service.isMainServe,
    currentService = service.currentService;
  let pageName = to.name;
  setServiceBasicInfo({ isMainServe, currentService, fullPath, pageName: to.name, callBack: next });
});
