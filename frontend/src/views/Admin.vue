<template lang="pug">
div
  main
    h1 Admin Panel
    mb-project-search
</template>

<style lang="scss" scoped></style>

<script>
import mbProjectSearch from "../components/mb-project-search";
// @ is an alias to /src
export default {
  name: "Home",
  components: {
    "mb-project-search": mbProjectSearch
  },
  computed: {},
  methods: {}
};
</script>
