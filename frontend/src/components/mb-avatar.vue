<template lang="pug">
  div(:style="style")
</template>

<script>
export default {
  name: 'mb-avatar',
  props: {
    size: String,
    color: {
      type: String,
    }
  },
  methods: {
    randomMintyColor() {
      const mbColors = ['#7fcdf0','#466585','#80f6ce'];
      const randomColor =  mbColors[Math.floor(Math.random()*mbColors.length)];
      return randomColor;
    },
  },
  computed: {
    style() {
      return `width: ${this.size}; height: ${this.size}; border-radius: 50%; background-color: ${this.randomMintyColor()}`;
    }
  }
}
</script>
