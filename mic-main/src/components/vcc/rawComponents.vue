<template lc_id="OpUzJauqXb">
  <div lc_id="wL/ZpJzwjh" class="container">
    <!-- <nav class="top-nav">
      <div
        :index="index + ''"
        v-for="(item, index) in iconArray"
        @click="onSelectElement(index)"
        :key="item.icon"
        :class="{ active: currentIndex === index }"
        class="main-icon-container"
      >
        <svg-icon :icon-class="item.icon" class="icon" />
      </div>
    </nav> -->
    <div class="z">
      <keep-alive>
        <component
          :is="currentSelectBrand.componentName"
          @mounted="onMouted"
        ></component>
      </keep-alive>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import ele from "../../rawComponents/ele/index.vue";

export default defineComponent({
  components: {
    ele,
  },
  setup() {
    const iconArray = ref([
      {
        icon: "ele",
        className: "demonstration-element",
        selectIndex: 0,
        componentName: "ele",
        titleArray: [],
      },
    ]);
    const currentIndex = ref(0);

    const currentSelectBrand = computed(() => {
      return iconArray.value[currentIndex.value];
    });

    const onSelectElement = (index: any) => {};

    const initOnly = (mountedObject: any) => {
      if (!mountedObject) {
        return;
      }
      console.log(mountedObject);
    };

    const onMouted = () => {
      // 这里目前只支持ele，所以只写了1
      initOnly(iconArray.value[1]);
    };

    return {
      iconArray,
      currentIndex,
      onSelectElement,
      onMouted,
      currentSelectBrand,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  height: 100%;
  .top-nav {
    margin-right: 10px;
  }
}
.main-icon-container {
  padding: 10px;
  line-height: 0;

  &:hover {
    background: rgb(236, 245, 255);
    border-radius: 5px;
  }
}
nav {
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid #f0f0f0;
}
.z {
  overflow: auto;
  padding: 0 10px;
  width: 100%;
}
</style>
