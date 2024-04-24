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

<script>
import { defineComponent, ref, computed } from "vue";
import ele from "../../rawComponents/ele/index.vue";

export default {
  components: {
    ele,
  },
  computed: {
    currentSelectBrand() {
      return this.iconArray[this.currentIndex];
    },
    componentUnitNum() {
      return 0;
    },
  },
  data() {
    return {
      iconArray: [
        {
          icon: "ele",
          className: "demonstration-element",
          selectIndex: 0,
          componentName: "ele",
          titleArray: [],
        },
      ],
      currentIndex: 0,
    };
  },
  methods: {
    onSelectElement(index) {
      if (this.iconArray[index].enable) {
        this.currentIndex = index;
      }
    },
    onMouted(index) {
      this.initOnly(this.iconArray[index || 0]);
    },
    /**
     * 初始化组件导航栏，只有2个及以上的组件类才会出现
     */
    initOnly(mountedObject) {
      const titles = document.getElementsByClassName(mountedObject.className);

      if (titles.length > 1) {
        for (let i = 0; i < titles.length; i++) {
          const element = titles[i];
          const arr = element.textContent.split(" ");
          mountedObject.titleArray.push({
            titleChinese: arr.length === 2 ? arr[1] : arr[0],
            titleEnglish: arr.length === 1 ? null : arr[0],
            element: element,
          });
        }
      } else if (titles.length === 1) {
        mountedObject.onlyTitle = {
          element: titles[0],
        };
      }
    },
  },
};
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
