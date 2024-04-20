<template>
    <section class="app-main">
        <div class="app-scrollbar">
            <router-view></router-view>
        </div>
    </section>
</template>

<script lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();

    const key = computed(() => {
      // 返回 route.path 和 route.fullPath 有着不同的效果，大多数时候 path 更通用
      return route.path;
    });
    return {
      key,
    };
  },
};
</script>


<style lang="scss" scoped>
@import "@/assets/css/mixins.scss";

.app-main {
  width: 100%;
  background-color: var(--v3-body-bg-color);
}

.app-scrollbar {
  height: 100%;
  overflow: auto;
  @include scrollbar;
}
</style>