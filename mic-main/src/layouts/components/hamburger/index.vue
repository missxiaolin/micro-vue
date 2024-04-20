<template>
  <div @click="toggleClick">
    <el-icon :size="20" class="icon">
      <Fold v-if="props.isActive" />
      <Expand v-else />
    </el-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { Expand, Fold } from "@element-plus/icons-vue";

export default defineComponent({
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["toggleClick"],
  setup(props, { emit }) {
    const toggleClick = () => {
      emit("toggleClick");
    };
    return {
      props,
      toggleClick,
      Expand,
      Fold,
    };
  },
});
</script>

<style lang="scss" scoped>
.icon {
  vertical-align: middle;
}
</style>
