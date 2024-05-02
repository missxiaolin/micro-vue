/** 统一处理 Cookie */

import CacheKey from "../../constants/cache-key";
import Cookies from "js-cookie";
import { getCurrentInstance } from "vue";

export const getToken = () => {
  return Cookies.get(CacheKey.TOKEN, {
    domain:
      getCurrentInstance().appContext.app.config.globalProperties.$getDomain(),
  });
};
export const setToken = (token) => {
  Cookies.set(CacheKey.TOKEN, token, {
    domain:
      getCurrentInstance().appContext.app.config.globalProperties.$getDomain(),
  });
};
export const removeToken = () => {
  Cookies.remove(CacheKey.TOKEN, {
    domain:
      getCurrentInstance().appContext.app.config.globalProperties.$getDomain(),
  });
};

/**
 * 存储
 * @param key
 * @param value
 */
export const setCookie = (key, value) => {
  Cookies.set(key, value, {
    domain:
      getCurrentInstance().appContext.app.config.globalProperties.$getDomain(),
  });
};

/**
 * 取
 * @param key
 * @returns
 */
export const getCookie = (key) => {
  return Cookies.get(key, {
    domain:
      getCurrentInstance().appContext.app.config.globalProperties.$getDomain(),
  });
};
