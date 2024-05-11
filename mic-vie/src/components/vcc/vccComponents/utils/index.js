export const formArr = [
  // {
  //   name: "自定补全输入框",
  //   label: "",
  //   valueName: "",
  //   value: "",
  //   type: "autocomplete",
  //   rule: [],
  //   propsData: [],
  // },
  // {
  //   name: "级联选择器",
  //   label: "",
  //   valueName: "",
  //   value: "",
  //   type: "cascader",
  //   rule: [],
  //   propsData: [],
  // },
  // {
  //   name: "多选框",
  //   label: "",
  //   valueName: "",
  //   value: "",
  //   type: "checkbox-group",
  //   rule: [],
  //   propsData: [],
  // },
  // {
  //   name: "日期选择器",
  //   label: "",
  //   valueName: "",
  //   value: "",
  //   type: "date-picker",
  //   rule: [],
  //   propsData: [],
  // },
  {
    name: "输入框",
    label: "",
    valueName: "",
    value: "",
    type: "input",
    rule: {
      isRequire: false,
      errorMessage: ""
    },
    propsData: {

    },
    propsDataSelects: [
      {
        name: "最大长度",
        key: "maxlength",
        value: ""
      }, {
        name: "最小长度",
        key: "minlength",
        value: ""
      }, {
        name: "占位文本",
        key: "placeholder",
        value: ""
      }, {
        name: "是否可清空",
        key: "clearable",
        value: "false"
      }, {
        name: "是否显示统计字数",
        key: "show-word-limit",
        value: ""
      }, {
        name: "是否显示密码图标",
        key: "show-password",
        value: ""
      }
    ]
  },
  // {
  //   name: "数字输入框",
  //   label: "",
  //   valueName: "",
  //   value: "",
  //   type: "input-number",
  //   rule: [],
  //   propsData: [],
  // },
  // {
  //   name: "单选按钮",
  //   label: "",
  //   valueName: "",
  //   value: "",
  //   type: "radio-group",
  //   rule: [],
  //   propsData: [],
  // },
  // {
  //   name: "下拉选择器",
  //   label: "",
  //   valueName: "",
  //   value: "",
  //   type: "select",
  //   rule: [],
  //   propsData: [],
  // },
  // {
  //   name: "时间选择",
  //   label: "",
  //   valueName: "",
  //   value: "",
  //   type: "time-select",
  //   rule: [],
  //   propsData: [],
  // },
];
