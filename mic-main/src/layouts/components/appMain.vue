<template>
  <section class="app-main">
    <div class="app-scrollbar">
      <div v-if="getIsMainService">
        <router-view :key="key"></router-view>
      </div>
      <div v-for="(item, index) in getmicroApps" :key="index">
        <div v-if="item.name == getCurrentService.name">
          <micro-app
            :name="item.name"
            :key="item.name + new Date().getTime()"
            :url="item.url"
            :inline="item.inline"
            :iframe="item.iframe"
            :destroy="item.destroy"
            :disableScopecss="item.disableScopecss"
            :disableSandbox="item.disableSandbox"
            :shadowDOM="item.shadowDOM"
            router-mode="native"
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
import { getMicro } from '../../api/index/index'

export default {
  computed: {
    ...mapGetters(["getmicroApps", "getCurrentService", "getIsMainService"]),
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    function handleDataChange(e: any) {
      // TOODO:
    }

    const key = computed(() => {
      // 返回 route.path 和 route.fullPath 有着不同的效果，大多数时候 path 更通用
      return route.path + new Date().getTime();
    });
    onMounted(() => {
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
  min-height: 100%;
  overflow: auto;
  @include scrollbar;
  padding: 15px;
  box-sizing: border-box;
}
</style>
