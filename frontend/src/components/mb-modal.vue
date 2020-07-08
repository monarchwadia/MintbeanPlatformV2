<template lang="html">
  <transition name="modal-fade">
    <div
      class="mb-modal-backdrop fixed inset-0 z-9998 overflow-auto bg-smoke-light flex"
      @click="close"
    >
      <div
        class="mb-modal relative p-8 bg-white w-full max-w-md m-auto flex-col flex shadow-md"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
        @click.stop
      >
        <button
          type="button"
          class="btn-close self-end p-1"
          @click="close"
          aria-label="Close modal"
          >
          x
        </button>
        <div class="mb-modal-title text-center font-bold">
            <slot name="title"></slot>
        </div>
        <section class="mb-modal-body">
          <slot name="body"></slot>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'mb-modal',
  props: ['showModal'],
  data() {
    return {
      // isOpen: true
    }
  },
  methods: {
    close() {
      // this.isOpen = false;
      this.$emit('close');
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
    transition: opacity .5s ease
  }
</style>
