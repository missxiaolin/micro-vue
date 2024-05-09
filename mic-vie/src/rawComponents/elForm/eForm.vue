<template lc_id="bYQ+0tm1nf">
  <div class="vcc-column-ul" lc_id="zrWMi8mWeP">
    <div class="column-li" lc-mark lc_id="v5XmawJp+L">
      <img
        class="li-img"
        src="../../assets/img/autocomplete.png"
        alt
        lc_id="133AjpmvAF"
      />
      <div class="title" lc_id="EfnunFlMkC">auto自动补全</div>
      <div class="li-mark-content" lc_id="e2L2h946q/">
        <el-autocomplete
          :fetch-suggestions="querySearch"
          clearable
          placeholder
          @select="handleSelect"
          lc_id="GKaRcZ+ila"
        ></el-autocomplete>
      </div>
    </div>
    <div class="column-li" lc-mark lc_id="ptQK0/tHMO">
      <img
        class="li-img"
        style="width: 70%; margin: 0 auto; margin-top: 10px"
        src="../../assets/img/ljxzq.png"
        alt
        lc_id="YInGNH2yxS"
      />
      <div class="title" lc_id="5V/b+hefEG">联级选择器</div>
      <div class="li-mark-content" lc_id="92aFXzKwX6">
        <el-cascader
          :options="cascaderOptions"
          @change="handleChange"
          lc_id="5kWVw5fo6+"
        ></el-cascader>
      </div>
    </div>
    <div class="column-li" lc-mark lc_id="9Nx8ZtPWXm">
      <img
        style="width: 70%; margin: 0 auto; margin-top: 10px"
        class="li-img"
        src="../../assets/img/checkbox.png"
        alt
        lc_id="4P5kKoqZ9u"
      />
      <div class="title" lc_id="3gwZVCrSqk">多选框</div>
      <div class="li-mark-content" lc_id="n1Xe/7eVnK">
        <el-checkbox-group lc_id="ddGA/m293B">
          <el-checkbox
            v-for="(item, index) in checkboxOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
            lc_id="LieBz/TE+m"
          ></el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checkboxOptions: [
        {
          label: "Option A",
          value: "Value A",
        },
        {
          label: "Option B",
          value: "Value B",
        },
      ],
      cascaderOptions: [],
    };
  },
  methods: {
    querySearch(queryString, cb) {
      const restaurants = [
        { value: "vue", link: "https://github.com/vuejs/vue" },
        { value: "element", link: "https://github.com/ElemeFE/element" },
        { value: "cooking", link: "https://github.com/ElemeFE/cooking" },
        { value: "mint-ui", link: "https://github.com/ElemeFE/mint-ui" },
        { value: "vuex", link: "https://github.com/vuejs/vuex" },
        { value: "vue-router", link: "https://github.com/vuejs/vue-router" },
        { value: "babel", link: "https://github.com/babel/babel" },
      ];
      const createFilter = (queryString) => {
        return (restaurant) => {
          return (
            restaurant.toLowerCase().indexOf(queryString.toLowerCase()) === 0
          );
        };
      };
      const results = queryString
        ? restaurants.filter(createFilter(queryString))
        : restaurants;
      // call callback function to return suggestions
      cb(results);
    },
    handleSelect(item) {
      console.log(item);
    },
    handleChange(value) {},
  },
};
</script>
