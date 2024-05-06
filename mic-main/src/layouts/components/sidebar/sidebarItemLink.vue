<template>
  <a
    v-if="isExternal(props.to)"
    :href="props.to"
    target="_blank"
    rel="noopener"
  >
    <slot />
  </a>
  <div v-else @click="routePush(props.to)">
    <slot />
  </div>
  <!-- <router-link v-else :to="props.to">
    <slot />
  </router-link> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { isExternal } from "@/utils/validate";

export default defineComponent({
  props: {
    to: {
      type: String,
      default: '',
    }
  },
  setup(props) {
    const router = useRouter()
    const routePush = (to: any) => {
      console.log(to)
      router.push(to)
    }

    return {
      isExternal,
      props,
      routePush
    }
  }
})
</script>
