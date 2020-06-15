<template lang="pug">
  transition(name="fade")
    div.mb-modal-cover(v-if="display" v-on:click.prevent="onClickCover" ref="cover")
      aside.mb-modal-body
        header
          div.title {{ title }}
          div.buttons
            button(v-for="b in buttonJson" v-on:click.prevent="b.onClick") {{ b.label }}
        div.mb-modal-contents
          slot
</template>

<style lang="scss" scoped>
$body-padding: 25px;
$z-index: 1100;
$button-line-height: 30px;
$header-height: 50px;

.mb-modal-cover {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: $z-index;
  background-color: rgba(0,0,0,0.25);
}

.mb-modal-body {
  position: fixed;
  width: unset;
  max-width: unset;
  top: $body-padding;
  left: $body-padding;
  right: $body-padding;
  bottom: $body-padding;
  z-index: $z-index + 1;
  background-color: white;
  overflow: hidden;
  padding: 25px;

  header {
    display: flex;
    justify-content: space-between;
    text-align: left;
    height: $header-height;

    button {
      padding: 0px 25px;
      margin: 0px;
      height: $button-line-height;
      line-height: $button-line-height;
    }
  }

  .mb-modal-contents {
    max-height: calc(100% - #{$header-height});
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>

<script>

export default {
  name: "mb-modal",
  props: ['display', 'title', 'buttons'],
  data() {
    return {
      displayInitial: false,
      opacity100: false
    }
  },
  methods: {
    onClickCover(evt) {
      if (evt.target === this.$refs.cover) {
        this.onClose();
      }
    },
    onClose() {
      this.$emit('close');
    }
  },
  computed: {
    buttonJson() {
      const self = this;
      const buttons = this.buttons || [];
      return buttons.concat([{ label: 'Close', onClick: () => self.onClose() }])
    }
  },
  watch: {
    display(val) {
      const self = this;
      self.displayInitial = !!val;

      setTimeout(() => {
        self.opacity100 = !!val;
      }, 1);
    }
  }
};
</script>
