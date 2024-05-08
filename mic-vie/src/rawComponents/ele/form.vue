  <template lc_id="Ldpt+NqXum">
      <div lc_id="7co7Bdg8yA">
          <div class="demonstration-element" lc_id="dwNmkrrypT">form组件</div>
          <el-button lc-mark lc_id="aPTB+/JFgB">默认按钮</el-button>
          <el-button lc-mark type="primary" @click="btnClick" lc_id="ItKh/wAcg7">主要按钮</el-button>
      </div>
  </template>
  <script>
export default {
  data() {
    return {};
  },
  methods: {
    btnClick() {
      console.log(1);
    },
  },
};  </script>
  <style lang="scss" scoped>.demonstration-element {
  margin-bottom: 10px;
}</style>
