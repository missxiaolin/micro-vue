<template>
  <div class="row-container">
    <div class="icon-box" @click="clickDarrow">
      <el-icon size="20">
        <DArrowRight v-if="isExpand" />
        <DArrowLeft v-else />
      </el-icon>
    </div>
    <el-tabs tab-position="left" class="left-tabs">
      <el-tab-pane
        v-for="(item, index) in iconArray"
        :key="index"
        :label="item.labelName"
      >
        <keep-alive>
          <component :is="item.componentName" @mounted="onMouted"></component>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import elBase from "../../rawComponents/elBase/index.vue";
import htmlRow from "../../rawComponents/html/index.vue";
import elForm from "../../rawComponents/elForm/index.vue";
import customRow from "../../rawComponents/custom/index.vue";

export default {
  components: {
    elBase,
    htmlRow,
    elForm,
    customRow,
  },
  computed: {},
  data() {
    return {
      isExpand: true,
      iconArray: [
        {
          labelName: "html组件",
          className: "demonstration-raw",
          selectIndex: 0,
          componentName: "htmlRow",
          titleArray: [],
        },
        {
          labelName: "el基础组件",
          className: "demonstration-element-base",
          selectIndex: 1,
          componentName: "elBase",
          titleArray: [],
        },
        {
          labelName: "el表单组件",
          className: "demonstration-element-form",
          selectIndex: 2,
          componentName: "elForm",
          titleArray: [],
        },
        {
          labelName: "自定义组件",
          className: "demonstration-custom",
          selectIndex: 3,
          componentName: "customRow",
          titleArray: [],
        },
      ],
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

      // if (titles.length > 1) {
      //   for (let i = 0; i < titles.length; i++) {
      //     const element = titles[i];
      //     const arr = element.textContent.split(" ");
      //     mountedObject.titleArray.push({
      //       titleChinese: arr.length === 2 ? arr[1] : arr[0],
      //       titleEnglish: arr.length === 1 ? null : arr[0],
      //       element: element,
      //     });
      //   }
      // } else if (titles.length === 1) {
      //   mountedObject.onlyTitle = {
      //     element: titles[0],
      //   };
      // }
    },
    clickDarrow() {
      let dom = document.getElementsByClassName("row-container")[0];
      let width = this.isExpand ? "120" : "330";
      dom.animate({ width: `${width}px` }, 500, "linear");
      setTimeout(() => {
        dom.style.width = `${width}px`;
        this.isExpand = !this.isExpand;
      }, 470);
    },
  },
};
</script>

<style lang="scss" scoped>
.row-container {
  width: 330px;
  display: flex;
  height: 100%;
  padding-right: 20px;
  position: relative;
  .left-tabs {
    position: relative;
  }
  .icon-box {
    height: 50px;
    position: absolute;
    left: 50px;
    bottom: 0;
    cursor: pointer;
    z-index: 999;
  }
}
</style>
