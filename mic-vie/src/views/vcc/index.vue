<template>
  <div class="vcc-index-box">
    <div class="mu-search-container pall10">
      <div class="mu-search-form-button">
        <el-button>重置</el-button>
        <el-button type="primary" @click="getRouteList">查询</el-button>
      </div>
    </div>
    <div class="mu-handle-content">
      <el-button type="primary" @click="goRoute">创建页面</el-button>
    </div>
    <l-table
      :data="tableData"
      :columns="columns"
      :page-size="searchForm.pageSize"
      :total="total"
      @handleCurrentChange="handleCurrentChange"
    >
      <template #options="scope">
        <el-button link type="primary" size="small" @click="edit(scope.row)"
          >修改</el-button
        >
      </template>
    </l-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {},
      tableData: [],
      columns: [
        {
          label: "项目名称",
          prop: "project_name",
        },
        {
          label: "路由名称",
          prop: "route_name",
        },
        {
          label: "路由路径",
          prop: "path",
        },
        {
          label: "创建时间",
          prop: "create_time",
        },
        {
          label: "修改时间",
          prop: "update_time",
        },
        {
          width: "100px",
          label: "操作",
          prop: "options",
          noEmptyValue: true,
        },
      ],
      total: 0,
    };
  },
  methods: {
    // 创建
    goRoute() {
      this.$router.push({
        path: "/vie/vcc/detail",
      });
    },
    // 修改
    edit(item) {
      this.$router.push({
        path: "/vie/vcc/detail",
        query: {
          id: item.id,
        },
      });
    },
    handleCurrentChange(e) {
      this.searchForm.page = e;
      this.getRouteList();
    },
    getRouteList() {},
  },
};
</script>
