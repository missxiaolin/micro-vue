<template>
  <div>
    <l-form form="formItem" :span="8"></l-form>
  </div>
</template>

<script>
const myOptions = [
  {
    value: "Shanghai",
    label: "Shanghai",
    id: "1",
    text: "Shanghai1",
  },
  {
    value: "Beijing",
    label: "Beijing",
    id: "2",
    text: "Beijing1",
  },
];

export default {
  data() {
    return {
      formItem: [
        {
          label: "配置名称",
          valueName: "id",
          value: "",
          type: "input",
          rule: [
            {
              required: true,
              message: "请输入配置名称",
            },
          ],
          propsData: {
            maxlength: 4,
            integer: true,
            clearable: true,
            placeholder: "please input",
          },
        },
        {
          label: "配置名称",
          valueName: "ceshi",
          value: "",
          type: "select",
          rule: [],
          propsData: {
            type: "number",
            maxlength: 4,
            integer: true,
            clearable: true,
            placeholder: "please input",
          },
        },
        {
          label: "配置状态",
          valueName: "status",
          value: "",
          type: "select",
          propsData: {
            customValue: "id",
            customLabel: "text",
            placeholder: "Please Select",
            clearable: true,
          },
          options: myOptions,
        },
      ],
    };
  },
};
</script>
