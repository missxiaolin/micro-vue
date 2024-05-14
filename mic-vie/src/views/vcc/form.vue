<template>
  <div>
    <l-form :form="formItem" :span="8"></l-form>
    <!-- <editor :height="'500px'" /> -->
    <el-input>
      <template #prepend>Http://</template>
    </el-input>
  </div>
</template>

<script>
import editor from "../../components/editor/index.vue";
export default {
  components: {
    editor,
  },
  data() {
    return {
      formItem: [
        {
          label: "ceshi",
          valueName: "ce",
          value: "",
          type: "date-picker",
          rule: [],
          propsData: {
            placeholder: "请输入当前日期",
            type: "datetimerange",
            format: "YYYY-MM-DD HH:mm:ss",
            'value-format': "YYYY-MM-DD HH:mm:ss"
          },
        },
      ],
    };
  },
  mounted() {},
  methods: {
    change(e) {
      console.log(e);
    },
  },
};
</script>
