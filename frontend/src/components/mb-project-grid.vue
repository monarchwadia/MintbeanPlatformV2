<template lang="pug">

  div.mb-project-grid
    mb-project-grid-item(v-for="project in projects" :project="project")
</template>

<style lang="scss" scoped>
.mb-project-grid {
  column-gap: 5px;
  row-gap: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
}
</style>

<script>
import mbProjectGridItem from "./mb-project-grid-item.vue";

// @ is an alias to /src
export default {
  name: "MbProjectGrid",
  computed:{
    projects: function() {
      return this.$store.state.frontpageProjects;
    }
  },
  components: {
    "mb-project-grid-item": mbProjectGridItem
  }
};
</script>
