const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: ["*"],
  chainWebpack: (config) => {
    // SVG 规则排除 icons 目录
    config.module.rule("svg").exclude.add(path.resolve("src/assets/icons"));

    // 添加 icons 目录的 SVG loader
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(path.resolve("src/assets/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ symbolId: "icon-[name]" });
  },
});
