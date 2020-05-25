<template>
  <div id="app">
    <mb-nav :path="$route.path" />
    <router-view />
  </div>
</template>

<style lang="scss" scoped>

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
  }
};
</script>
