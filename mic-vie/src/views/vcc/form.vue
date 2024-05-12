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
            onChange: this.change,
            maxlength: 4,
            integer: true,
            clearable: true,
            placeholder: "please input",
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
