import { h, renderSlot, resolveComponent, watch, computed } from "vue";
import createComponent from "../../utils/create";
import { deepClone, extUrl } from "../../utils/utils";
const { create } = createComponent("Overlay");

export default create({
  props: ["content", "modelValue"],
  setup(props, { slots, emit }) {
    const { type, propsData, options, value } = props.content;
    const { customValue = "value", customLabel = "label" } = propsData || {};

    // select 监听options变化，同步更新视图
    const contentComputed = computed(() => {
      return deepClone(props.content?.options || "");
    });

    watch(
      () => contentComputed,
      (n, o) => {
        emit("updateOptions");
      },
      { deep: true }
    );

    const custom = resolveComponent(`el-${type}`);

    // !注意：select组件在渲染options时只接受function  [Non-function value encountered for default slot. Prefer function slots for b]
    // !注意：cascader组件渲染时无默认插槽

    const children =
      type === "cascader"
        ? ""
        : () => {
            let _options = renderSlot(slots, "default");

            if (type === "select" && options && options.length) {
              const Option = resolveComponent(`el-option`);
              _options = options.map((ele, index) => {
                const targetLabel = ele[customLabel];
                const extedLabel = extUrl(customLabel, ele);
                return h(Option, {
                  key: index,
                  label: extedLabel || targetLabel,
                  value: ele[customValue],
                });
              });
            }

            return _options;
          };

    return () => {
      if (!custom) return "";
      return h(
        custom,
        {
          ...propsData,
          modelValue: props.modelValue,
          "onUpdate:modelValue": (value) => emit("update:modelValue", value),
          
        },
        children
      );
    };
  },
});
