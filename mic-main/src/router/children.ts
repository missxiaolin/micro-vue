export default [
  {
    path: "/vie/vcc",
    meta: {
      title: "项目",
      elIcon: "Operation",
    },
    children: [
      {
        path: "/bba/list",
        hidden: false,
        meta: {
          title: "项目列表",
        },
      }
    ],
  },
  {
    path: "/hba/index",
    meta: {
      title: "项目",
      elIcon: "ElementPlus",
    },
    children: [
      {
        path: "/hba/index",
        hidden: false,
        meta: {
          title: "测试1",
        },
      }, {
        path: "/vsa/index",
        hidden: false,
        meta: {
          title: "测试2",
        },
      }
    ],
  },
  
];
