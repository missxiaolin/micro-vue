<template>
  <a
    v-if="isExternal(props.to)"
    :href="props.to"
    target="_blank"
    rel="noopener"
  >
    <slot />
  </a>
  <router-link v-else :to="props.to">
    <slot />
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { isExternal } from "@/utils/validate";

export default defineComponent({
  props: {
    to: {
      type: String,
      default: '',
    }
  },
  setup(props) {
    return {
      isExternal,
      props
    }
  }
})
</script>
