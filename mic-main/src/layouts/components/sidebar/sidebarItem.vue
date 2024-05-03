<template>
  
  <div
    v-if="item && !item.children"
  >
    <sidebarItemLink
      v-if="item.meta"
      :to="resolvePath(item.path)"
    >
      <el-menu-item :index="resolvePath(item.path)">
        <component
          v-if="item.meta.elIcon"
          :is="item.meta.elIcon"
          class="el-icon"
        />
        <template v-if="item.meta.title" #title>
          {{ item.meta.title }}
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
      basePath,
    }: any = props;

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
