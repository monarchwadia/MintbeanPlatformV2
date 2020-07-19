<template lang="pug">
  div(:style="style")
</template>

<script>
export default {
  name: "mb-avatar",
  props: {
    size: {
      type: String,
      validator(val) {
        return ["sm", "md", "lg", "xl"].includes(val);
      }
    },
    color: {
      type: String
    }
  },
  methods: {
    randomMintyColor() {
      const mbColors = ["#7fcdf0", "#466585", "#80f6ce"];
      const randomColor = mbColors[Math.floor(Math.random() * mbColors.length)];
      return randomColor;
    },
    parsedSize() {
      switch (this.size) {
        case "sm":
          return "24px;";
        case "md":
          return "50px";
        case "lg":
          return "100px";
        default:
          return "50px";
      }
    }
  },
  computed: {
    style() {
      return `width: ${this.parsedSize()}; height: ${this.parsedSize()}; border-radius: 50%; background-color: ${this.randomMintyColor()}`;
    }
  }
};
</script>
