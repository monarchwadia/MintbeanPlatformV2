<template lang="pug">
  div.text-2xl.cursor-pointer.inline-block.hover_text-grey-100(v-on:click.prevent="goBack" v-bind="{...$props, ...$attrs}")
    fa.icon.mr-2(icon="arrow-left")
    | Back
</template>

<script>
export default {
  name: "mb-back-button",
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>
