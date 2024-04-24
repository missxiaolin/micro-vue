<template>
  <div
    :class="{
      hideSidebar: getSidebarOpened,
      openSidebar: !getSidebarOpened,
      mainContent: true,
    }"
    class="app-wrapper"
  >
    <!-- 左侧边栏 -->
    <sidebar class="sidebar-container" />
    
    <!-- 主容器 -->
    <div :class="{ hasTagsView: showTagsView }" class="main-container">
      <!-- 头部导航栏和标签栏 -->
      <div :class="{ 'fixed-header': fixedHeader }" class="layout-header">
        <navigation-bar />
      </div>
      <el-scrollbar :height="h">
        <!-- 页面主体内容 -->
        <appMain class="app-main" />
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref, watch } from "vue";
import { mapGetters } from "vuex";
import { sidebar, navigationBar, appMain } from "./components";
import { useTheme } from "../hooks/useTheme";

export default {
  computed: {
    ...mapGetters(["getSidebarOpened"]),
  },
  components: {
    sidebar,
    navigationBar,
    appMain,
  },
  setup() {
    const h = ref('100vh')
    useTheme();
    const innerHeight = window.innerHeight;
    h.value = `${innerHeight - 50}px`
    return {
      h,
      showTagsView: true,
      fixedHeader: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixins.scss";
$transition-time: 0.35s;

.main-content {
  width: 100%;
  height: auto;
  overflow: hidden;
}

.app-wrapper {
  @include clearfix;
  position: relative;
  width: 100%;
  min-height: 100vh;
}

.drawer-bg {
  background-color: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.sidebar-container {
  background-color: var(--v3-sidebar-menu-bg-color);
  transition: width $transition-time;
  width: var(--v3-sidebar-width) !important;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}

.main-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: margin-left $transition-time;
  margin-left: var(--v3-sidebar-width);
  position: relative;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - var(--v3-sidebar-width));
  transition: width $transition-time;
}

.layout-header {
  box-shadow: var(--el-box-shadow-lighter);
}

.app-main {
  width: 100% !important;
  min-height: calc(100vh - var(--v3-navigationbar-height));
  position: relative;
  overflow: auto !important;
}

.fixed-header + .app-main {
  padding-top: var(--v3-navigationbar-height);
  height: auto !important;
  overflow: auto;
}

.hasTagsView {
  .app-main {
    height: auto;
  }
  .fixed-header + .app-main {
    padding-top: var(--v3-header-height);
  }
}

.hideSidebar {
  .sidebar-container {
    width: var(--v3-sidebar-hide-width) !important;
  }
  .main-container {
    margin-left: var(--v3-sidebar-hide-width);
  }
  .fixed-header {
    width: calc(100% - var(--v3-sidebar-hide-width));
  }
}

// 适配 mobile 端
.mobile {
  .sidebar-container {
    transition: transform $transition-time;
    width: var(--v3-sidebar-width) !important;
  }
  .main-container {
    margin-left: 0px;
  }
  .fixed-header {
    width: 100%;
  }
  &.openSidebar {
    position: fixed;
    top: 0;
  }
  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(calc(0px - var(--v3-sidebar-width)), 0, 0);
    }
  }
}

.withoutAnimation {
  .sidebar-container,
  .main-container {
    transition: none;
  }
}
</style>
