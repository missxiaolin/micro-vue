import Base from "./base";
import moment from "moment";
import PageRouteModel from "../model/page_route";

const pageRouteModel = new PageRouteModel();

/**
 * 项目controller
 */
export default class Page extends Base {
  /**
   * 保存
   * @param {*} req
   * @param {*} res
   */
  async save(req, res) {
    let data = req.body || {},
      startAt = moment().format("YYYY-MM-DD HH:mm:ss"),
      result = {};

    if (data.id == 0 || !data.id) {
      result = await pageRouteModel.save({
        ...data,
        create_time: startAt,
        update_time: startAt,
      });
    } else {
      let param = {
        ...data,
        update_time: startAt,
      };
      delete param.project_id
      delete param.path
      result = await pageRouteModel.update(param, param.id);
    }
    return this.send(res, result);
  }

  /**
   * 获取详情
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  async detail(req, res) {
    let data = req.body || {},
      result = {};
    result = await pageRouteModel.getPageDetail(data);
    if (result.length == 0) {
      return this.send(res, result, false, '未找到该路由');
    }
    return this.send(res, result);
  }
  

  /**
   * 获取项目列表
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async pageList(req, res) {
    let data = req.body || {},
      result = {};

    result.list = await pageRouteModel.getPages(data);
    result.count = await pageRouteModel.getPagesCount(data);
    return this.send(res, result);
  }
}
