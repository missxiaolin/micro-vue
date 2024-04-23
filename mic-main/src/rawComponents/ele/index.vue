<template>
  <div class="element-class">
    <eFrom />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import eFrom from "./form.vue";
import { deepLCEle } from "../../utils/vcc/initRawComponent";

export default defineComponent({
  components: {
    eFrom,
  },
  emits: ["mounted"],
  setup(props, { emit }) {
    emit("mounted");
    // 对所有拥有lc-mark的元素进行初始化
    let countComponentCount = ref(0);

    onMounted(() => {
      deepLCEle(document.querySelector(".element-class"), () => {
        countComponentCount.value++;
      });
    });
  },
});
</script>
