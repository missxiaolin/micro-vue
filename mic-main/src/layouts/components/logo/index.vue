<template>
  <div
    class="layout-logo-container"
    :class="{
      collapse: props.collapse,
    }"
  >
    <transition name="layout-logo-fade">
      <router-link v-if="props.collapse" key="collapse" to="/">
        <img :src="logoSamll" class="layout-logo" />
      </router-link>
      <router-link v-else key="expand" to="/">
        <img :src="logo" class="layout-logo-text" />
      </router-link>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// @ts-ignore
import logo from "@/assets/img/logo.png?url";
// @ts-ignore
import logoSamll from "@/assets/img/logo-small.png?url";

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    return {
      logo,
      props,
      logoSamll,
    };
  },
});
</script>

<style lang="scss" scoped>
.layout-logo-container {
  position: relative;
  width: 100%;
  height: var(--v3-header-height);
  line-height: var(--v3-header-height);
  background-color: transparent;
  text-align: center;
  overflow: hidden;
  .layout-logo {
    display: none;
  }
  .layout-logo-text {
    height: 50px;
    vertical-align: middle;
  }
}

.collapse {
  .layout-logo {
    width: 32px;
    height: 32px;
    vertical-align: middle;
    display: inline-block;
  }
  .layout-logo-text {
    display: none;
  }
}
</style>
