// @ts-nocheck

import { validURL } from "@/utils/validate"
import { verifySwitch } from '@/utils/utils'

const micro = {
  state: {
    microApps: {}, // 开发模式下微服务列表
    currentService: {}, // 当前服务
    isMainService: true,
    devService: {
      "micro-vie": {
        host: "", // 可选项
        port: 8091, // 必填项
        debugging: true, //是否开启开发验证模式
      },
    },
  },
  mutations: {
    // 存储子服务列表
    setmicroApps(state, apps) {
      state.microApps = apps;
    },
  },
  actions: {
    /**
     * @description 获取当前归属服务
     * @param param0 
     * @param fullPath 
     */
    checkAscriptionService({ commit, state }, fullPath) {
      // 非主服务， 获取子服务细腻下
      const microApps = state.microApps;
      console.log('microApps----', microApps, fullPath)
      if (validURL(fullPath)) {
        fullPath = fullPath.split(".com")[1];
      }
      fullPath = fullPath.charAt(0) == "/" ? `${fullPath}` : `/${fullPath}`;
      const pathSplit = fullPath.split("/");
      const serviceName = pathSplit[1];
      let currentService = {};
      // 遍历服务 判断归属服务
      for (let key in microApps) {
        if ((microApps[key].systemCodes || []).includes(serviceName)) {
          currentService = microApps[key];
          break;
        }
      }
      // 非子服务 ，就算主服务 兼容白名单，新增服务未配置
      const isMainServe = !Object.keys(currentService).length;
      return { isMainServe, currentService, fullPath };
    },
    // 存储当前路由匹配的服务相关信息
    checkService({ dispatch, state }, fullPath) {
      return new Promise(async (resolve) => {
        console.log("state.microApps----", (state.microApps), micro);
        const { isMainServe, currentService } = await dispatch('checkAscriptionService', fullPath);
        const serviceName = currentService.name;
        // 服务是否开启 本地开发模式
        if (!isMainServe && state.devService[serviceName] && state.devService[serviceName].debugging && Object.keys(currentService).length && !verifySwitch) {
          currentService.url = `${location.protocol}//${state.devService[serviceName].host || "localhost"}:${state.devService[serviceName].port}`;
          // currentService.inline = true;
        }
        resolve({ isMainServe, currentService });
      })
    },
    setCurrentService({ commit, state }, { isMainServe, currentService, fullPath } = {}) {
      state.isMainService = isMainServe;
      state.currentService = currentService;
      state.currentFullPath = fullPath;
    },
  },
};

export default micro;
