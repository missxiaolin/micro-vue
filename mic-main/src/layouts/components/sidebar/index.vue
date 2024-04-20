<template>
  <div class="has-logo">
    <logo :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="backgroundColor"
        :text-color="textColor"
        :active-text-color="activeTextColor"
        :unique-opened="true"
        :collapse-transition="false"
        :mode="'vertical'"
      >
        <sidebarItem
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :hidden="route.hidden"
          :base-path="route.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { constantRoutes } from "../../../router/index";
import childrenRoutes from '@/router/children'
import { getCssVariableValue } from "@/utils/index";
import logo from "../logo/index.vue";
import sidebarItem from "./sidebarItem.vue";
export default defineComponent({
  components: {
    logo,
    sidebarItem
  },
  setup() {
    const isCollapse = ref(false);
    const route = useRoute();

    const activeMenu = computed(() => {
      const {
        meta: { activeMenu },
        path,
      } = route;
      return activeMenu ? activeMenu : path;
    });

    const v3SidebarMenuBgColor = getCssVariableValue(
      "--v3-sidebar-menu-bg-color"
    );
    const v3SidebarMenuTextColor = getCssVariableValue(
      "--v3-sidebar-menu-text-color"
    );
    const v3SidebarMenuActiveTextColor = getCssVariableValue(
      "--v3-sidebar-menu-active-text-color"
    );

    const backgroundColor = computed(() => v3SidebarMenuBgColor);

    const textColor = computed(() => v3SidebarMenuTextColor);

    const activeTextColor = computed(() => v3SidebarMenuActiveTextColor);

    const tipLineWidth = computed(() => {
      return "2px";
    });

    const sidebarMenuItemHeight = computed(() => {
      return getCssVariableValue("--v3-sidebar-menu-item-height");
    });

    const sidebarMenuHoverBgColor = computed(() => {
      return getCssVariableValue("--v3-sidebar-menu-hover-bg-color");
    });

    return {
      isCollapse,
      routes: [...constantRoutes, ...childrenRoutes],
      activeMenu,
      backgroundColor,
      textColor,
      activeTextColor,
      tipLineWidth,
      sidebarMenuItemHeight,
      sidebarMenuHoverBgColor,
    };
  },
});
</script>

<style lang="scss" scoped>
@mixin tip-line {
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: v-bind(tipLineWidth);
    height: 100%;
    background-color: var(--v3-sidebar-menu-tip-line-bg-color);
  }
}

.has-logo {
  .el-scrollbar {
    // 多 1% 是为了在左侧模式时侧边栏最底部不显示 1px 左右的白色线条
    height: calc(101% - var(--v3-header-height));
  }
}

.el-scrollbar {
  // 多 5% 是为了在顶部模式时不显示垂直滚动条
  height: 105%;
  :deep(.scrollbar-wrapper) {
    // 限制水平宽度
    overflow-x: hidden !important;
    .el-scrollbar__view {
      height: 100%;
    }
  }
  // 滚动条
  :deep(.el-scrollbar__bar) {
    &.is-horizontal {
      // 隐藏水平滚动条
      display: none;
    }
  }
}

.el-menu {
  border: none;
  min-height: 100%;
  width: 100% !important;
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title),
:deep(.el-sub-menu .el-menu-item),
:deep(.el-menu--horizontal .el-menu-item) {
  height: v-bind(sidebarMenuItemHeight);
  line-height: v-bind(sidebarMenuItemHeight);
  &.is-active,
  &:hover {
    background-color: v-bind(sidebarMenuHoverBgColor);
  }
  * {
    vertical-align: middle;
  }
}

:deep(.el-sub-menu) {
  &.is-active {
    .el-sub-menu__title {
      color: v-bind(activeTextColor) !important;
    }
  }
}

:deep(.el-menu-item) {
  &.is-active {
    @include tip-line;
  }
}

.el-menu--collapse {
  :deep(.el-sub-menu) {
    &.is-active {
      .el-sub-menu__title {
        @include tip-line;
      }
    }
  }
}
</style>
