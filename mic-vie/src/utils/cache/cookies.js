/** 统一处理 Cookie */

import CacheKey from "../../constants/cache-key"
import Cookies from "js-cookie"

export const getToken = () => {
  return Cookies.get(CacheKey.TOKEN)
}
export const setToken = (token) => {
  Cookies.set(CacheKey.TOKEN, token)
}
export const removeToken = () => {
  Cookies.remove(CacheKey.TOKEN)
}

/**
 * 存储
 * @param key 
 * @param value 
 */
export const setCookie = (key, value) => {
  Cookies.set(key, value)
}

/**
 * 取
 * @param key 
 * @returns 
 */
export const getCookie = (key) => {
  return Cookies.get(key)
}