const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/vue/' : '/',
  devServer: {
    host: '',
    port: 8092, // 端口
    // https: true,
    // hotOnly: false,//host 是否唯一
    // open: true, // 自动开启浏览器
    // proxy: '', // string | object
    // disableHostCheck: true,
    // compress: false, // 开启压缩
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    // overlay: {
    //   warnings: false,
    //   errors: true
    // }
  }
})
