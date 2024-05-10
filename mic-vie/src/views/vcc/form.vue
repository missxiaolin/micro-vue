<template>
  <div>
    <l-form v-model:form="formItem" :span="8"></l-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formItem: [
        {
          label: "配置名称",
          valueName: "id",
          value: "",
          type: "input",
          rules: [],
          propsData: {
            maxlength: 4,
            integer: true,
            clearable: true,
            placeholder: "please input",
          },
        }, {
          label: "配置名称",
          valueName: "ceshi",
          value: "",
          type: "select",
          rules: [],
          propsData: {
            type: "number",
            maxlength: 4,
            integer: true,
            clearable: true,
            placeholder: "please input",
          },
        },
      ],
    };
  },
};
</script>
