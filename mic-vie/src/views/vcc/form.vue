<template>
  <div>
    <l-s-form :form="formItem" :span="8"></l-s-form>
    <!-- <editor :height="'500px'" /> -->
    <!-- <el-input>
      <template #prepend>Http://</template>
    </el-input> -->
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
            label: "姓名",
            valueName: "name",
            value: "",
            type: "input",
            rule: {
              isRequire: true,
              errorMessage: "请输入姓名",
            },
            propsData: {},
          },
          {
            label: "密码",
            valueName: "password",
            value: "",
            type: "input",
            rule: {
              isRequire: true,
              errorMessage: "请输入密码",
            },
            propsData: {
              onInput:
                "return(e)=>{\n//this.vue就是vue的当前实例\nconsole.log(e,this.vue);\n}\n",
            },
          },
        ],
    };
  },
  mounted() {
    // this.formItem[1].value = "1";
    // this.formItem[1].propsData.disabled = true;
    // console.log(this.formItem[1])
  },
  methods: {
    change(e) {
      console.log(e);
    },
  },
};
</script>
