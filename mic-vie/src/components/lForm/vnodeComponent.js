import { h, renderSlot, resolveComponent, watch, computed } from "vue";
import createComponent from "../../utils/create";
const { create } = createComponent("Overlay");

export default create({
  props: ["content", "modelValue"],
  setup(props, { slots, emit }) {
    const e = 'el';
    const { type, label, propsData, options, value } = props.content;
    const { customValue = 'value', customLabel = 'label' } = propsData || {};


    const custom = resolveComponent(`${e}-${type}`);

    return () => {
        if (!custom) return '';
        console.log('custom', custom, label)
        return h(
            custom
        )
    }
  },
});
