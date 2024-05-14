<template>
  <div class="vcc-box">
    <div class="main-main">
      <nav class="base-component-container">
        <raw-components></raw-components>
      </nav>
      <div class="vcc-main-container">
        <!--顶部工具栏-->
        <tools-bar
          @onPreviewModeChange="onPreviewModeChange"
          @onEditModeChange="onEditModeChange"
          @redo="redo"
          @undo="undo"
          @structureVisible="structureVisible = true"
        ></tools-bar>
        <!-- 内容区域 -->
        <div class="preview-container">
          <div id="render-control-panel">
            <!--这里不能放任何东西，执行时会被清空-->
          </div>
        </div>
      </div>
      <!-- 属性设置 -->
      <attribute-input
        v-show="isShowAttribute"
        :JSCode="JSCode"
        :enableRemoveButton="true"
        class="attribute"
        @save="onSaveAttr"
        @remove="onRemove"
        ref="attributeInput"
        shortcutInitMode="hand"
        :__rawVueInfo__="currentEditRawInfo"
      >
      </attribute-input>
    </div>

    <div class="copy">
      <el-tooltip effect="dark" content="二次编辑" placement="top-start">
        <div
          class="round-icon icon-vue"
          alt=""
          @click="vueDialogVisible = true"
        >
          Vue
        </div>
      </el-tooltip>
      <el-tooltip effect="dark" content="编辑JS逻辑" placement="top-start">
        <div class="round-icon icon-js" alt="" @click="jsDialogVisible = true">
          JS
        </div>
      </el-tooltip>

      <el-tooltip effect="dark" content="查看实时代码" placement="top-start">
        <div
          class="round-icon icon-js"
          alt=""
          @click="codeDialogVisible = true"
          style="padding: 5px"
        >
          <svg-icon
            class="mt5"
            :icon-class="'working-outline'"
            :svgStyle="'width: 1.5em;height:1.5em;'"
          />
        </div>
      </el-tooltip>
      <el-popconfirm
        confirmButtonText="确认"
        cancelButtonText="点错了"
        iconColor="red"
        title="点我将清空所有编辑的内容, 确认吗?"
        @confirm="clear"
      >
        <template #reference>
          <div class="round-icon icon-js" style="padding-top: 12px">
            <el-icon size="14"><Delete /></el-icon>
          </div>
        </template>
      </el-popconfirm>
      <el-tooltip effect="dark" content="保存" placement="top-start">
        <div
          class="round-icon icon-js"
          alt=""
          @click="save"
          style="padding: 12px"
        >
          <el-icon><Document /></el-icon>
        </div>
      </el-tooltip>
    </div>

    <div>
      <lc-code :rawCode="code" v-model:codeDialogVisible="codeDialogVisible">
      </lc-code>
      <code-structure
        @save="onSaveAttr"
        @remove="onRemove"
        ref="codeStructure"
        v-model="structureVisible"
        @reRender="render"
        :initStructure="codeRawVueInfo"
      >
      </code-structure>
      <codeEditor
        v-model:codeDialogVisible="jsDialogVisible"
        @saveJSCode="saveJSCode"
        ref="codeEditor"
      ></codeEditor>
      <vueEditor
        v-model:vueDialogVisible="vueDialogVisible"
        @codeParseSucess="codeParseSucess"
      ></vueEditor>
    </div>
    <!-- 辅助定位线 -->
    <div class="cross-flag">
      <div class="x"></div>
    </div>

    <!-- 视图 -->
    <div id="fullScreen" v-if="!editMode">
      <div style="margin: 20px; font-weight: bold">按下ESC退出预览模式</div>
      <div id="mountedEle"></div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
// // 这个文件不可以进行懒加载，它会导致运行时不可点击的行为，具体原因未知
import { MainPanelProvider } from "../libs/main-panel";
import { initContainerForLine } from "@/utils/lineHelper";
import { replaceKeyInfo, getJsTemData } from "../utils/utils";
import keymaster from "keymaster";

export default {
  name: "vcc",
  props: {
    initCodeEntity: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  emits: ["updateCodeEntity", "onLoadFinish"],
  components: {
    rawComponents: defineAsyncComponent(() =>
      import("../components/vcc/rawComponents.vue")
    ),
    toolsBar: defineAsyncComponent(() => import("./toolsBar")),
    attributeInput: defineAsyncComponent(() =>
      import("../components/vcc/attributeInput")
    ),
    "lc-code": defineAsyncComponent(() => import("../components/vcc/code")),
    codeStructure: defineAsyncComponent(() =>
      import("../components/vcc/codeStructure")
    ),
    codeEditor: defineAsyncComponent(() =>
      import("../components/vcc/jSCodeEditorDialog.vue")
    ),
    vueEditor: defineAsyncComponent(() =>
      import("../components/vcc/vueCodeParseDialog.vue")
    ),
  },
  data() {
    return {
      currentEditRawInfo: null,
      code: "",
      codeDialogVisible: false,
      structureVisible: false,
      jsDialogVisible: false,
      vueDialogVisible: false,

      editMode: true,

      codeRawVueInfo: null,
      JSCode: "",

      isShowAttribute: false,
    };
  },
  watch: {
    currentEditRawInfo(newValue) {
      // const attributeContainter = document.querySelector(".attribute");
      if (newValue) {
        this.isShowAttribute = true;
        // this.$refs["attributeInput"].onShow();
      } else {
        this.isShowAttribute = false;
        // this.$refs["attributeInput"].onHide();
      }
    },
    initCodeEntity(newVal) {
      if (newVal.JSCode) {
        this.mainPanelProvider.saveJSCodeOnly(
          this.convertLogicCode(newVal.JSCode)
        );
      }

      if (newVal.codeStructure) {
        this.mainPanelProvider.render(newVal.codeStructure);
      }
    },
  },
  computed: {},
  beforeCreate() {},
  provide() {
    return {
      'vccApp': this
    }
  },
  created() {
    this.mainPanelProvider = new MainPanelProvider();
  },
  beforeMount() {},
  mounted() {
    Promise.all([import("../map/load")]).then((res) => {
      this.$emit("onLoadFinish");
      this.init();
    });
    // splitInit();
    this.initShortcut();
  },
  beforeUpdate() {},
  updated() {},
  destroyed() {},
  methods: {
    convertLogicCode(JSCode) {
      
      try {
        const JSCodeInfo = eval(
          `(function(){return ${JSCode.replace(/\s+/g, "")}})()`
        );
        // 保留JS代码
        this.JSCode = JSCode;
        const fn = () => {
          if (!this.$refs.codeEditor) {
            setTimeout(() => {
              fn()
            }, 20)
            return
          }
          this.$refs.codeEditor.updateLogicCode(JSCode);
        }

        fn()
        
        return JSCodeInfo;
      } catch (e) {
        console.warn(
          `外部逻辑代码解析出错，解析的逻辑代码为: ${JSCode}, Error: ${e}`
        );
      }
    },

    initShortcut() {
      keymaster("⌘+z, ctrl+z", () => {
        this.undo();
        return false;
      });

      keymaster("esc", () => {
        this.editMode = true;
        this.mainPanelProvider.setEditMode(true);
        return false;
      });
    },

    init() {
      // 先订阅事件再渲染
      this.mainPanelProvider
        .onRootElementMounted((rootElement) => {
          document
            .getElementsByTagName("body")[0]
            .addEventListener("click", () => {
              this.mainPanelProvider.clearElementSelect();
            });

          // 只针对根div做事件监听
          initContainerForLine(rootElement.firstChild, this.currentPointer);

          document.querySelector(".x").style = "display:none;";
        })
        .onMerged(() => {
          this.currentPointer(null);
        })
        .onCodeCreated((code) => {
          this.code = code;
        })
        .onCodeStructureUpdated((codeRawVueInfo) => {
          if (this.$refs.codeStructure) {
            this.$refs.codeStructure.updateCode(codeRawVueInfo);
          }
          this.codeRawVueInfo = codeRawVueInfo;

          this.notifyParent();
        })
        .onNodeDeleted(() => {
          this.currentEditRawInfo = null;
        })
        .onSelectElement((rawInfo) => {
          this.currentEditRawInfo = rawInfo;
        })
        .saveJSCodeOnly(
          this.convertLogicCode(
            this.initCodeEntity.JSCode ? this.initCodeEntity.JSCode : ""
          )
        )
        .render(
          this.initCodeEntity.codeStructure
            ? this.initCodeEntity.codeStructure
            : this.getFakeData()
        );
    },

    // 通知父组件
    notifyParent() {
      this.$emit("updateCodeEntity", {
        codeRawVueInfo: this.codeRawVueInfo,
        JSCode: this.JSCode,
      });
    },

    // 指向将要插入哪个元素之前
    currentPointer(ele, index) {
      this.mainPanelProvider.setDropInfo({
        target: ele,
        index,
      });
    },

    /**获取一个模拟的实体对象 */
    getFakeData() {
      return {
        template: {
          lc_id: "root",
          __children: [
            {
              div: {
                class: "container",
                lc_id: "container",
                style: "min-height: 100%;",
              },
            },
          ],
        },
      };
    },

    onPreviewModeChange(newValue) {
      const previewElem = document.querySelector("#render-control-panel");
      if (newValue) {
        previewElem.style = "width:375px;";
      } else {
        previewElem.style = "width:100%;";
      }
    },

    onEditModeChange(newValue) {
      this.editMode = newValue;

      this.$nextTick(() => {
        this.mainPanelProvider.setEditMode(
          newValue,
          document.querySelector("#mountedEle")
        );
      });
    },

    renderCode() {
      this.mainPanelProvider.reRender();
    },

    clear() {
      this.mainPanelProvider.render(this.getFakeData());
    },

    onSaveAttr({ resultList, lc_id }) {
      this.mainPanelProvider.saveAttribute(resultList, lc_id);
    },

    onRemove({ lc_id }) {
      this.mainPanelProvider.remove(lc_id);
    },

    redo() {
      this.mainPanelProvider.redo();
    },
    undo() {
      this.mainPanelProvider.undo();
    },

    // 保存js data fn
    viewSaveJs(d = {}, fn = []) {
      const temScript = getJsTemData(d, fn);
      
      let jsCode = this.JSCode.trim();
      const JSCodeInfo = eval(`(function(){return ${jsCode};})()`);
      const newJsCode = replaceKeyInfo(temScript, JSCodeInfo);
      this.saveJSCode({
        JSCodeInfo: eval(`(function(){return ${newJsCode};})()`),
        JSCode: newJsCode,
      });
      this.$refs.codeEditor.updateLogicCode(newJsCode);
    },

    saveJSCode({ JSCodeInfo: code, JSCode }) {
      this.mainPanelProvider.saveJSCode(code);
      // 保留JS代码
      this.JSCode = JSCode;
      this.notifyParent();
    },

    /**
     * 二级编辑解析
     */
    codeParseSucess(vueCodeEntity) {
      this.mainPanelProvider.render(vueCodeEntity);
    },

    /**
     * 渲染指定结构
     */
    render(codeEntity) {
      this.mainPanelProvider.render(codeEntity);
    },

    help() {
      // window.open("");
    },
    save() {
      this.$emit("save", this.code);
    },
  },
  fillter: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.vcc-box {
  width: 100%;
  display: flex;
  min-height: calc(100vh - 90px);
  height: auto;
  overflow: hidden;
}

.main-main {
  width: 100%;
  min-height: calc(100vh - 90px);
  display: flex;
  flex-direction: row;
  flex: 1;
  background-color: var(--search-bg-color);
  overflow: hidden;
}

.base-component-container {
  border-radius: 0px;
  background-color: var(--search-bg-color);
}

.vcc-main-container {
  width: 100%;
  flex: 1;
  margin: 0px 0px 0 0;
  display: flex;
  max-height: 100vh;
  flex-direction: column;
  margin: 0 10px;
}

.attribute {
  z-index: 2;
}

#render-control-panel {
  height: 100%;
  width: 100%;
  border-radius: 0px;
  overflow: auto;
  box-sizing: border-box;
  background-color: var(--search-bg-color);

  transition: width 1s;
  padding: 20px;
}

.preview-container {
  height: 0;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  background-color: var(--search-bg-color);
  background-image: radial-gradient(rgba(9, 89, 194, 0.3) 6%, transparent 0),
    radial-gradient(#faf9f8 6%, transparent 0);
  background-size: 10px 10px;
  border: 1px solid var(--el-border-color-light);
}

.copy {
  position: fixed;
  right: 20px;
  bottom: 30px;
  display: flex;
  line-height: 0;
}

.round-icon {
  background: #4dba87;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  padding: 10px 0;
  margin-left: 10px;
  border: 0px;
  box-sizing: border-box;
  cursor: pointer;
}

.icon-js {
  line-height: 20px;
  color: white;
  text-align: center;
}

.icon-vue {
  line-height: 20px;
  color: white;
  text-align: center;
}

.cross-flag {
  position: fixed;
  right: 0;
  top: 0;
  .x {
    width: 20px;
    height: 2px;
    position: fixed;
    background-color: #4dba87;
    border-radius: 1px;
    top: 0;
    display: none;
    right: 0;
    pointer-events: none;
  }
  .y {
    width: 2px;
    height: 20px;
    position: fixed;
    background-color: #4dba87;
    top: 0;
    border-radius: 1px;
    display: none;
    right: 0;
    pointer-events: none;
  }
}

#fullScreen {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 3;
  top: 0;
  background-color: var(--search-bg-color);
  border: 1px solid var(--el-border-color-light);
  overflow: auto;
  z-index: 444;
}

#mountedEle {
  width: 94%;
  border: 1px dashed rgb(126, 126, 128);
  border-radius: 10px;
  margin: 20px;
}
</style>

<!-- 以下的样式作用于渲染容器中-->
<style lang="scss">
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
    font-size: 20px;
    color: #d6d6d6;
    pointer-events: none;
  }
}

.mark-element-unit {
  opacity: 0.5;
  outline: red 2px solid;
}
</style>

<style lang="scss">
.icon-s {
  font-size: 14px;
  color: #000;
  margin: 0 2px;
}

:root {
  --animate-duration: 1.5s;
}

.in-element {
  outline: 2px solid #4dba87 !important;
  position: relative;
}

.mark-element {
  outline: 2px solid #4dba87 !important;
  position: relative;
}

.mark-element::before {
  content: attr(lc-component-name) !important;
  background: #4dba87;
  color: white;
  left: 0 !important;
  top: 0 !important;
  transform: translateY(-100%);
  position: absolute;
  font-size: 12px;
  line-height: 12px;
  padding: 1px 2px;
  border-radius: 2px;
}

.light-mark {
  outline: 2px solid #4dba87;
  position: relative;
}

.light-mark::before {
  content: attr(lc-component-name) !important;
  background: #4dba87;
  color: white;
  left: 0 !important;
  top: 0 !important;
  position: absolute;
  font-size: 12px;
  line-height: 12px;
  padding: 1px 2px;
  border-radius: 2px;
}
</style>
