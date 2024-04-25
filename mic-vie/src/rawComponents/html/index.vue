<template lc_id="vSeYn6dQcE">
  <div lc_id="NahfEKxF68" class="demonstration-raw">
    <table border="0" lc_id="RDLbKPIVyp">
      <tr lc_id="riqra/6H1d">
        <td lc_id="RhfgQCKISj">
          <div class="title" lc_id="OnWMPOSYwo">div:</div>
        </td>
        <td lc_id="ZOFUAuegZ7">
          <div lc_id="jayChQGWVD" div-lc-mark lc-mark></div>
        </td>
      </tr>
      <tr lc_id="i+v/R6TP05">
        <td lc_id="wLL4oua+v6">
          <div class="title" lc_id="ySJLvpCtUj">span:</div>
        </td>
        <td lc_id="Wg/gdfZ1hC">
          <span lc_id="m+Oy7pHzNT" lc-mark>Span Element</span>
        </td>
      </tr>
      <tr lc_id="Ejan36KyM/">
        <td lc_id="ke9QDthYso">
          <div class="title" lc_id="V2t1JzpJnA">a（超链接）:</div>
        </td>
        <td lc_id="SUPSw5gtWC">
          <a lc-mark lc_id="MjGtLkly03">W3School</a>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import { deepLCEle } from "../../utils/initRawComponent";
export default {
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
