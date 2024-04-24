<template>
  <div
    v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children"
  >
    <sidebarItemLink
      v-if="theOnlyOneChild.meta"
      :to="resolvePath(theOnlyOneChild.path)"
    >
      <el-menu-item :index="resolvePath(theOnlyOneChild.path)">
        <component
          v-if="theOnlyOneChild.meta.elIcon"
          :is="theOnlyOneChild.meta.elIcon"
          class="el-icon"
        />
        <template v-if="theOnlyOneChild.meta.title" #title>
          {{ theOnlyOneChild.meta.title }}
        </template>
      </el-menu-item>
    </sidebarItemLink>
  </div>
  <el-sub-menu v-else :index="resolvePath(item.path)" teleported>
    <template #title>
      <component
        v-if="item.meta?.elIcon"
        :is="item.meta.elIcon"
        class="el-icon"
      />
      <span v-if="item.meta?.title">{{ item.meta.title }}</span>
    </template>
    <template v-if="item.children">
      <div v-for="child in item.children" :key="child.path">
        <sidebar-item
          v-if="!child.hidden"
          :item="child"
          :is-collapse="isCollapse"
          :is-first-level="false"
          :base-path="resolvePath(child.path)"
        />
      </div>
    </template>
  </el-sub-menu>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import sidebarItemLink from "./sidebarItemLink.vue";
import { isExternal } from "@/utils/validate";
import path from "path-browserify";

export default defineComponent({
  components: {
    sidebarItemLink,
  },
  props: {
    item: {
      type: Object,
      default: {},
    },
    hidden: {
      type: Boolean,
      default: false,
    },
    isCollapse: {
      type: Boolean,
      default: false,
    },
    isFirstLevel: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: "",
    },
    alwaysShow: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const {
      item,
      hidden,
      isCollapse,
      isFirstLevel,
      basePath,
      alwaysShow,
    }: any = props;

    /** 是否始终显示根菜单 */
    const alwaysShowRootMenu = computed(() => alwaysShow);

    /** 显示的子菜单 */
    const showingChildren = computed(() => {
      return item.children?.filter(() => !hidden) ?? [];
    });

    /** 显示的子菜单数量 */
    const showingChildNumber = computed(() => {
      return showingChildren.value.length;
    });

    /** 唯一的子菜单项 */
    const theOnlyOneChild = computed(() => {
      const number = showingChildNumber.value;
      switch (true) {
        case number > 1:
          return null;
        case number === 1:
          return showingChildren.value[0];
        default:
          return { ...props.item, path: "" };
      }
    });

    /** 解析路径 */
    const resolvePath = (routePath: string) => {
      switch (true) {
        case isExternal(routePath):
          return routePath;
        case isExternal(basePath):
          return basePath;
        default:
          return path.resolve(basePath, routePath);
      }
    };

    return {
      props,
      alwaysShowRootMenu,
      theOnlyOneChild,
      resolvePath,
    };
  },
});
</script>

<style lang="scss" scoped>
.svg-icon {
  min-width: 1em;
  margin-right: 12px;
  font-size: 18px;
}

.el-icon {
  width: 1em;
  margin-right: 12px;
  font-size: 18px;
}

.simple-mode {
  &.first-level {
    :deep(.el-sub-menu) {
      .el-sub-menu__icon-arrow {
        display: none;
      }
      span {
        visibility: hidden;
      }
    }
  }
}
</style>
