import { request } from "../utils/fetch";

/**
 * 项目保存
 * @param data
 * @returns
 */
export function projectSave(data) {
  return request({
    url: "/adm/project/save",
    method: "post",
    data,
  });
}


export function projectList(data) {
  return request({
    url: "/adm/project/list",
    method: "post",
    data,
  });
}