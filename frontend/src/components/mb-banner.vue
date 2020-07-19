<template lang="pug">
  div.text-white.py-12.shadow-mb(style="background: linear-gradient(180deg, black, rgb(61, 61, 61));")
    div.container.m-auto
      mb-back-button.mb-2
      h1.text-4xl {{ title }}
</template>

<script>
export default {
  name: "mb-banner",
  props: {
    title: String
  }
};
</script>
