// @ts-nocheck
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
  actions: {},
};

export default micro;
