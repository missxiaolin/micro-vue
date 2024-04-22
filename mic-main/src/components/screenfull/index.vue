<template>
  <div>
    <!-- 全屏 -->
    <el-tooltip
      v-if="!content"
      effect="dark"
      :content="fullscreenTips"
      placement="bottom"
    >
      <svg-icon
        :icon-class="fullscreenSvgName"
        @click="handleFullscreenClick"
      />
    </el-tooltip>
    <!-- 内容区 -->
    <el-dropdown v-else>
      <svg-icon :icon-class="contentLargeSvgName" />
      <template #dropdown>
        <el-dropdown-menu>
          <!-- 内容区放大 -->
          <el-dropdown-item @click="handleContentLargeClick">{{
            contentLargeTips
          }}</el-dropdown-item>
          <!-- 内容区全屏 -->
          <el-dropdown-item
            @click="handleFullscreenClick"
            :disabled="isFullscreen"
            >内容区全屏</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { ElMessage } from "element-plus";
import screenfull from "screenfull";

export default defineComponent({
  components: {},
  props: {
    element: {
      type: String,
      default: "html",
    },
    openTips: {
      type: String,
      default: "全屏",
    },
    exitTips: {
      type: String,
      default: "退出全屏",
    },
    content: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    //#region 全屏
    const isFullscreen = ref<boolean>(false);

    const fullscreenTips = computed(() => {
      return isFullscreen.value ? props.exitTips : props.openTips;
    });

    const fullscreenSvgName = computed(() => {
      return isFullscreen.value ? "fullscreen-exit" : "fullscreen";
    });
    const handleFullscreenClick = () => {
      const dom = document.querySelector(props.element) || undefined;
      screenfull.isEnabled
        ? screenfull.toggle(dom)
        : ElMessage.warning("您的浏览器无法工作");
    };
    //#region 内容区
    const isContentLarge = ref<boolean>(false);
    const contentLargeSvgName = computed(() => {
      return isContentLarge.value ? "fullscreen-exit" : "fullscreen";
    });

    const handleContentLargeClick = () => {
      document.body.className = !isContentLarge.value ? "content-large" : "";
      isContentLarge.value = !isContentLarge.value;
    };
    const contentLargeTips = computed(() => {
      return isContentLarge.value ? "内容区复原" : "内容区放大";
    });

    return {
      fullscreenTips,
      fullscreenSvgName,
      handleFullscreenClick,
      contentLargeSvgName,
      handleContentLargeClick,
      contentLargeTips,
      isFullscreen,
    };
  },
});
</script>

<style lang="scss" scoped>
.svg-icon {
  font-size: 20px;
  &:focus {
    outline: none;
  }
}
</style>
