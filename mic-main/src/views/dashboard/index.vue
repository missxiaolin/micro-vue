<template>
  <div class="dashboard-main">
    <div class="mu-search-container pall10">
      <el-row>
        <el-col :span="8">
          <div>1</div>
        </el-col>
        <el-col :span="8">
          <div>1</div>
        </el-col>
        <el-col :span="8">
          <div>1</div>
        </el-col>
        <el-col :span="8">
          <div>1</div>
        </el-col>
        <el-col :span="8">
          <div>1</div>
        </el-col>
        <el-col :span="8">
          <div>1</div>
        </el-col>
        <el-col :span="8">
          <div>1</div>
        </el-col>
        <el-col :span="8">
          <div>1</div>
        </el-col>
        <el-col :span="8">
          <div>1</div>
        </el-col>
      </el-row>
      <div class="mu-search-form-button">
        <el-button>重置</el-button>
        <el-button type="primary">查询</el-button>
      </div>
    </div>
    <div class="content-body mt20">
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
        <el-table-column fixed="right" label="Operations" width="120">
          <template #default>
            <el-button link type="primary" size="small">详情</el-button>
            <el-button link type="primary" size="small">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-scroll mt20">
        <el-pagination background layout="prev, pager, next" :total="1000" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const tableData = ref([
      {
        date: "2016-05-03",
        name: "Tom",
        state: "California",
        city: "Los Angeles",
        address: "No. 189, Grove St, Los Angeles",
        zip: "CA 90036",
        tag: "Home",
      },
      {
        date: "2016-05-02",
        name: "Tom",
        state: "California",
        city: "Los Angeles",
        address: "No. 189, Grove St, Los Angeles",
        zip: "CA 90036",
        tag: "Office",
      },
      {
        date: "2016-05-04",
        name: "Tom",
        state: "California",
        city: "Los Angeles",
        address: "No. 189, Grove St, Los Angeles",
        zip: "CA 90036",
        tag: "Home",
      },
      {
        date: "2016-05-01",
        name: "Tom",
        state: "California",
        city: "Los Angeles",
        address: "No. 189, Grove St, Los Angeles",
        zip: "CA 90036",
        tag: "Office",
      },
    ]);

    return {
      tableData,
    };
  },
});
</script>

<style lang="scss" scoped>
.dashboard-main {
  width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
}
</style>
