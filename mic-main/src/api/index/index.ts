import { request } from "@/utils/service";

/**
 * 导航栏
 * @returns 
 */
export function getColum() {
  return request<any>({
    url: "/adm/get/colum",
    method: "get",
  });
}

/**
 * 微前端配置
 * @returns 
 */
export function getMicro() {
  return request<any>({
    url: "/adm/get/micro",
    method: "get",
  });
}