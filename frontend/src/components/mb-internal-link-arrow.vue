<template lang="pug">
  router-link(v-bind="{...$props, ...$attrs}").text-2xl.cursor-pointer.inline-block
    div(v-if="left")
      fa.icon.mr-2(icon="arrow-left")
      | {{ text }}
    div(v-else)
      fa.icon.mr-2(icon="arrow-right")
      | {{ text }}
</template>

<script>
export default {
  name: "mb-internal-link-arrow",
  props: {
    text: String,
    left: {
      type: Boolean,
      default: false
    }
  }
};
</script>
