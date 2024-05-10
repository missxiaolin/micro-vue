<template>
  <div class="form-container">
    <el-form ref="ruleFormRef">
      <el-row>
        <el-col :span="span" v-for="(item, index) in form" :key="index">
          <el-form-item :label="item.label" :prop="`${item.valueName}`">
            <VNode
              :content="item"
              v-model="item.value"
              @updateOptions="updateOptions(item, index)"
            />
          </el-form-item>
          
        </el-col>
      </el-row>
      <el-form-item v-if="isShowBottomBtn">
        <div class="form-bottom-box">
          <el-button type="primary" @click="submitForm('ruleFormRef')">
            {{ formSaveBtn }}
          </el-button>
          <el-button @click="resetForm('ruleFormRef')">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import VNode from "./vnodeComponent";
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
    }
  },
  mounted() {},
  methods: {
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
      // 重置组件
      item.id += "1";
    },
  },
};
</script>

<style lang="scss" scoped>
.form-container {
  :deep(.el-select) {
    flex: 1;
  }
  .form-bottom-box {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
}
</style>
