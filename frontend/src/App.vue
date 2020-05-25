<template lang="pug">
  div#app
    mb-nav(:path="$route.path")
    router-view
    footer Made by Mintbean, Copyright 2020 All Rights Reserved.
</template>

<style lang="scss" scoped>
@import "./styles/colors";
  footer {
    color: $lightest;
  }
</style>

<script>
export default {
  name: "App",
  data() {
    return {
      errorMessage: null
    };
  },
  created() {
    this.$store.dispatch("checkAuth");
    this.$store.dispatch("fetchMbEvents");
  }
};
</script>
