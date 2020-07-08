<template lang="pug">
  mb-modal-button(:text="text" ref="modalBtn")
    template(v-slot:title) {{ title }}
    template(v-slot:body)
      p.mb-2.text-center {{ message }}
      div.flex.justify-around
        mb-button(@click="emitCancelAndClose") {{ cancelText }}
        mb-button(@click="emitConfirmAndClose") {{ confirmText }}
</template>

<script>
export default {
  name: 'mb-confirm',
  props: {
    text: {
      type: String,
    },
    message: {
      type: String,
      default: 'Are you sure you want to do that?',
    },
    title: {
      type: String,
      default: '',
    },
    confirmText: {
      type: String,
      default: 'Confirm',
    },
    cancelText: {
      type: String,
      default: 'Cancel',
    }
  },
  methods: {
    emitConfirmAndClose() {
      this.$emit('confirm');
      this.$refs.modalBtn.$refs.modal.close();
    },
    emitCancelAndClose() {
      this.$emit('cancel');
      this.$refs.modalBtn.$refs.modal.close();
    }
  }
}
</script>

<style lang="css" scoped >

</style>
