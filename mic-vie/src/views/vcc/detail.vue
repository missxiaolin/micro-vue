<template>
  <div class="vcc-detaiil-box">
    <div class="vcc-base-box" v-if="isShowBaseForm">
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
            <el-input
              :disabled="formData.id ? true : false"
              v-model="formData.path"
            />
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
      v-if="isShowVcc"
      :initCodeEntity="codeInfoEntity"
      @updateCodeEntity="onCodeUpdate"
      @onLoadFinish="onLoadFinish"
      @save="save"
    ></vcc>
  </div>
</template>

<script>
import { pageRouteSave, pageRouteDetail } from "../../api/page";
import { defineAsyncComponent } from "vue";
// 以这样一段结构初始化VCC组件
const initCodeStr =
  '{"template":{"lc_id":"root","__children":[{"div":{"class":"container","style":"min-height: 100%;","lc_id":"container","__children":[]}}]}}';

const jsTem = `
{
  data() {
    return {
    };
  },
  methods: {
  },
}
`;
export default {
  components: {
    vcc: defineAsyncComponent(() => import("../../components-v2/vcc.vue")),
  },
  data() {
    return {
      isShowBaseForm: false,
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
    this.formData.project_id = this.$route.query.projectId || "";
    this.init();
  },
  methods: {
    async init() {
      if (!this.formData.project_id) {
        this.$message.error({
          message: "项目id不能为空",
          duration: 2000,
          onClose: () => {
            this.$router.push({
              path: "/bba/list",
            });
          },
        });
        return;
      }
      if (this.$route.query.id && this.$route.query.id != 0) {
        // 编辑
        let res = await pageRouteDetail({
          id: this.$route.query.id,
          projectId: this.$route.query.projectId
        });
        if (!res.success || res.model.length == 0) {
          setTimeout(() => {
            this.$router.push(
              {
                path: "/vcc/index",
                query: {
                  projectId: this.$route.query.projectId,
                },
              },
            );
          }, 2000);
          return false;
        }
        this.formData = res.model;
        this.codeInfoEntity.codeStructure = JSON.parse(res.model.tem_json);
        this.codeInfoEntity.JSCode = res.model.script_json;
      } else {
        // 创建
        this.codeInfoEntity.codeStructure = JSON.parse(initCodeStr);
        this.codeInfoEntity.JSCode = jsTem;
        this.formData.tem_json = initCodeStr;
        this.formData.script_json = jsTem;
      }
      this.isShowBaseForm = true;
    },
    onCodeUpdate({ codeRawVueInfo, JSCode }) {
      // 编辑后新的代码结构
      // codeRawVueInfo为template对象表示结构
      // JSCode为显式输入的JS逻辑
      console.log("onCodeUpdate", codeRawVueInfo, JSCode);
      this.formData.tem_json = JSON.stringify(codeRawVueInfo);
      this.formData.script_json = JSCode;
    },
    onLoadFinish() {},
    async submitForm(formEl) {
      const el = this.$refs[formEl];
      if (!el) return;
      await el.validate((valid, fields) => {
        if (valid) {
          this.isShowVcc = true;
          this.isShowBaseForm = false;
        } else {
          //   console.log("error submit!", fields);
        }
      });
    },
    async save(code) {
      let param = this.formData;
      param.page_html = code;
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
    box-shadow: 0 1px 3px rgba(192, 198, 201, 0.3);
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
