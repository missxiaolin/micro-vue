<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { onMounted } from 'vue'

export default defineComponent({
  setup() {
    function getMicroOnlineConfig() {
      // TOODO: 获取微服务配置
      
    }

    onMounted(() => {
      getMicroOnlineConfig()
    })
  },
})
</script>


<style lang="scss">

</style>
