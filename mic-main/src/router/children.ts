export default [
  {
    path: "/vie/vcc",
    redirect: "/vie/vcc/index",
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
      },
      {
        path: "/vie/vcc/detail",
        hidden: true,
        meta: {
          title: "路由详情",
        },
      },
    ],
  },
  {
    path: "/vue/index",
    hidden: false,
    meta: {
      title: "vue项目",
      elIcon: "Operation",
    },
  },
];
