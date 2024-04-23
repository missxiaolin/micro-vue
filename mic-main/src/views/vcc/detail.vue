<template>
  <vcc :initCodeEntity="codeInfoEntity" @updateCodeEntity="onCodeUpdate"></vcc>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import vcc from "../../components-v2/vcc.vue";
const initCodeStr =
  '{"template":{"lc_id":"root","__children":[{"div":{"class":"container","style":"min-height: 100%; padding-bottom: 100px;","lc_id":"container","__children":[{"div": {"__text__": "{{showText}}","lc_id": "text"}}]}}]}}';

export default defineComponent({
  components: {
    vcc,
  },
  setup() {
    const codeInfoEntity = ref({
      codeStructure: JSON.parse(initCodeStr),
      JSCode: `
{
  data() {
    return {
      showText: "这里的值声明于预设JS代码"
    };
  },
  methods: {
    
  },
}`,
    });

    const onCodeUpdate = ({ codeRawVueInfo, JSCode }: any) => {
      // 编辑后新的代码结构
      // codeRawVueInfo为template对象表示结构
      // JSCode为显式输入的JS逻辑
    };
    return {
      codeInfoEntity,
      onCodeUpdate
    };
  },
});
</script>
