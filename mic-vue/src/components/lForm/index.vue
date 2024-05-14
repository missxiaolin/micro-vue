<template>
  <div class="form-container">
    <el-form
      :ref="ref"
      :model="ruleForm"
      :rules="rules"
      :label-width="labelWidth"
      :disabled="disabled"
    >
      <el-row>
        <el-col :span="span" v-for="(item, index) in form" :key="index">
          <el-form-item :label="item.label" :prop="`${item.valueName}`">
            <VNode
              :parentThis="this"
              :content="item"
              v-model="ruleForm[item.valueName]"
              @updateOptions="updateOptions(item, index)"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item v-if="isShowBottomBtn">
        <div class="form-bottom-box">
          <el-button type="primary" @click="submitForm">
            {{ formSaveBtn }}
          </el-button>
          <el-button @click="resetForm">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import VNode from "./vnodeComponent";
import { uuid } from "../../utils/utils";

export default {
  components: {
    VNode,
  },
  props: {
    span: {
      type: Number,
      default: 8,
    },
    form: {
      type: Object,
      default: () => {
        return {};
      },
    },
    isShowBottomBtn: {
      type: Boolean,
      default: true,
    },
    formSaveBtn: {
      type: String,
      default: "保存",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    labelWidth: {
      type: String,
      default: "auto",
    },
  },
  data() {
    return {
      ref: uuid(16, 16),
      ruleForm: {},
      rules: {},
    };
  },
  mounted() {
    this.init(this.form);
  },
  watch: {
    form(v) {
      this.init(v);
    },
  },
  methods: {
    init(form) {
      if (!form || form.length == 0) {
        return
      }
      let ruleForm = this.ruleForm || {};
      let rulesArr = this.rules || {};
      form.forEach((item) => {
        ruleForm[item.valueName] = item.value;
        rulesArr[item.valueName] = item.rule;
      });
      this.ruleForm = ruleForm;
      this.rules = rulesArr;
    },
    resetForm() {
      const el = this.$refs[this.ref];
      if (!el) return;
      el.resetFields();
    },
    async submitForm() {
      const el = this.$refs[this.ref];
      if (!el) return;
      await el.validate((valid, fields) => {
        if (valid) {
          console.log(this.ruleForm);
          // this.$emit("success", this.ruleForm);
        } else {
          //   console.log("error submit!", fields);
        }
      });
    },
    updateOptions(item, index) {
      const { propsData = {}, options = [] } = item;
      const { customValue = "value", customLabel = "label" } = propsData;
      const targetItem = originalData[index];
      // 改变options后，判断是否能匹配到value,否则重置value
      const targetOptions = options.find(
        (ele) => ele[customValue] === item.value
      );
      if (!targetOptions) {
        item.value = targetItem.value;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form-container {
  :deep(.el-select) {
    flex: 1;
  }
  :deep(.el-col) {
    padding-right: 20px;
  }
  .form-bottom-box {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
}
</style>
