<template>
  <div class="vcc-box">
    <div class="vcc-main">
      <nav class="base-component-container">
        <raw-components></raw-components>
      </nav>

      <div class="vcc-main-container">
        <!--顶部工具栏-->

        <!-- 内容区域 -->
        <div class="preview-container">
          <div id="render-control-panel">
            <!--这里不能放任何东西，执行时会被清空-->
          </div>
        </div>

        <!-- 操作区域 -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import rawComponents from "../components/vcc/rawComponents.vue";
import { splitInit } from "../libs/split-init";
// 这个文件不可以进行懒加载，它会导致运行时不可点击的行为，具体原因未知
// @ts-ignore
import { MainPanelProvider } from "../libs/main-panel";
import { initContainerForLine } from "../utils/vcc/lineHelper";
import { getCssVariableValue } from "../utils";
// 快捷键
// @ts-ignore
const keymaster = require("keymaster");

export default defineComponent({
  name: "VCC-V2",
  props: {
    initCodeEntity: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    rawComponents,
  },
  setup(props) {
    const mainPanelProvider = new MainPanelProvider();

    /**
     * 初始化
     */
    const currentPointer = (ele: any, index: any) => {
      mainPanelProvider.setDropInfo({
        target: ele,
        index,
      });
    };

    // 默认模版
    const getFakeData = () => {
      return {
        template: {
          lc_id: "root",
          __children: [
            {
              div: {
                class: "container",
                lc_id: "container",
                style: "min-height: 100%; padding-bottom: 100px;",
              },
            },
          ],
        },
      };
    };

    const init = () => {
      mainPanelProvider
        .onRootElementMounted((rootElement: any) => {
          document
            .getElementsByTagName("body")[0]
            .addEventListener("click", () => {
              mainPanelProvider.clearElementSelect();
            });

          // 只针对根div做事件监听
          initContainerForLine(rootElement.firstChild, currentPointer);
          // @ts-ignore
          document.querySelector(".x").style = "display:none;";
        })
        .onMerged(() => {
          currentPointer(null, null);
        })
        .render(
          props.initCodeEntity.codeStructure
            ? props.initCodeEntity.codeStructure
            : getFakeData()
        );
    };

    const undo = () => {
      mainPanelProvider.undo();
    };

    const initShortcut = () => {
      keymaster("⌘+z, ctrl+z", () => {
        undo();
        return false;
      });
    };

    onMounted(() => {
      
      // @ts-ignore
      Promise.all([import("../map/load")]).then((res) => {
        init();
      });
      splitInit();
      initShortcut();
    });

    return {};
  },
});
</script>

<style lang="scss" scoped>
.vcc-box {
  display: flex;
  height: calc(100vh - 80px);
}
.vcc-main {
  width: 100%;
  height: auto;
  overflow: hidden;
  display: flex;
  .base-component-container {
    border-radius: 0px;
  }
}
.vcc-main-container {
  margin: 0px 0px 0 0;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.preview-container {
  height: 0;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  background-color: #f0f0f0;
}
#render-control-panel {
  position: relative;

  [div-lc-mark] {
    border: 1px grey dashed;
    min-height: 1rem;
    border-radius: 5px;
  }

  [lc_id] {
  }

  &::after {
    content: "编辑区域";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: 600;
    font-size: 40px;
    color: #d6d6d6;
    pointer-events: none;
  }
}

#render-control-panel {
  height: 100%;
  width: 100%;
  border-radius: 0px;
  overflow: auto;
  box-sizing: border-box;
  background-color: var(--search-bg-color);
  transition: width 1s;
  padding: 10px;
}
</style>
