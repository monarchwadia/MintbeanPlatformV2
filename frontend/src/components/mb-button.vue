<template>
  <button
    v-bind="{ ...$props, ...$attrs }"
    :class="btnClass"
    @click="$emit('click', $event)"
    :variant="variant"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "mb-button",
  props: {
    variant: {
      type: String,
      default: "primary",
      validator(val) {
        return ["primary", "default"].includes(val);
      }
    }
  },
  computed: {
    btnClass() {
      switch (this.variant) {
        case "primary":
          return "gradient-blue-mint text-white p-2 hover_shadow-md";
        case "default":
          return "border-solid bg-white border-2 border-gray-700 text-gray-700 p-2 hover_shadow-md";
        default:
          return "gradient-blue-mint text-white p-2 hover_shadow-md";
      }
    }
  }
};
</script>
