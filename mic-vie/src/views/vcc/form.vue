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
import { mCss } from "../../utils/css";
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
    const css1 = `
.my-class {
    width: auto; height: auto; color: inherit; background-color: #7E1313; 
}
.a {
    width: auto;
}
`;

    // 样式字符串2
    const css2 = `
.my-class {
    width: auto; height: auto; color: inherit; background-color: #C58383; 
}
.b {
    width: auto;
    height: auto;
}
`;
    mCss(css1, css2).then((res) => {
      // console.log(res);
      const extractedClass = res
        .match(/\.my-class {([\s\S]*?)}/)[1]
        .replace(/\s+/g, " ");
      console.log(extractedClass);
    });
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
