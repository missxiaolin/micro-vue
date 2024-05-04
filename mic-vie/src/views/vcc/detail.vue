<template>
  <div class="vcc-detaiil-box">
    <div class="vcc-base-box" v-if="isShowVcc">
      <div class="vcc-body-header">基础信息</div>
      <div class="vcc-body-content">
        <el-form
          ref="ruleFormRef"
          :model="formData"
          :rules="rules"
          label-width="auto"
        >
          <el-form-item label="路由名称" prop="route_name">
            <el-input v-model="formData.route_name" />
          </el-form-item>
          <el-form-item label="路由路径" prop="path">
            <el-input v-model="formData.path" />
          </el-form-item>
          <el-form-item>
            <div class="form-bottom-box">
              <el-button>取消</el-button>
              <el-button type="primary" @click="submitForm('ruleFormRef')">
                保存
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <vcc
      v-else
      :initCodeEntity="codeInfoEntity"
      @updateCodeEntity="onCodeUpdate"
      @onLoadFinish="onLoadFinish"
    ></vcc>
  </div>
</template>

<script>
import { pageRouteSave } from "../../api/page";
import { defineAsyncComponent } from "vue";
// 以这样一段结构初始化VCC组件
const initCodeStr =
  '{"template":{"lc_id":"root","__children":[{"div":{"class":"container","style":"min-height: 100%;","lc_id":"container","__children":[]}}]}}';

export default {
  components: {
    vcc: defineAsyncComponent(() => import("../../components-v2/vcc.vue")),
  },
  data() {
    return {
      active: 0,
      rules: {
        route_name: [
          { required: true, message: "请输入路由名称", trigger: "blur" },
        ],
        path: [{ required: true, message: "请输入路由路径", trigger: "blur" }],
      },
      codeInfoEntity: {
        codeStructure: "",
        JSCode: ``,
      },
      isShowVcc: false,
      formData: {
        id: 0,
        project_id: 0,
        route_name: "",
        path: "",
        tem_json: "",
        script_json: "",
      },
    };
  },
  mounted() {
    this.formData.project_id = this.$route.query.projectId;
    this.init();
  },
  methods: {
    init() {
      if (!this.formData.project_id) {
        this.$message.error("项目id不能为空");
        setTimeout(() => {
          this.$router.push(
            {
              path: "/bba/list",
            },
            2000
          );
        });
        return;
      }
      if (this.formData.id != 0) {
        // 编辑
      } else {
        // 创建
        this.codeInfoEntity.codeStructure = JSON.parse(initCodeStr);
        this.codeInfoEntity.JSCode = `
{
  data() {
    return {
    };
  },
  methods: {
  },
}
        `;
      }
      this.isShowVcc = true;
    },
    onCodeUpdate({ codeRawVueInfo, JSCode }) {
      // 编辑后新的代码结构
      // codeRawVueInfo为template对象表示结构
      // JSCode为显式输入的JS逻辑
      this.formData.tem_json = codeRawVueInfo;
      this.formData.script_json = JSCode;
    },
    onLoadFinish() {},
    async submitForm(formEl) {
      const el = this.$refs[formEl];
      if (!el) return;
      await el.validate((valid, fields) => {
        if (valid) {
          this.isShowVcc = false
        } else {
          //   console.log("error submit!", fields);
        }
      });
    },
    async save() {
      let param = this.formData;
      let res = await pageRouteSave(param);
      if (!res.success) {
        return;
      }
      this.$message({
        message: "保存成功",
        type: "success",
      });
      setTimeout(() => {
        this.$router.push(
          {
            path: "/vcc/index",
            query: {
              projectId: this.formData.project_id,
            },
          },
          1000
        );
      }, 2000);
    },
  },
};
</script>

<style lang="scss" scoped>
.vcc-detaiil-box {
  display: flex;
  .vcc-base-box {
    width: 100%;
    box-shadow: 0 1px 3px rgba(192,198,201,.3);
    .vcc-body-header {
      height: 42px;
      background: var(--search-bg-color);
      line-height: 42px;
      padding: 0 15px;
      font-weight: 600;
      font-size: 14px;
    }
    .vcc-body-content {
      padding: 20px;
    }
  }
}
</style>
