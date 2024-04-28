<template>
  <div class="element-class">
    <htmlRow></htmlRow>
    <eFrom></eFrom>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";
import eFrom from "./form.vue";
import htmlRow from "../html/row.vue";
import { deepLCEle } from "../../utils/initRawComponent";

export default {
  components: {
    eFrom,
    htmlRow,
  },
  data() {
    return {};
  },
  mounted() {
    this.$emit("mounted");
    // 对所有拥有lc-mark的元素进行初始化
    deepLCEle(document.querySelector(".element-class"), () => {});
  },
};
</script>
