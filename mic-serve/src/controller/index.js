import Base from "./base";
import md5 from "md5";
import AdmUser from "../model/adm_user";
import Token from "../library/utils/token";

const admUser = new AdmUser();

/**
 * 首页
 */
export default class Index extends Base {
  /**
   * 首页测试
   * @param {*} req
   * @param {*} res
   */
  index(req, res) {
    let data = req.body || {};
    console.log(data);
    return this.send(res, { title: "保存成功" });
  }

  /**
   * adm 登录
   * @param {*} req
   * @param {*} res
   */
  async login(req, res) {
    let data = req.body || {};
    if (!data.username || !data.password) {
      return this.send(res, {}, false, "账号密码错误");
    }
    data.password = md5(data.password);
    let user = await admUser.getUser(data);
    if (user && user.id) {
      return this.send(res, {
        userId: user.id,
        token: Token.encrypt({ id: user.id }),
      });
    } else {
      return this.send(res, {}, false, "账号密码错误");
    }
  }
}
