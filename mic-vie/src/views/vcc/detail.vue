<template>
  <vcc
    :initCodeEntity="codeInfoEntity"
    @updateCodeEntity="onCodeUpdate"
    @onLoadFinish="onLoadFinish"
  ></vcc>
</template>

<script>
import { defineAsyncComponent } from "vue";
// 以这样一段结构初始化VCC组件
const initCodeStr =
  '{"template":{"lc_id":"root","__children":[{"div":{"class":"container","style":"min-height: 100%;","lc_id":"container","__children":[]}}]}}';

export default {
  components: {
    vcc: defineAsyncComponent(() => import("../../components-v2/vcc.vue")),
  },
  data() {
    return {
      codeInfoEntity: {
        codeStructure: JSON.parse(initCodeStr),
        JSCode: `
{
  data() {
    return { 
    };
  },
  methods: {
  },
}`,
      },
    };
  },
  mounted() {},
  methods: {
    onCodeUpdate({ codeRawVueInfo, JSCode }) {
      // 编辑后新的代码结构
      // codeRawVueInfo为template对象表示结构
      // JSCode为显式输入的JS逻辑
    },
    onLoadFinish() {},
  },
};
</script>
