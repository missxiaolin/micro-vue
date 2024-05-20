<template>
  <div>
    <l-table
      :data="tableData"
      :columns="columns"
      :page-size="pageSize"
      :total="total"
      @handleCurrentChange="handleCurrentChange"
      lc_id="l/pSi+VFnx"
    ></l-table>
    <!-- <l-s-form :form="formItem" :span="8"></l-s-form> -->
    <!-- <editor :height="'500px'" /> -->
    <!-- <el-input>
      <template #prepend>Http://</template>
    </el-input> -->
  </div>
</template>

<script>
import editor from "../../components/editor/index.vue";
export default {
  components: {
    editor,
  },
  data() {
    return {
      tableData: [],
      columns: [],
      pageSize: 1,
      total: 0,
    };
  },
  mounted() {
    // this.formItem[1].value = "1";
    // this.formItem[1].propsData.disabled = true;
    // console.log(this.formItem[1])
  },
  methods: {
    handleCurrentChange(e) {
      console.log(e);
    },
  },
};
</script>
