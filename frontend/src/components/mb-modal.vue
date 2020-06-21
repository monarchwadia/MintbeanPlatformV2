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

<style lang="scss" scoped></style>

<script>
export default {
  name: "mb-modal",
  props: ["display", "title", "buttons"],
  data() {
    return {
      displayInitial: false,
      opacity100: false
    };
  },
  methods: {
    onClickCover(evt) {
      if (evt.target === this.$refs.cover) {
        this.onClose();
      }
    },
    onClose() {
      this.$emit("close");
    }
  },
  computed: {
    buttonJson() {
      const self = this;
      const buttons = this.buttons || [];
      return buttons.concat([
        { label: "Close", onClick: () => self.onClose() }
      ]);
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
