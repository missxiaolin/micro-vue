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
          <div class="icon-left" @click="removeItem(index)">
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
      <el-popover placement="left-start" trigger="hover">
        <template #reference>
          <el-button>添加表单</el-button>
        </template>
        <template #default>
          <div class="form-select-btn" @click="formSelectBtn">
            <el-button
              v-for="(item, index) in formArr"
              :key="index"
              @click="selectBtn(index)"
              >{{ item.name }}</el-button
            >
          </div>
        </template>
      </el-popover>
    </div>
    <!-- 表单添加 -->
    <el-dialog v-model="isShowFormAPop" :title="`添加表单${popObj.name}`">
      <el-form
        ref="ruleFormARef"
        :model="popObj"
        :rules="rules"
        label-width="auto"
        status-icon
      >
        <el-form-item label="名称" prop="label">
          <el-input v-model="popObj.label" />
        </el-form-item>
        <el-form-item label="绑定数据字段" prop="valueName">
          <el-input v-model="popObj.valueName" />
        </el-form-item>
        <el-form-item label="默认值" prop="value">
          <el-input v-model="popObj.value" />
        </el-form-item>
        <el-form-item label="是否必填" prop="popObj.rule.isRequire">
          <el-radio-group v-model="popObj.rule.isRequire" @change="radioChage">
            <el-radio :label="false">不必填</el-radio>
            <el-radio :label="true">必填</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="popObj.rule.isRequire"
          label="必填提示"
          prop="rule.errorMessage"
        >
          <el-input v-model="popObj.rule.errorMessage" />
        </el-form-item>
        <template v-if="Object.keys(popObj.propsData).length > 0">
          <template v-for="(item, index) in popObj.propsDataSelects">
            <el-form-item
              v-if="Object.keys(popObj.propsData).indexOf(`${item.key}`) > -1"
              :key="index"
              :label="item.name"
            >
              <div class="flex">
                <el-input v-model="popObj.propsData[item.key]" />
                <div class="icon-right" @click="deleteProps(item.key)">
                  <el-icon><RemoveFilled /></el-icon>
                </div>
              </div>
            </el-form-item>
          </template>
        </template>
        <el-form-item>
          <el-popover placement="right-start" trigger="hover">
            <template #reference>
              <el-button type="primary" circle>
                <el-icon><Plus /></el-icon>
              </el-button>
            </template>
            <template #default>
              <div class="form-props-btn" @click="formSelectBtn">
                <template
                  v-if="
                    Object.keys(popObj.propsData).length ==
                    popObj.propsDataSelects.length
                  "
                >
                  <div>无属性</div>
                </template>
                <template
                  v-else
                  v-for="(item, index) in popObj.propsDataSelects"
                >
                  <el-button
                    v-if="
                      Object.keys(popObj.propsData).indexOf(`${item.key}`) == -1
                    "
                    :key="index"
                    @click="propsClick(item)"
                    >{{ item.name }}</el-button
                  >
                </template>
              </div>
            </template>
          </el-popover>
        </el-form-item>
        <el-form-item>
          <div class="form-bottom">
            <el-button type="primary" @click="submitForm('ruleFormARef')"
              >保存</el-button
            >
            <el-button @click="isShowFormAPop = false">取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
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
      popObj: {},
      rules: {
        label: [{ required: true, message: "请输入名称", trigger: "blur" }],
        valueName: [
          { required: true, message: "请输入绑定数据字段", trigger: "blur" },
        ],
      },
      isShowFormAPop: false,
      jsCode: "",
      formItem: [],
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
          this.formItemKey = item.value;
        }
      });
    },
    // 为了右侧属性框不消失阻止冒泡
    formSelectBtn(event) {
      event.stopPropagation();
    },
    selectBtn(index) {
      let popObj = JSON.parse(JSON.stringify(formArr[index]));
      this.popObj = popObj;
      this.isShowFormAPop = true;
    },
    propsClick(item) {
      this.popObj.propsData[item.key] = item.value || "";
    },
    radioChage(v) {
      if (v) {
        this.rules.rule = {
          errorMessage: [
            { required: true, message: "请输入提示", trigger: "blur" },
          ],
        };
      } else {
        delete this.rules.rule;
      }
    },
    deleteProps(key) {
      delete this.popObj.propsData[key];
    },
    async submitForm(formEl) {
      const el = this.$refs[formEl];
      if (!el) return;
      await el.validate((valid, fields) => {
        if (valid) {
          let obj = {
            label: this.popObj.label,
            valueName: this.popObj.valueName,
            value: this.popObj.value,
            type: this.popObj.type,
            rule: [],
            propsData: this.popObj.propsData,
          };
          if (this.popObj.rule.isRequire == true) {
            obj.rule.push({
              required: true,
              message: this.popObj.rule.errorMessage,
            });
          }
          this.formItem.push(obj);
          this.viewSaveJs();
          this.isShowFormAPop = false;
        } else {
          //   console.log("error submit!", fields);
        }
      });
    },
    removeItem(index) {
      let array = this.formItem;
      let indexToRemove = index;
      array = array.slice(0, indexToRemove).concat(array.slice(indexToRemove + 1));
      this.formItem = array;
      this.viewSaveJs()
    },
    viewSaveJs() {
      const data = {
        [this.formItemKey]: JSON.parse(JSON.stringify(this.formItem)),
      };
      this.vccApp.viewSaveJs(data, "");
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
        width: 70px;
        margin-right: 10px;
        line-height: 30px;
        text-align: right;
      }
      .icon-left {
        margin-top: 7px;
        margin-right: 4px;
      }
      .value {
        height: 40px;
        flex: 1;
        position: relative;
        overflow: hidden;
        > div {
          position: absolute;
          left: 0;
          top: 0;
        }
      }
      .icon-right {
        margin-top: 7px;
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
.form-bottom {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
}
.form-props-btn {
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
.flex {
  flex: 1;
  .icon-right {
    margin-left: 20px;
    margin-right: 20px;
  }
  :deep(.el-input) {
    flex: 1;
  }
}
</style>
