<template>
  <div class="navigation-bar">
    <hamburger
      class="hamburger"
      :is-active="!getSidebarOpened"
      @toggle-click="toggleSidebar"
    />
    <breadcrumb class="breadcrumb"></breadcrumb>
    <div class="right-menu">
      <screenfull class="right-menu-item" />
      <el-dropdown class="right-menu-item">
        <div class="right-menu-avatar">
          <el-avatar :icon="UserFilled" :size="30" />
          <span>admin</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <!-- <router-link :to="{ path: '/info', query: { setid: 123456 } }">
              <el-dropdown-item>个人信息</el-dropdown-item>
            </router-link> -->
            <!-- <el-dropdown-item divided @click="logout"></el-dropdown-item> -->
            <el-dropdown-item @click="logout">
              <span style="display: block">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import screenfull from "@/components/screenfull/index.vue";
import breadcrumb from "../breadcrumb/index.vue";
import hamburger from "../hamburger/index.vue";
import { UserFilled } from "@element-plus/icons-vue";
import { useStore, mapGetters } from "vuex";

export default defineComponent({
  computed: {
    ...mapGetters(["getSidebarOpened"]),
  },
  components: {
    hamburger,
    breadcrumb,
    screenfull,
  },
  setup() {
    const store = useStore();

    const toggleSidebar = () => {
      store.commit('setSidebarOpened', !store.state.setting.sidebarOpened)
    };

    const logout = () => {}

    return {
      toggleSidebar,
      UserFilled,
      logout,
      sidebar: {
        opened: false,
      },
    };
  },
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
