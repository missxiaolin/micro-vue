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
      <el-button type="primary" @click="goRoute">创建项目</el-button>
    </div>
    <l-table :data="tableData"></l-table>
    <!-- <div class="content-body">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="date" label="Date" width="150" />
        <el-table-column prop="name" label="Name" width="120" />
        <el-table-column prop="name" label="Name" width="120" />
        <el-table-column prop="name" label="Name" width="120" />
        <el-table-column prop="name" label="Name" width="120" />
        <el-table-column prop="state" label="State" width="120" />
        <el-table-column prop="city" label="City" width="120" />
        <el-table-column prop="address" label="Address" width="600" />
        <el-table-column prop="zip" label="Zip" width="120" />
        <el-table-column fixed="right" label="操作" width="120">
          <template #default>
            <el-button link type="primary" size="small">详情</el-button>
            <el-button link type="primary" size="small">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-scroll mt20">
        <el-pagination background layout="prev, pager, next" :total="1000" />
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        name: "",
        type: "",
        status: "",
      },
      statusOptions: [
        {
          value: "0",
          label: "禁用",
        },
        {
          value: "1",
          label: "启用",
        },
        {
          value: "2",
          label: "发布中",
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
      tableData: [],
    };
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
