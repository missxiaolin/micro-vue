<template>
  <div class="container">
    <el-tabs tab-position="left" class="left-tabs">
      <!-- <div class="">
        <el-icon>
          <DArrowRight />
        </el-icon>
      </div> -->
      <el-tab-pane v-for="(item, index) in iconArray" :key="index" :label="item.labelName">
        <keep-alive>
          <component
            :is="item.componentName"
            @mounted="onMouted"
          ></component>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import elBase from "../../rawComponents/elBase/index.vue";
import htmlRow from "../../rawComponents/html/index.vue";

export default {
  components: {
    elBase,
    htmlRow
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
          labelName: 'html组件',
          className: "demonstration-raw",
          selectIndex: 0,
          componentName: "htmlRow",
          titleArray: [],
        }, {
          labelName: '基础组件',
          className: "demonstration-element",
          selectIndex: 0,
          componentName: "elBase",
          titleArray: [],
        },
      ],
      currentIndex: 0,
    };
  },
  methods: {
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
  width: 318px;
  display: flex;
  height: 100%;
  padding-right: 20px;
  .left-tabs {
    position: relative;
  }
}
</style>
