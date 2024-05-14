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
            valueName: "c",
            value: "",
            type: "autocomplete",
            rule: [],
            propsData: {
              fetchSuggestions:
                "return (e) => {\n    // this.vue 就是vue的当前实例\n    console.log(e, this.vue);\n}\n",
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
