<template>
  <div class="main-app-content">
    <template v-if="['/login'].includes(route.path)">
      <router-view />
    </template>
    <template v-else>
      <layouts></layouts>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref, computed } from "vue";
import { useRoute } from "vue-router";
import layouts from "./layouts/index.vue";
import { useTheme } from "./hooks/useTheme";
import { useStore } from "vuex";
import { getMicro } from './api/index/index'

export default defineComponent({
  components: {
    layouts,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const key = computed(() => {
      return route !== undefined
        ? route.path + +new Date()
        : // @ts-ignore
          route + +new Date();
    });
    const { initTheme } = useTheme();
    /** 初始化主题 */
    initTheme();
    const getMicroOnlineConfig = async () => {
      // TOODO: 获取微服务配置
      
      let res = await getMicro()
      if (res.success) {
        store.commit("setmicroApps", res.model);
      }
    }
    onBeforeMount(() => {
      getMicroOnlineConfig()
    })
    return {
      route,
      key,
    };
  },
});
</script>

<style lang="scss"></style>
