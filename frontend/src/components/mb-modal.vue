<template lang="html">
  <transition name="modal-fade">
    <div class="mb-modal-backdrop fixed inset-0 z-9998 overflow-auto bg-smoke-light flex">
      <div
        class="mb-modal relative p-8 bg-white w-full max-w-md m-auto flex-col flex"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <slot name="header">
          Default title!
          <button
            type="button"
            class="btn-close"
            @click="close"
            aria-label="Close modal"
          >
            x
          </button>
        </slot>

        <section class="modal-body">
          <slot name="body">
            I'm the default body!
          </slot>
         </section>

      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'mb-modal',
  data() {
    // return {
    //   isVisible: false,
    // }
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style lang="css" scoped >
  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease
  }
</style>
