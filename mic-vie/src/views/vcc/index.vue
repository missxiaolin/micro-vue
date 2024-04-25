<template>
  <div class="vcc-index-box">
    <div class="mu-search-container pall10">
      <div class="mu-search-form-button">
        <el-button>重置</el-button>
        <el-button type="primary">查询</el-button>
      </div>
    </div>
    <div class="mu-handle-content">
        <el-button type="primary" @click="goRoute">创建页面</el-button>
    </div>
  </div>
</template>


<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        goRoute() {
            this.$router.push({
                path: '/vie/vcc/detail'
            })
        }
    }
}
</script>