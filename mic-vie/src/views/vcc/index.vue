<template>
  <div class="vcc-index-box">
    <div class="mu-search-container pall10">
      <el-row>
        <el-col :span="8">
          <search-label :labelName="'路由名称'">
            <el-input v-model="searchForm.route_name" placeholder="请输入路由名称" />
          </search-label>
        </el-col>
        <el-col :span="8">
          <search-label :labelName="'路由路径'">
            <el-input v-model="searchForm.path" placeholder="请输入路由路径" />
          </search-label>
        </el-col>
        <el-col :span="8"></el-col>
      </el-row>
      <div class="mu-search-form-button">
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="getPage">查询</el-button>
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
        <el-button link type="primary" size="small" @click="generatePage(scope.row)"
          >生成页面</el-button
        >
      </template>
    </l-table>
  </div>
</template>

<script>
import { pageRouteList, apiAeneratePage } from '../../api/page'

export default {
  data() {
    return {
      isClickPage: false,
      projectId: 0,
      searchForm: {
        projectId: 0,
        route_name: "",
        path: "",
        pageSize: 10,
        page: 1,
      },
      tableData: [],
      columns: [
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
          label: "状态",
          prop: "status_desc",
        },
        {
          width: "150px",
          label: "操作",
          prop: "options",
          noEmptyValue: true,
        },
      ],
      total: 0,
    };
  },
  mounted() {
    this.projectId = this.$route.query.projectId || 0
    this.getPage()
  },
  methods: {
    async getPage() {
      let param = this.searchForm
      param.projectId = this.projectId
      let res = await pageRouteList(param)
      if (!res.success) {
        return
      }
      this.tableData = res.model.list
      this.total = res.model.count
    },
    // 创建
    goRoute() {
      this.$router.push({
        path: "/vcc/detail",
        query: {
          projectId: this.projectId,
        },
      });
    },
    // 修改
    edit(item) {
      this.$router.push({
        path: "/vcc/detail",
        query: {
          id: item.id,
          projectId: this.projectId,
        },
      });
    },
    handleCurrentChange(e) {
      this.searchForm.page = e;
      this.getPage();
    },
    resetForm() {
      this.searchForm = {
        route_name: "",
        path: "",
        pageSize: 10,
        page: 1,
      }
    },
    async generatePage(item) {
      if (this.isClickPage) {
        return
      }
      this.isClickPage = true;
      let res
      try {
        res = await apiAeneratePage({
          projectId: this.projectId,
          id: item.id,
        })
      } catch (e) {
        this.isClickPage = false;
      }
      this.isClickPage = false;
      if (!res.success) {
        return
      }
      this.getPage()
      this.$message({
        message: '页面生成中',
        type: 'success',
      })
    }
  },
};
</script>
