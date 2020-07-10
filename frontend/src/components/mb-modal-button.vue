<template lang="pug">
  div.inline
    mb-button(@click="openModal") {{ text }}
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
    text: String,
  },
  methods: {
    openModal() {
      this.$refs.modal.open();
    },
  },
}
</script>
