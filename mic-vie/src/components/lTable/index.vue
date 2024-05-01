<template>
  <div class="content-body">
    <el-table :data="data" style="width: 100%"> </el-table>
    <div class="page-scroll mt20" v-if="isShowPagination">
      <el-pagination background layout="prev, pager, next" :total="total" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 表格数据源
    data: {
      type: Array,
      default: () => [],
    },
    // 表头数据
    columns: {
      type: Array,
      default: () => [],
    },
    isShowPagination: {
        type: Boolean,
        default: true
    },
    total: {
      type: Number,
      default: 0,
    },
  },
};
</script>
