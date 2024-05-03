import _ from "lodash";
import Page from "../../../controller/page";
import RouterConfigBuilder from "../../../library/utils/router_config_builder";

const pageController = new Page();

// 路由保存
const pageSave = RouterConfigBuilder.routerConfigBuilder(
  "/adm/page/save",
  RouterConfigBuilder.METHOD_TYPE_POST,
  (req, res) => {
    return pageController.save(req, res);
  },
  true
);

// 路由列表
const pageList = RouterConfigBuilder.routerConfigBuilder(
  "/adm/page/list",
  RouterConfigBuilder.METHOD_TYPE_POST,
  (req, res) => {
    return pageController.pageList(req, res);
  },
  true
);

export default {
  ...pageSave,
  ...pageList,
};
