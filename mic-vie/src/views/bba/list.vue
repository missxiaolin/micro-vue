<template>
  <div class="vue-home-main">
    <div class="mu-search-container pall10">
      <el-row>
        <el-col :span="8">
          <search-label :labelName="'项目名称'">
            <el-input v-model="searchForm.name" placeholder="请输入项目名称" />
          </search-label>
        </el-col>
        <el-col :span="8">
          <search-label :labelName="'分类'">
            <el-select v-model="searchForm.type" placeholder="请选择分类">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </search-label>
        </el-col>
        <el-col :span="8">
          <search-label :labelName="'状态'">
            <el-select v-model="searchForm.status" placeholder="请选择分类">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </search-label>
        </el-col>
      </el-row>
      <div class="mu-search-form-button">
        <el-button>重置</el-button>
        <el-button type="primary">查询</el-button>
      </div>
    </div>
    <div class="mu-handle-content">
      <l-pop
        :btn-text="'创建项目'"
        :detail="projectDetail"
        :title="popTitle"
        :disabled="formDisbled"
        :form-save-btn="formSaveBtn"
        :dialog-visible="dialogVisible"
        :btn-pop-form="btnPopForm"
        :is-show-bottom-btn="popShowBottomBtn"
        @popClick="popClick"
        @success="popSuccess"
      ></l-pop>
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
        <el-button link type="primary" size="small" @click="detail(scope.row)">详情</el-button>
      </template>
    </l-table>
  </div>
</template>

<script>
import { projectSave, projectList } from "../../api/project";
import { ElMessage } from "element-plus";

export default {
  data() {
    return {
      dialogVisible: false,
      popTitle: "创建项目",
      formSaveBtn: "保存",
      formDisbled: false,
      popShowBottomBtn: true,
      searchForm: {
        name: "",
        type: "",
        status: "",
        pageSize: 10,
        page: 1,
      },
      statusOptions: [
        {
          value: "1",
          label: "禁用",
        },
        {
          value: "2",
          label: "启用",
        },
        {
          value: "3",
          label: "生成中",
        },
      ],
      typeOptions: [
        {
          value: "1",
          label: "电脑端",
        },
        {
          value: "2",
          label: "移动端",
        },
      ],
      columns: [
        {
          label: "项目名称",
          prop: "name",
        },
        {
          label: "项目描述",
          prop: "desc",
        },
        {
          label: "项目类型",
          prop: "type_desc",
        },
        {
          label: "项目状态",
          prop: "status_desc",
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
      tableData: [],
      total: 0,
      btnPopForm: [
        {
          key: "type",
          default: 1,
          type: "radio",
          label: "项目类型",
          dataOptions: [
            {
              label: "pc",
              value: 1,
            },
            {
              label: "mobile",
              value: 2,
            },
          ],
          placeholder: "请选择项目类型",
          value: "",
          rules: [
            {
              required: true,
              message: "请选择项目类型",
            },
          ],
        },
        {
          key: "name",
          default: "",
          type: "input",
          label: "项目名称",
          data: "",
          placeholder: "请输入项目名称",
          value: "",
          rules: [
            {
              required: true,
              message: "请输入项目名称",
              trigger: "blur",
            },
          ],
        },
        {
          key: "desc",
          default: "",
          type: "input",
          label: "项目描述",
          data: "",
          placeholder: "请输入项目描述",
          value: "",
          rules: [
            {
              required: true,
              message: "请输入项目描述",
              trigger: "blur",
            },
          ],
        },
        {
          key: "status",
          default: 1,
          type: "radio",
          label: "是否禁用",
          dataOptions: [
            {
              label: "禁用",
              value: 1,
            },
            {
              label: "开启",
              value: 2,
            },
          ],
          value: "",
          rules: [
            {
              required: true,
              message: "请选择是否禁用",
            },
          ],
        },
      ],
      projectDetail: {},
    };
  },
  mounted() {
    this.getProjectList();
  },
  methods: {
    handleCurrentChange(e) {
      this.searchForm.page = e;
      this.getProjectList();
    },
    async getProjectList() {
      let res = await projectList(this.searchForm);
      if (!res.success) {
        ElMessage({
          message: res.errorMessage,
          type: "error",
        });
        return;
      }
      this.tableData = res.model.list;
      this.total = res.model.count;
    },
    popClick(e) {
      this.dialogVisible = e;
      this.projectDetail = {};
      this.popTitle = "创建项目";
      this.formSaveBtn = "保存";
      this.formDisbled = false;
    },

    edit(e) {
      this.projectDetail = e;
      this.dialogVisible = true;
      this.popTitle = "修改项目";
      this.formSaveBtn = "修改";
      this.popShowBottomBtn = true
    },

    detail(e) {
      this.projectDetail = e;
      this.dialogVisible = true;
      this.popTitle = "项目详情";
      this.formDisbled = true;
      this.formSaveBtn = "修改";
      this.popShowBottomBtn = false
    },

    async popSuccess(e) {
      if (this.projectDetail) {
        e.id =
          this.projectDetail && this.projectDetail.id
            ? this.projectDetail.id
            : "";
      }
      let res = await projectSave(e);
      if (!res.success) { 
        ElMessage({
          message: res.errorMessage,
          type: "error",
        });
        return;
      }
      ElMessage({
        message: "添加成功",
        type: "success",
      });
      this.projectDetail = {};
      this.popTitle = "创建项目";
      this.formSaveBtn = "保存";
      this.dialogVisible = false;
      this.getProjectList();
    },
  },
};
</script>

<style lang="scss" scoped>
.vue-home-main {
  width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
}
</style>
