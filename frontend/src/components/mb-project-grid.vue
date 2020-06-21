<template lang="pug">

  div.mb-project-grid
    mb-project-grid-item(v-for="project in projects" :project="project")
</template>

<style lang="scss" scoped></style>

<script>
import mbProjectGridItem from "./mb-project-grid-item.vue";

// @ is an alias to /src
export default {
  name: "mb-project-grid",
  props: ["projects"],
  components: {
    "mb-project-grid-item": mbProjectGridItem
  }
};
</script>
