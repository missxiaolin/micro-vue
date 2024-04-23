<template>
  <div class="vcc-box">
    <div class="main-main">
      <nav class="base-component-container">
        <raw-components></raw-components>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import rawComponents from "../components/vcc/rawComponents.vue"

export default defineComponent({
    components: {
        rawComponents
    },
    setup() {
        return {}
    }
})
</script>

<style lang="scss" scoped>
.vcc-box {
  display: flex;
  height: 100%;
}
.main-main {
  width: 100%;
  height: 100%;
  display: flex;
  .base-component-container {
    border-radius: 0px;
  }
}
</style>
