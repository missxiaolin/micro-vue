<template>
  <div class="top-tools-bar">
    <el-row :gutter="22">
      <el-col :span="3">
        <div class="edit">
          <el-tooltip
            class="item"
            effect="dark"
            content="ctrl + z"
            placement="bottom-start"
          >
            <el-link
              type="primary"
              @click="$emit('undo')"
              style="margin-right: 3px"
              >undo</el-link
            >
          </el-tooltip>
          <el-link type="primary" @click="$emit('redo')">redo</el-link>
        </div>
      </el-col>
      <el-col :span="3">
        <el-link type="primary" @click="onPreviewModeChange"
          >{{ previewMode ? "PC" : "Mobile" }}</el-link
        >
      </el-col>
      <el-col :span="2">
        <div style="display: inline-block">
          <el-link
            :type="editMode ? 'primary' : 'danger'"
            @click="onEditModeChange"
            >{{ editMode ? "视图" : "编辑" }}</el-link
          >
        </div>
      </el-col>
      <el-col :span="3">
        <el-link type="primary" @click="$emit('structureVisible')"
          >结构树</el-link
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ElNotification } from 'element-plus'

export default {
  props: [],
  components: {},
  data() {
    return {
      previewMode: false,
      editMode: true,
    };
  },
  watch: {},
  computed: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  destroyed() {},
  methods: {
    // 在此自动生成
    request() {
      // 网络请求，可选
    },
    logout() {
      window.ssoLogin.logout();
    },

    onPreviewModeChange() {
      this.previewMode = !this.previewMode;
      this.$emit("onPreviewModeChange", this.previewMode);
    },

    onEditModeChange() {
      this.editMode = !this.editMode;
      this.$emit("onEditModeChange", this.editMode);

      setTimeout(() => {
        this.editMode = true;
      }, 500);
    },
    notification() {
      ElNotification({
        message: '暂未开发',
        type: 'warning',
      })
    }
  },
  fillter: {},
};
</script>

<style lang="scss" scoped>
.top-tools-bar {
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 500;
  color: #606266;
  border-radius: 0px;
  align-content: center;
}
.edit {
  display: inline-block;
}
.github-corner:hover .octo-arm {
  animation: octocat-wave 560ms ease-in-out;
}

@keyframes octocat-wave {
  0%,
  100% {
    transform: rotate(0);
  }

  20%,
  60% {
    transform: rotate(-25deg);
  }

  40%,
  80% {
    transform: rotate(10deg);
  }
}

@media (max-width: 500px) {
  .github-corner:hover .octo-arm {
    animation: none;
  }

  .github-corner .octo-arm {
    animation: octocat-wave 560ms ease-in-out;
  }
}
</style>
