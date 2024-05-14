export const formArr = [
  {
    name: "自定补全输入框",
    label: "",
    valueName: "",
    value: "",
    type: "autocomplete",
    rule: {
      isRequire: false,
      errorMessage: "",
    },
    propsData: {},
    propsDataSelects: [
      {
        name: "占位文本",
        key: "placeholder",
        value: "",
      },
      {
        name: "是否可清空",
        key: "clearable",
        value: "",
        type: "data",
        data: [
          {
            label: "是",
            value: true,
          },
          {
            label: "否",
            value: false,
          },
        ],
      },
      {
        name: "是否禁用",
        key: "disabled",
        value: "",
        type: "data",
        data: [
          {
            label: "是",
            value: true,
          },
          {
            label: "否",
            value: false,
          },
        ],
      },
      {
        name: "回调函数",
        key: "fetchSuggestions",
        value: "",
        type: "function",
      },
    ],
  },
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
  {
    name: "日期选择器",
    label: "",
    valueName: "",
    value: "",
    type: "date-picker",
    rule: {
      isRequire: false,
      errorMessage: "",
    },
    propsData: {},
    propsDataSelects: [
      {
        name: "占位文本",
        key: "placeholder",
        value: "",
      },
      {
        name: "是否可清空",
        key: "clearable",
        value: "",
        type: "data",
        data: [
          {
            label: "是",
            value: true,
          },
          {
            label: "否",
            value: false,
          },
        ],
      },
      {
        name: "是否禁用",
        key: "disabled",
        value: "",
        type: "data",
        data: [
          {
            label: "是",
            value: true,
          },
          {
            label: "否",
            value: false,
          },
        ],
      },
      {
        name: "显示类型",
        key: "type",
        value: "",
        type: "data",
        data: [
          {
            label: "时间区间(年月日时分秒)",
            value: "datetimerange",
          },
          {
            label: "时间区间(年月日)",
            value: "daterange",
          },
          {
            label: "年月日时分秒",
            value: "datetime",
          },
          {
            label: "按周形式选择",
            value: "week",
          },
          {
            label: "年",
            value: "year",
          },
          {
            label: "月",
            value: "month",
          },
          {
            label: "日",
            value: "date",
          },
        ],
      },
      {
        name: "时间格式",
        key: "format",
        value: "",
        type: "data",
        data: [
          {
            label: "年-月-日",
            value: "YYYY-MM-DD",
          },
          {
            label: "年-月-日 时:分:秒",
            value: "YYYY-MM-DD HH:mm:ss",
          },
        ],
      },
      {
        name: "分隔符",
        key: "range-separator",
        value: "",
      },
      {
        name: "默认显示日期",
        key: "default-value",
        value: "",
      },
      {
        name: "绑定值时间格式",
        key: "value-format",
        value: "",
        type: "data",
        data: [
          {
            label: "年-月-日",
            value: "YYYY-MM-DD",
          },
          {
            label: "年-月-日 时:分:秒",
            value: "YYYY-MM-DD HH:mm:ss",
          },
        ],
      },
      {
        name: "更改日期触发",
        key: "onChange",
        value: "",
        type: "function",
      },
      {
        name: "失去焦点触发",
        key: "onBlur",
        value: "",
        type: "function",
      },
      {
        name: "获取焦点触发",
        key: "onFocus",
        value: "",
        type: "function",
      },
      {
        name: "calendar-change",
        key: "calendar-change",
        value: "",
        type: "function",
      },
    ],
  },
  {
    name: "输入框",
    label: "",
    valueName: "",
    value: "",
    type: "input",
    rule: {
      isRequire: false,
      errorMessage: "",
    },
    propsData: {},
    propsDataSelects: [
      {
        name: "是否禁用",
        key: "disabled",
        value: "",
        type: "data",
        data: [
          {
            label: "是",
            value: true,
          },
          {
            label: "否",
            value: false,
          },
        ],
      },
      {
        name: "最大长度",
        key: "maxlength",
        value: "",
      },
      {
        name: "最小长度",
        key: "minlength",
        value: "",
      },
      {
        name: "占位文本",
        key: "placeholder",
        value: "",
      },
      {
        name: "是否可清空",
        key: "clearable",
        value: "",
        type: "data",
        data: [
          {
            label: "是",
            value: true,
          },
          {
            label: "否",
            value: false,
          },
        ],
      },
      {
        name: "是否显示统计字数",
        key: "show-word-limit",
        value: "",
        type: "data",
        data: [
          {
            label: "是",
            value: true,
          },
          {
            label: "否",
            value: false,
          },
        ],
      },
      {
        name: "是否显示密码图标",
        key: "show-password",
        value: "",
        type: "data",
        data: [
          {
            label: "是",
            value: true,
          },
          {
            label: "否",
            value: false,
          },
        ],
      },
      {
        name: "类型",
        key: "type",
        value: "",
        type: "data",
        data: [
          {
            label: "文本",
            value: "text",
          },
          {
            label: "多行文本",
            value: "textarea",
          },
          {
            label: "密码",
            value: "password",
          },
        ],
      },
      {
        name: "失去焦点时触发",
        key: "onBlur",
        value: "",
        type: "function",
      },
      {
        name: "获得焦点时触发",
        key: "onFocus",
        value: "",
        type: "function",
      },
      {
        name: "输入框失去焦点触发",
        key: "onChange",
        value: "",
        type: "function",
      },
      {
        name: "值改变时触发",
        key: "onInput",
        value: "",
        type: "function",
      },
      {
        name: "clearable属性清空触发",
        key: "onClear",
        value: "",
        type: "function",
      },
    ],
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
