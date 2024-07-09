<template>
  <section
    class="app-main"
    :style="{
      height: h,
    }"
  >
    <div
      class="app-scrollbar"
      :style="{
        height: h,
      }"
    >
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
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getmicroApps", "getCurrentService", "getIsMainService"]),
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const h = ref("100vh");

    const handleWindowResize = () => {
      const innerHeight = window.innerHeight;
      h.value = `${innerHeight - 50}px`;
    };

    window.addEventListener("resize", handleWindowResize);

    handleWindowResize();

    function handleDataChange(e: any) {
      // TOODO:
    }

    const key = computed(() => {
      // 返回 route.path 和 route.fullPath 有着不同的效果，大多数时候 path 更通用
      return route.path + new Date().getTime();
    });
    onMounted(() => {});
    return {
      handleDataChange,
      key,
      h,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixins.scss";

.app-main {
  width: 100%;
  height: 700px !important;
  background-color: var(--v3-body-bg-color);
  overflow-y: auto;
}

.app-scrollbar {
  min-height: 100%;
  overflow-y: auto;
  @include scrollbar;
  padding: 15px;
  box-sizing: border-box;
}
</style>
