<template>
  <div>
    <l-form :form="formItem" :span="8"></l-form>
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
          label: "状态类型",
          valueName: "statusType",
          value: [],
          options: [
            {
              value: "1",
              label: "表单1",
            },
            {
              value: "2",
              label: "表单2",
            },
          ],
          type: 'select'
          // type: "checkbox-group",
          // type: "radio-group",
        },
        // {
        //   label: "爱好",
        //   valueName: "ah",
        //   value: "1",
        //   type: "radio-group",
        //   rule: [],
        //   propsData: {},
        //   options: [
        //     {
        //       label: "篮球",
        //       value: "1",
        //     },
        //     {
        //       label: "足球",
        //       value: "2",
        //     },
        //   ],
        // },
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
