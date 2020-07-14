<template lang="pug">
  div.inline
    mb-button(@click="openModal" :variant="btnVariant") {{ btnText }}
    mb-modal(ref="modal")
      template(v-slot:title)
        slot(name="title")
      template(v-slot:body)
        slot(name="body")
</template>

<script>
export default {
  name: "mb-modal-button",
  props: {
    btnText: String,
    btnVariant: {
      type: String,
      default: "primary",
    },
  },
  methods: {
    openModal() {
      this.$refs.modal.open();
    },
  },
}
</script>
