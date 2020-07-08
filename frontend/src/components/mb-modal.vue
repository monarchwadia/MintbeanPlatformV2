<template lang="pug">
  transition(name="modal-fade")
    div.mb-modal-backdrop.fixed.inset-0.z-9998.overflow-auto.bg-black.bg-opacity-50.flex(
       @click="close"
       v-if="isOpen"
      )
      div.mb-modal.relative.p-8.bg-white.w-full.max-w-md.m-auto.flex-col.flex.shadow-md(
        @click.stop
      )
        button.btn-close.self-end.p-1(
          @click="close"
          ) X
        div.text-center.mb-2.font-bold
          slot(name="title")
        section
          slot(name="body")
</template>

<script>
export default {
  name: 'mb-modal',
  props: ['showModal'],
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    close() {
      this.isOpen = false;
    },
    open() {
      this.isOpen = true;
    }
  },
}
</script>

<style lang="css" scoped >
  .modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }
</style>
