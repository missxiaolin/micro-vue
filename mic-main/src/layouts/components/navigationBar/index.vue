<template>
  <div class="navigation-bar">
    <hamburger class="hamburger" :is-active="sidebar.opened" @toggle-click="toggleSidebar" />
    <!-- <breadcrumb class="breadcrumb"></breadcrumb> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
// import breadcrumb from "../breadcrumb/index.vue";
import hamburger from "../hamburger/index.vue";

export default defineComponent({
  components: {
    hamburger,
    // breadcrumb
  },
  setup() {
    const toggleSidebar = () => {
        console.log('toggleSidebar')
    }

    return {
        toggleSidebar,
        sidebar: {
            opened: false
        }
    }
  }
});
</script>

<style lang="scss" scoped>
.navigation-bar {
  height: var(--v3-navigationbar-height);
  overflow: hidden;
  background: var(--v3-header-bg-color);
  display: flex;
  justify-content: space-between;
  .hamburger {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 15px;
    cursor: pointer;
  }
  .breadcrumb {
    flex: 1;
    // 参考 Bootstrap 的响应式设计将宽度设置为 576
    @media screen and (max-width: 576px) {
      display: none;
    }
  }
  .side-bar {
    flex: 1;
    // 设置 min-width 是为了让 Sidebar 里的 el-menu 宽度自适应
    min-width: 0px;
    :deep(.el-menu) {
      background-color: transparent;
    }
    :deep(.el-sub-menu) {
      &.is-active {
        .el-sub-menu__title {
          color: var(--el-menu-active-color) !important;
        }
      }
    }
  }
  .right-menu {
    margin-right: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    color: #606266;
    .right-menu-item {
      padding: 0 10px;
      cursor: pointer;
      .right-menu-avatar {
        display: flex;
        align-items: center;
        .el-avatar {
          margin-right: 10px;
        }
        span {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
