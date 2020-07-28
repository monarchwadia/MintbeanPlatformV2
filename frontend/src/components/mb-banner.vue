<template lang="pug">
  div.text-white.pt-4.pb-10.shadow-mb(style="background: linear-gradient(180deg, black, rgb(61, 61, 61));")
    div.container.m-auto.relative
      mb-internal-link-arrow.mb-2.realtive.text-white(
        v-if="backRefTitle && backRefPath"
        :to="backRefPath"
        :text="backRefTitle"
        left
      )
      h1.text-4xl {{ title }}
</template>

<script>
export default {
  name: "mb-banner",
  props: {
    title: String,
    backRefTitle: String,
    backRefPath: String
  }
};
</script>
