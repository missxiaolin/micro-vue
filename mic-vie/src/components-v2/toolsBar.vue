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
              >撤销</el-link
            >
          </el-tooltip>
          <el-link type="primary" @click="$emit('redo')">重做</el-link>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
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
