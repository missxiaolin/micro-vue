  <template lc_id="FnLP+KMf1S">
      <div class="vcc-column-ul" lc_id="0IVyx2rzvA">
          <div class="column-li" lc-mark lc_id="LjfMKyUFO7">
              <img class="li-img max-img" src="../../assets/img/custom-form.png" alt lc_id="yoMLS3E95x"/>              <div class="title" lc_id="vSzA1wZphy">表单组件</div>
              <div class="li-mark-content" lc_id="nuB8PjgWQH">
                  <l-form :form="formItem" :span="8" @success="formSuccess" lc_id="Cib8KAOhoO"></l-form>
              </div>
          </div>
          <div class="column-li" lc-mark lc_id="fPacU7/1gd">
              <img class="li-img max-img" src="../../assets/img/form-search.png" alt lc_id="NhPtGUouGv"/>              <div class="title" lc_id="XuZ90HDddh">搜索表单组件</div>
              <div class="li-mark-content" lc_id="nuB8PjgWQH">
                  <l-s-form :form="sFormItem" :span="8" @success="sFormSuccess" lc_id="xB2AIRewX5"></l-s-form>
              </div>
          </div>
      </div>
  </template>
  <script>
export default {
  data() {
    return {
      formItem: [],
      sFormItem: []
    };
  },
  methods: {
    formSuccess(data) {
      console.log(data);
    },
    sFormSuccess(data) {
      console.log(data);
    },
  },
};  </script>
