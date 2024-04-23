<template>
  <div class="main-app-content">
    <template v-if="['/login'].includes(route.path)">
      <ElConfigProvider :locale="lang" :key="key">
        <router-view />
      </ElConfigProvider>
    </template>
    <template v-else>
      <ElConfigProvider :locale="lang">
        <layouts></layouts>
      </ElConfigProvider>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { useRoute } from "vue-router";
import layouts from "./layouts/index.vue";
import { useTheme } from "./hooks/useTheme";

export default defineComponent({
  components: {
    layouts,
  },
  setup() {
    const lang = ref(zhCn);
    const route = useRoute();
    const key = computed(() => {
      return route !== undefined
        ? route.path + +new Date()
        : // @ts-ignore
          route + +new Date();
    });
    const { initTheme } = useTheme();
    /** 初始化主题 */
    initTheme();
    return {
      lang,
      route,
      key,
    };
  },
});
</script>

<style lang="scss"></style>
