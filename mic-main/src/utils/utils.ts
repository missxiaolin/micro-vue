/**
 * @method : 是否开启权限校验
 * 1、本地开发模式       ----> false
 * 2、在线打包发布模式    ----> true
 */
export const verifySwitch = process.env.NODE_ENV === "production";
