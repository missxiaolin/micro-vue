<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/vie/index">跳转vie应用</router-link>
    </nav>
    <template v-if="getIsMainService">
      <router-view />
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
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useStore, mapGetters } from "vuex";
import microApps from "./utils/mock";

export default defineComponent({
  computed: {
    ...mapGetters(["getmicroApps", "getCurrentService", "getIsMainService"]),
  },
  setup() {
    const store = useStore();
    function getMicroOnlineConfig() {
      // TOODO: 获取微服务配置
      store.commit("setmicroApps", microApps);
    }

    function handleDataChange(e: any) {
      // TOODO:
      console.log(e);
    }

    onMounted(() => {
      getMicroOnlineConfig();
    });
    return {
      handleDataChange,
    };
  },
});
</script>

<style lang="scss"></style>
