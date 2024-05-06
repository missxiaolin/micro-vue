<template> 
  <div class="container" style="min-height: 100%;">
      <div div-lc-mark>
          <span>Span Element</span>
      </div>
      <el-button type="primary" @click="btnClick">主要按钮</el-button>
      <el-button>默认按钮</el-button>
      <el-button>默认按钮</el-button>
  </div>
 
</template>

<script>
export default {
  props: [],
  components: {},
  data() {
    return {}
  },
  watch: {},
  computed: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  destroyed() {},
  methods: {
    request() {},
    btnClick() {},
  },
  fillter: {},
}

</script>

<style scoped>
.container{}

</style>
  