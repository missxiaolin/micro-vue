export default [
  {
    path: "/vie/vcc",
    meta: {
      title: "项目",
      elIcon: "Operation",
    },
    children: [
      {
        path: "/vie/vcc/index",
        hidden: false,
        meta: {
          title: "路由列表",
        },
      }, {
        path: "/vie/vcc/detail",
        hidden: true,
        meta: {
          title: "路由详情",
        },
      }, {
        path: "/bba/list",
        hidden: false,
        meta: {
          title: "项目列表",
        },
      }
    ],
  },
  {
    path: "/cha/hba",
    meta: {
      title: "项目",
      elIcon: "ElementPlus",
    },
    children: [
      {
        path: "/cha/hba/index",
        hidden: false,
        meta: {
          title: "概括",
        },
      },
      {
        path: "/cha/hba/ceshi",
        hidden: false,
        meta: {
          title: "测试",
        },
      },
    ],
  },
  
];
