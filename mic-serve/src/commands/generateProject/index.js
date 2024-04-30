import Base from "../base";
import path, { resolve } from "path";
import fs from "fs";

const { exec } = require("child_process");

class GenerateProject extends Base {
  static get signature() {
    return `
            Generate:Project 
            {id:[必传]用户名}
         `;
    // return `

    //     {id:[必传]页面id}
    //  `
  }

  static get description() {
    return "项目页面生成";
  }

  async execute(args, options) {
    const targetDirectory = resolve(__dirname, "../../../../mic-vue");

    const content = fs.readFileSync(
      resolve(__dirname, "../../../uploads/ceshi/detail.vue"),
      "utf8"
    );

    // 切换到目标文件夹
    process.chdir(targetDirectory);
    fs.writeFileSync(
      resolve(__dirname, "../../../../mic-vue/src/views/ceshi/index.vue"),
      content
    );
    exec("npm run build", (error, stdout, stderr) => {
      if (error) {
        console.error(`执行命令失败: ${error.message}`);
        return;
      }

      console.log(`执行命令成功，输出结果: ${stdout}`);
    });
  }
}

export default GenerateProject;
