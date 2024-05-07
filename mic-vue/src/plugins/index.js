import { loadElementPlus } from "./element-plus";
import { loadElementPlusIcon } from "./element-plus-icon";
import SvgIcon from "@/components/svgIcon/index.vue"; // svg组件
import SearchLabel from "@/components/searchLabel/index.vue";
import LTable from "@/components/lTable/index.vue";
import Pop from "@/components/pop/index.vue";

import "virtual:svg-icons-register";
export function loadPlugins(app) {
  loadElementPlus(app);
  loadElementPlusIcon(app);
  // 注册到全局
  app.component("svg-icon", SvgIcon);
  app.component("search-label", SearchLabel);
  app.component("l-table", LTable);
  app.component("l-pop", Pop);
}