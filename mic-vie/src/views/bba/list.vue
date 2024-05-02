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
        :title="'创建项目'"
        :dialog-visible="dialogVisible"
        :btn-pop-form="btnPopForm"
        @popClick="popClick"
        @success="popSuccess"
      ></l-pop>
    </div>
    <l-table :data="tableData" :columns="columns">
      <template #options="scope">
        <el-button link type="primary" size="small">详情</el-button>
        <el-button link type="primary" size="small">修改</el-button>
      </template>
    </l-table>
  </div>
</template>

<script>
import { projectSave } from "../../api/project";
import { ElMessage } from "element-plus";

export default {
  data() {
    return {
      dialogVisible: false,
      searchForm: {
        name: "",
        type: "",
        status: "",
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
          label: "操作",
          prop: "options",
          noEmptyValue: true,
        },
      ],
      tableData: [],
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
  methods: {
    popClick(e) {
      this.dialogVisible = e;
    },
    async popSuccess(e) {
      let res = await projectSave(e);
      if (!res.success) {
        ElMessage({
          message: res.errorMessage,
          type: "error",
        });
        return;
      }
      ElMessage({
        message: '添加成功',
        type: "success",
      });
      this.dialogVisible = false;
      
     
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
