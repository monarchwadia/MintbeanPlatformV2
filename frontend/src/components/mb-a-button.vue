<template lang="pug">
  mb-a(
    v-bind="{ ...$props, ...$attrs }"
    :class="btnClass"
    :variant="variant"
    :rel="isExternal ? 'noopener noreferrer nofollow' : null "
    :target="isExternal ? '_blank' : null"
    @click="$emit('click', $event)"
  )
    slot
</template>

<script>
export default {
  name: "mb-a-button",
  props: {
    isExternal: {
      type: Boolean,
      default: false
    },
    // btn style
    variant: {
      type: String,
      default: 'primary',
      validator (val) {
        return ['primary', 'default'].includes(val)
      },
    },
  },
  computed: {
    btnClass() {
      switch(this.variant) {
        case "primary":
          return "gradient-blue-mint text-white p-2 hover_shadow-md";
        case "default":
          return "border-solid border-2 border-gray-700 text-gray-700 p-2 hover_shadow-md";
        default:
          return "gradient-blue-mint text-white p-2 hover_shadow-md";
      }
    },
  }
};
</script>
