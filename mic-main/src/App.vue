<template>
  <div>
    <template v-if="getIsMainService">
      <a-config-provider :locale="lang">
        <router-view />
      </a-config-provider>
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
import { defineComponent, onMounted, ref } from "vue";
import { useStore, mapGetters } from "vuex";
import cn from "@arco-design/web-vue/es/locale/lang/zh-cn";
import en from "@arco-design/web-vue/es/locale/lang/en-us";
import microApps from "./utils/mock";

export default defineComponent({
  computed: {
    ...mapGetters(["getmicroApps", "getCurrentService", "getIsMainService"]),
  },
  setup() {
    const store = useStore();
    // const lang = ref(store.language === "zh_CN" ? cn : en);
    const lang = ref(cn)
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
      lang
    };
  },
});
</script>

<style lang="scss"></style>
