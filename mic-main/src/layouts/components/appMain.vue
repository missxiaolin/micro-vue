<template>
  <section class="app-main">
    <div class="app-scrollbar">
      <template v-if="getIsMainService">
        <router-view :key="key"></router-view>
      </template>
      <div v-for="(item, index) in getmicroApps" :key="index">
        <div v-show="item.name == getCurrentService.name">
          <micro-app
            :name="item.name"
            :key="item.name"
            :url="item.url"
            :baseroute="item.baseroute"
            :iframe="item.iframe"
            disable-memory-router
            @datachange="handleDataChange"
          ></micro-app>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore, mapGetters } from "vuex";
import microApps from "../../utils/mock";

export default {
  computed: {
    ...mapGetters(["getmicroApps", "getCurrentService", "getIsMainService"]),
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    function getMicroOnlineConfig() {
      // TOODO: 获取微服务配置
      store.commit("setmicroApps", microApps);
    }
    function handleDataChange(e: any) {
      // TOODO:
    }

    const key = computed(() => {
      // 返回 route.path 和 route.fullPath 有着不同的效果，大多数时候 path 更通用
      return route.path;
    });
    onMounted(() => {
      getMicroOnlineConfig();
    });
    return {
      handleDataChange,
      key,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixins.scss";

.app-main {
  width: 100%;
  height: auto !important;
  background-color: var(--v3-body-bg-color);
}

.app-scrollbar {
  height: 100%;
  overflow: auto;
  @include scrollbar;
  padding: 15px;
  box-sizing: border-box;
}
</style>
