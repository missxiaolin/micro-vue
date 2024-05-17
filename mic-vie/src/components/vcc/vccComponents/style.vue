<template>
  <div class="attribute-style-box">
    <el-divider content-position="left">样式处理</el-divider>
    <div class="attribute-seeting-content">
      <div
        class="attribute-seeting-content-item"
        v-for="(item, index) in styleData"
        :key="index"
      >
        <div class="label">{{ item.name }}：</div>
        <div
          class="attribute-seeting-content-item-content"
          v-if="item.type === 'input'"
        >
          <el-input v-model="item.value"></el-input>
        </div>
        <div
          class="attribute-seeting-content-item-content"
          v-if="item.type === 'color'"
        >
          <el-color-picker v-model="item.value" @click="clickProp" class="aa"></el-color-picker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["localAttributes"],
  data() {
    return {
      styleData: [
        {
          name: "宽度",
          key: "width",
          type: "input",
          value: "",
        },
        {
          name: "高度",
          key: "height",
          type: "input",
          value: "",
        },
        {
          name: "字体颜色",
          key: "color",
          type: "color",
          value: "",
        },
        {
          name: "背景颜色",
          key: "background-color",
          type: "color",
          value: "",
        },
      ],
      styleCode: "",
    };
  },
  mounted() {
    this.init(this.localAttributes);
    const colorDropdowns = document.getElementsByClassName('el-color-dropdown')
    colorDropdowns.forEach(dom => {
        dom.addEventListener("click", (e) => {
            e.stopPropagation();
        })
    })
  },
  watch: {
    styleData: {
      handler(v) {
        this.codeStyleAttributes(v);
      },
      deep: true,
    },
  },
  methods: {
    // 初始化
    init(localAttributes) {
      const styleObjects = localAttributes.filter(
        (item) => item.key === "style"
      );
      if (!styleObjects || styleObjects.length == 0) {
        return;
      }
      this.styleCode = styleObjects[0].value;
      const styleObj = this.parseStyleString(styleObjects[0].value);
      this.styleData.forEach((item) => {
        if (styleObj[item.key]) {
          item.value = styleObj[item.key];
        }
      });
    },
    // 转成对象
    parseStyleString(styleString) {
      if (!styleString) {
        return;
      }
      const properties = styleString.split(";").filter(Boolean); // 分割并去除空项
      const styleObject = {};
      properties.forEach((property) => {
        const [key, value] = property.split(":").map((part) => part.trim()); // 分割键和值，并去除前后空白
        if (key && value) {
          styleObject[key] = value;
        }
      });

      return styleObject;
    },
    codeStyleAttributes(data) {
      let str = "";
      data.forEach((item) => {
        if (item.value) {
          str = str + `${item.key}: ${item.value}; `;
        }
      });
      let newStyle = this.mergeStyles(this.styleCode, str);
      this.$emit("childSave", "style", `${newStyle}`);
    },
    // 合并style
    mergeStyles(style1, style2) {
      const styles1 = style1.split(";").filter(Boolean);
      const styles2 = style2.split(";").filter(Boolean);

      for (let i = 0; i < styles2.length; i++) {
        const [key, value] = styles2[i].split(":");
        if (key && value) {
          const keyLower = key.trim().toLowerCase();
          const existingIndex = styles1.findIndex((s) =>
            s.toLowerCase().startsWith(keyLower + ":")
          );
          if (existingIndex !== -1) {
            styles1[existingIndex] = `${key}: ${value}`;
          } else {
            styles1.push(styles2[i]);
          }
        }
      }

      return styles1.join("; ");
    },
    clickProp(event) {
      event.stopPropagation();
    },
  },
};
</script>

<style lang="scss">
.attribute-style-box {
  display: flex;
  flex-direction: column;
  .attribute-seeting-content-item {
    margin-bottom: 10px;
    .label {
      white-space: nowrap;
    }
  }
}
</style>
