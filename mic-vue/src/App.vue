<template>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  setup() {
    onMounted(() => {
      document.documentElement.className = 'dark';
    })
  }
})

</script>

<style lang="scss">
</style>
