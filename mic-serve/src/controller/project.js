import Base from "./base";
import moment from "moment";
import ProjectModel from "../model/project";

const projectModel = new ProjectModel();

/**
 * 项目controller
 */
export default class Project extends Base {
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
      result = await projectModel.save({
        ...data,
        create_time: startAt,
        update_time: startAt,
      });
    }
    return this.send(res, result);
  }

  /**
   * 获取项目列表
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async projectList(req, res) {
    let data = req.body || {},
      result = {};

    result.list = await projectModel.getPages(data);
    result.count = await projectModel.getPagesCount(data);
    return this.send(res, result);
  }
}