<template lang="pug">
  div
    transition(name="fade" v-for="e in mbErrors")
      div(@click="handleCloseError(e)")
        div.close-button x
        b {{ e.title }} {{ e.id }}
        p {{ e.description }}

</template>

<style lang="scss" scoped>

</style>

<script>
export default {
  name: "mb-errors",
  computed: {
    mbErrors() {
      return this.$store.state.mbErrors;
    },
  },
  methods: {
    handleCloseError(e) {
      this.$store.dispatch('errorPush', e)
    }
  }
};
</script>
