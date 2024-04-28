<template>
  <div class="demonstration-raw">
    <rowHtml />
  </div>
</template>
<script>
import { deepLCEle } from "../../utils/initRawComponent";
import rowHtml from "./row.vue";

export default {
  components: {
    rowHtml,
  },
  data() {
    return {};
  },

  mounted() {
    this.$emit("mounted");
    // 对所有拥有lc-mark的元素进行初始化
    let countComponentCount = 0;
    deepLCEle(document.querySelector(".demonstration-raw"), () => {
      countComponentCount++;
    });
  },
  methods: {},
};
</script>

<style scoped>
.title {
  width: 120px;
}

.demonstration-raw {
  padding: 10px 0;
}

[div-lc-mark] {
  border: 1px grey dashed;
  min-height: 1rem;
  border-radius: 5px;
}
</style>
