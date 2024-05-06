import Base from "../base";
import PageRoute from '../../model/page_route'
import path, { resolve } from "path";
import fs from "fs";

const { exec } = require("child_process");
const pageRouteModel = new PageRoute()

class GenerateProject extends Base {
  static get signature() {
    return `
            Generate:Project 
            {projectId:[必传]项目ID}
            {id:[必传]路由ID}
         `;
    // return `

    //     {id:[必传]页面id}
    //  `
  }

  static get description() {
    return "项目页面生成";
  }

  async execute(args, options) {
    const { projectId, id } = args;

    // 获取路由配置
    const route = await pageRouteModel.getPageDetail({
      projectId,
      id
    })
    
    if (!route || route.length == 0) {
      this.log("页面不存在");
      return
    }

    // 生成页面
    
    console.log(route)

    // const targetDirectory = resolve(__dirname, "../../../../mic-vue");

    // const content = fs.readFileSync(
    //   resolve(__dirname, "../../../uploads/ceshi/detail.vue"),
    //   "utf8"
    // );

    // // 切换到目标文件夹
    // process.chdir(targetDirectory);
    // fs.writeFileSync(
    //   resolve(__dirname, "../../../../mic-vue/src/views/ceshi/index.vue"),
    //   content
    // );
    // exec("npm run build", (error, stdout, stderr) => {
    //   if (error) {
    //     console.error(`执行命令失败: ${error.message}`);
    //     return;
    //   }

    //   console.log(`执行命令成功，输出结果: ${stdout}`);
    // });
  }

  convertLogicCode(JSCode) {
    try {
      const JSCodeInfo = eval(
        `(function(){return ${JSCode.replace(/\s+/g, "")}})()`
      );
      // 保留JS代码
      this.JSCode = JSCode;
      
      return JSCodeInfo;
    } catch (e) {
      console.warn(
        `外部逻辑代码解析出错，解析的逻辑代码为: ${JSCode}, Error: ${e}`
      );
    }
  }
}

export default GenerateProject;
