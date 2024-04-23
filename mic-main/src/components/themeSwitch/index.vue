<template>
  <el-dropdown trigger="click" @command="setTheme">
    <div>
      <el-tooltip effect="dark" content="主题模式" placement="bottom">
        <el-icon :size="20">
          <MagicStick />
        </el-icon>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="(theme, index) in themeList"
          :key="index"
          :disabled="activeThemeName === theme.name"
          :command="theme.name"
        >
          <span>{{ theme.title }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useTheme } from "../../hooks/useTheme";
import { MagicStick } from "@element-plus/icons-vue";

export default defineComponent({
  setup() {
    const { themeList, activeThemeName, setTheme } = useTheme();
    return {
      themeList,
      activeThemeName,
      setTheme,
      MagicStick,
    };
  },
});
</script>
