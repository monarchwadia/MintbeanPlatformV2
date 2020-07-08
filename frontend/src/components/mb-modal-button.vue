<template lang="pug">
  mb-button(@click="openModal") {{ text }}
    //- must break mb-button color/cursor inheritance
    mb-modal.text-black.cursor-default(ref="modal")
      template(v-slot:title)
        slot(name="title")
      template(v-slot:body)
        slot(name="body")
</template>

<script>
export default {
  name: "mb-modal-button",
  props: {
    text: String,
  },
  methods: {
    openModal() {
      this.$refs.modal.open();
    },
  },
}
</script>

<style lang="css" scoped >

</style>
