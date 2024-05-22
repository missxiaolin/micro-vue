import { request } from "@/utils/service";

/**
 * 导航栏
 * @returns 
 */
export function getColum(data: any) {
  return request<any>({
    url: "/adm/get/colum",
    method: "post",
    data
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