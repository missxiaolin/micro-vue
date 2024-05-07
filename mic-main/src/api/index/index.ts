import { request } from "@/utils/service";
export function getColum() {
  return request<any>({
    url: "/adm/get/colum",
    method: "get",
  });
}
