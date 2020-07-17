
<template lang="pug">
  router-link(v-bind="{...$props, ...$attrs}").text-2xl.cursor-pointer.inline-block.hover_text-mb-mint-500
    fa.icon.mr-2(icon="arrow-right")
    | {{ text }}
</template>

<script>
export default {
  name: "mb-internal-link-arrow",
  props: {
    text: String,
  }
};
</script>
