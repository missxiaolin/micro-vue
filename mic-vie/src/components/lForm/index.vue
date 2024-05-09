<template>
  <div class="form-container">
    <el-form ref="ruleFormRef">
        <el-row>
          <el-col :span="span" v-for="(item, index) in form" :key="index">
            <el-form-item :label="item.label" :prop="`${item.valueName}`">
                <VNode :content="item" v-model="item.value" />
            </el-form-item>
            
          </el-col>
        </el-row>
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
  },
};
</script>

<style lang="scss" scoped>
.form-container {
    :deep(.el-select) {
      flex: 1;
    }
}
</style>
