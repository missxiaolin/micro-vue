import env from "./env";

// 开发环境配置
const development = {
  "micro-vie": {
    name: "micro-vie",
    url: "http://localhost:8091",
    // "url": "http://micro-adm.missxiaolin.com/vie",
    inline: false,
    destroy: false,
    disableScopecss: true,
    disableSandbox: false,
    shadowDOM: false,
    iframe: true,
    systemCodes: ["vcc", "bba"],
    openBlank: false,
  },
  "micro-cha": {
    name: "micro-cha",
    url: "http://localhost:8092",
    // "url": "http://micro-adm.missxiaolin.com/cha",
    inline: false,
    destroy: false,
    disableScopecss: true,
    disableSandbox: false,
    shadowDOM: false,
    iframe: true,
    systemCodes: ["hba", "vsa"],
    openBlank: false,
  },
};
// 测试环境配置
const testing = development;

// 线上环境
const production = {
  "micro-vie": {
    name: "micro-vie",
    "url": "http://micro-adm.missxiaolin.com/vie",
    inline: false,
    destroy: false,
    disableScopecss: true,
    disableSandbox: false,
    shadowDOM: false,
    iframe: true,
    systemCodes: ["vcc", "bba"],
    openBlank: false,
  },
  "micro-cha": {
    name: "micro-cha",
    "url": "http://micro-adm.missxiaolin.com/cha",
    inline: false,
    destroy: false,
    disableScopecss: true,
    disableSandbox: false,
    shadowDOM: false,
    iframe: true,
    systemCodes: ["hba", "vsa"],
    openBlank: false,
  },
};

let config = {
  development,
  testing,
  production,
};

export default config[env];
