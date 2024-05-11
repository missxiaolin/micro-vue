<template>
  <div class="attribute-seeting-box">
    <el-divider content-position="left">自定义表单</el-divider>
    <div class="attribute-seeting-content">
      <!-- <div class="label">
            提交按钮：
        </div> -->
      <!-- <div class="attribute-seeting-content-item">
            <div class="label">
                提交按钮：
            </div>
            <div class="attribute-seeting-content-item-content">
                <el-input placeholder="请输入内容"></el-input>
            </div>
        </div> -->
      <div class="l-form-b" v-if="formItem.length > 0">
        <div v-for="(item, index) in formItem" :key="index" class="l-form-b-li">
          <div class="icon-left">
            <el-icon><RemoveFilled /></el-icon>
          </div>
          <div class="label">{{ item.label }}</div>
          <div class="value">
            <VNode :content="item" />
          </div>
          <div class="icon-right">
            <el-icon><Edit /></el-icon>
          </div>
        </div>
      </div>
      <el-popover placement="left-start" trigger="click">
        <template #reference>
          <el-button>添加表单</el-button>
        </template>
        <template #default>
          <div class="form-select-btn" @click="formSelectBtn">
            <el-button v-for="(item, index) in formArr" :key="index">{{
              item.name
            }}</el-button>
          </div>
        </template>
      </el-popover>
    </div>
  </div>
</template>

<script>
import VNode from "../../lForm/vnodeComponent";
import { formArr } from "./utils/index";
export default {
  components: {
    VNode,
  },
  props: ["localAttributes"],
  inject: ["vccApp"],
  data() {
    return {
      formArr,
      jsCode: "",
      formItem: [],
      formEunm: {
        input: "输入框",
      },
    };
  },
  mounted() {
    this.jsCode = this.vccApp.mainPanelProvider.getComponentOptions();
    this.init(this.localAttributes);
  },
  methods: {
    init(localAttributes) {
      localAttributes.forEach((item) => {
        if (item.key == ":form") {
          this.formItem = this.jsCode.data()[item.value] || [];
          console.log(this.formItem);
        }
      });
    },
    // 为了右侧属性框不消失阻止冒泡
    formSelectBtn(event) {
      event.stopPropagation();
    },
  },
};
</script>

<style lang="scss">
.attribute-seeting-box {
  display: flex;
  flex-direction: column;
  .l-form-b {
    display: flex;
    flex-direction: column;
    color: var(--el-text-color-primary);
    .l-form-b-li {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      margin-bottom: 5px;
      .label {
        margin-right: 10px;
        line-height: 30px;
      }
      .icon-left {
        margin-top: 6px;
        margin-right: 4px;
      }
      .icon-right {
        margin-top: 6px;
        margin-left: 4px;
      }
    }
  }
}
.form-select-btn {
  display: flex;
  flex-direction: column;
  .el-button {
    margin-bottom: 5px;
    width: 130px;
    margin-left: 0px;
  }
  :deep(.el-button) {
    margin-bottom: 5px;
  }
}
</style>
